import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
export default function LawyerApplicationForm({
  lawyer,
  userId,
  onSaved,
}: {
  lawyer: Tables<"lawyers">;
  userId: string;
  onSaved: () => Promise<unknown>;
}) {
  const [fields, setFields] = useState({
    name: lawyer.name || "",
    phone: lawyer.phone || "",
    specialty: lawyer.specialty || "",
    license_number: lawyer.license_number || "",
    bio: lawyer.bio || "",
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    setFailed(false);
    if (
      !fields.name.trim() ||
      !fields.specialty.trim() ||
      !fields.license_number.trim()
    ) {
      setFailed(true);
      setMessage("أكمل الاسم المهني والتخصص ورقم الترخيص.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase
        .from("lawyers")
        .update({
          name: fields.name.trim(),
          phone: fields.phone.trim() || null,
          specialty: fields.specialty.trim(),
          license_number: fields.license_number.trim(),
          bio: fields.bio.trim() || null,
          registration_status: "pending",
          license_verified: false,
        })
        .eq("id", lawyer.id)
        .eq("user_id", userId)
        .neq("registration_status", "approved")
        .select("id")
        .single();
      if (error) throw error;
      await onSaved();
      setMessage("تم حفظ بياناتك وإرسال طلبك إلى الإدارة للمراجعة.");
    } catch (error) {
      setFailed(true);
      setMessage(
        error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "23505"
          ? "رقم الترخيص مستخدم في ملف آخر. راجع الرقم أو تواصل مع الإدارة."
          : "تعذّر حفظ الطلب. يرجى المحاولة مرة أخرى.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <form
      onSubmit={save}
      className="space-y-5 border-t pt-6"
      aria-label="استكمال طلب المحامي"
    >
      <h2 className="text-xl font-bold">استكمال طلب الانضمام</h2>
      <p className="text-sm text-muted-foreground leading-7">
        طلبك ظاهر للإدارة. أكمل البيانات التالية ليصبح جاهزًا للمراجعة.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {(
          [
            ["name", "الاسم المهني الكامل"],
            ["phone", "رقم الهاتف"],
            ["specialty", "التخصص القانوني"],
            ["license_number", "رقم الترخيص"],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <label
              htmlFor={`lawyer-${key}`}
              className="block text-sm font-medium mb-2"
            >
              {label}
              {key !== "phone" && " *"}
            </label>
            <Input
              id={`lawyer-${key}`}
              value={fields[key]}
              onChange={(e) =>
                setFields((s) => ({ ...s, [key]: e.target.value }))
              }
              required={key !== "phone"}
              type={key === "phone" ? "tel" : "text"}
              maxLength={key === "name" ? 150 : 100}
              disabled={busy}
            />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="lawyer-bio" className="block text-sm font-medium mb-2">
          نبذة مهنية (اختياري)
        </label>
        <Textarea
          id="lawyer-bio"
          value={fields.bio}
          onChange={(e) => setFields((s) => ({ ...s, bio: e.target.value }))}
          maxLength={2000}
          disabled={busy}
        />
      </div>
      {message && (
        <p
          role="status"
          className={`text-sm leading-7 ${failed ? "text-red-700" : "text-green-700"}`}
        >
          {message}
        </p>
      )}
      <Button disabled={busy}>
        {busy && <Loader2 className="animate-spin h-4 w-4 ml-2" />}
        {busy ? "جاري الحفظ..." : "حفظ وإرسال للمراجعة"}
      </Button>
    </form>
  );
}
