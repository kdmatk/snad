import { supabase } from "@/integrations/supabase/client";
import type { LawyerRegistrationFields } from "./registrationUtils";
import { licenseError } from "./registrationUtils";
export async function submitRegistration(
  data: LawyerRegistrationFields,
  file: File,
) {
  const fileIssue = licenseError(file);
  if (fileIssue) throw new Error(fileIssue);
  const { data: auth, error: authError } = await supabase.auth.getUser();
  const user = auth.user;
  if (authError || !user?.email)
    throw new Error("سجّل الدخول قبل إرسال الطلب.");
  if (user.email.toLowerCase() !== data.email.trim().toLowerCase())
    throw new Error(
      "يجب أن يطابق بريد الطلب بريد حسابك المسجّل. عدّل البريد في الخطوة الأولى.",
    );
  const { data: existing, error: readError } = await supabase
    .from("lawyers")
    .select("id,registration_status")
    .eq("user_id", user.id)
    .maybeSingle();
  if (readError) throw new Error("تعذّر التحقق من الملف الحالي. أعد المحاولة.");
  if (existing?.registration_status === "approved")
    throw new Error(
      "لديك ملف محامٍ معتمد بالفعل. يمكنك إدارته من لوحة المحامي.",
    );
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const isValid =
    file.type === "application/pdf"
      ? String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-"
      : file.type === "image/png"
        ? bytes.slice(0, 8).join(",") === "137,80,78,71,13,10,26,10"
        : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (!isValid)
    throw new Error(
      "محتوى الملف لا يطابق صيغته. اختر ترخيصًا بصيغة PDF أو صورة صالحة.",
    );
  const extension = {
    "application/pdf": "pdf",
    "image/jpeg": "jpg",
    "image/png": "png",
  }[file.type];
  const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await supabase.storage
    .from("lawyer-licenses")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (uploadError)
    throw new Error("تعذّر رفع الترخيص. تحقق من الاتصال ثم أعد المحاولة.");
  let saved = false;
  try {
    const payload = {
      user_id: user.id,
      name: data.name.trim(),
      email: user.email,
      phone: data.phone.trim(),
      country: data.country,
      city: data.city.trim(),
      specialty: data.specialty,
      experience_years: Number(data.experience),
      license_number: data.licenseNumber.trim(),
      license_document_path: path,
      bio: data.bio.trim(),
      registration_status: "pending",
      license_verified: false,
    };
    const result = existing
      ? await supabase
          .from("lawyers")
          .update(payload)
          .eq("id", existing.id)
          .eq("user_id", user.id)
          .eq("registration_status", existing.registration_status)
          .select("id")
          .maybeSingle()
      : await supabase.from("lawyers").insert(payload).select("id").single();
    if (result.error) {
      if (result.error.code === "23505")
        throw new Error(
          "يوجد طلب مرتبط بالحساب أو برقم الترخيص. راجع بياناتك أو تواصل مع الدعم.",
        );
      throw new Error("تعذّر حفظ طلب الانضمام. أعد المحاولة.");
    }
    if (!result.data)
      throw new Error(
        "تغيّرت حالة ملفك أثناء الإرسال. حدّث الصفحة وراجع الملف.",
      );
    saved = true;
    // user_type is used for navigation only. Approval and access remain separate.
    await supabase
      .from("user_profiles")
      .update({ user_type: "lawyer" })
      .eq("user_id", user.id);
    return result.data.id;
  } finally {
    if (!saved) await supabase.storage.from("lawyer-licenses").remove([path]);
  }
}
