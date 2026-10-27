import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowLeft, ArrowRight, Upload, X } from "lucide-react";
import Layout from "@/components/Layout";
import { useLawyersData, matchesLawyerId } from "@/hooks/useLawyersData";
import { useQuickServicesData } from "@/hooks/useQuickServicesData";
import { supabase } from "@/integrations/supabase/client";
const types = [
  "استشارة قانونية",
  "التمثيل القضائي",
  "صياغة عقود",
  "التحكيم والوساطة",
  "استشارة متخصصة",
  "متابعة قانونية",
];
const specialties = [
  "القانون التجاري",
  "قانون الأسرة",
  "القانون الجنائي",
  "القانون العقاري",
  "قانون العمل",
  "القانون الإداري",
  "خدمات قانونية أخرى",
];
export default function RequestService() {
  const [params] = useSearchParams();
  const { lawyers, loading: lawyersLoading } = useLawyersData();
  const { services, loading: servicesLoading } = useQuickServicesData();
  const chosenLawyer = lawyers.find((l) =>
    matchesLawyerId(l, params.get("lawyer")),
  );
  const quick = services.find((s) => s.id === params.get("quick_service"));
  const general = Number(params.get("service"));
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [authRequired, setAuthRequired] = useState(false);
  const [created, setCreated] = useState<{
    id: string;
    case_number: string | null;
  } | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [form, setForm] = useState({
    serviceType: types[general - 1] ?? "",
    specialty: "",
    title: "",
    description: "",
    urgency: "normal",
    budget: "",
    contactMethod: params.get("method") ?? "platform",
  });
  const seeded = useRef(false);
  useEffect(() => {
    if (quick && !seeded.current) {
      setForm((f) => ({ ...f, serviceType: quick.title, title: quick.title }));
      seeded.current = true;
    }
  }, [quick]);
  useEffect(() => {
    if (chosenLawyer)
      setForm((f) => ({ ...f, specialty: chosenLawyer.specialty }));
  }, [chosenLawyer]);
  const update = (name: string, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    setError("");
  };
  const next = () => {
    if (
      form.budget &&
      (!Number.isFinite(Number(form.budget)) ||
        Number(form.budget) < 0 ||
        Number(form.budget) > 10000000)
    ) {
      setError("أدخل ميزانية صحيحة بين 0 و10,000,000 ريال.");
      return;
    }
    if (
      !form.serviceType ||
      !form.specialty ||
      !form.title.trim() ||
      form.description.trim().length < 20
    ) {
      setError("اختر الخدمة والتخصص، وأضف عنوانًا ووصفًا لا يقل عن 20 حرفًا.");
      return;
    }
    setError("");
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const submit = async () => {
    setBusy(true);
    setError("");
    setAuthRequired(false);
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        setAuthRequired(true);
        return;
      }
      if (params.get("lawyer") && !chosenLawyer)
        throw new Error(
          "المحامي المختار غير متاح. يرجى العودة إلى دليل المحامين.",
        );
      if (params.get("quick_service") && !quick)
        throw new Error(
          "الخدمة المختارة غير متاحة. يرجى العودة إلى قائمة الخدمات.",
        );
      const description = [
        form.description,
        `نوع الخدمة: ${form.serviceType}`,
        `وسيلة التواصل المفضلة: ${{ platform: "من خلال المنصة", phone: "هاتف", video: "اجتماع مرئي" }[form.contactMethod] ?? form.contactMethod}`,
        chosenLawyer
          ? `المحامي المطلوب: ${chosenLawyer.name} (معرّف الملف: ${chosenLawyer.id})`
          : "",
        quick
          ? `الخدمة السريعة: ${quick.title} | المعرّف: ${quick.id} | السعر المعلن عند الطلب: ${quick.price} ريال | المدة المعلنة: ${quick.duration}`
          : "",
        form.budget ? `الميزانية المقترحة: ${form.budget} ريال` : "",
      ]
        .filter(Boolean)
        .join("\n\n");
      const { data, error: insertError } = await supabase
        .from("legal_cases")
        .insert({
          client_id: user.id,
          title: form.title.trim(),
          description,
          category: form.specialty,
          urgency: form.urgency,
          status: "open",
          is_auction: false,
          budget_min:
            quick?.price ?? (form.budget ? Number(form.budget) : null),
          budget_max:
            quick?.price ?? (form.budget ? Number(form.budget) : null),
        })
        .select("id,case_number")
        .single();
      if (insertError)
        throw new Error("تعذّر حفظ الطلب. حاول مرة أخرى أو تواصل مع الدعم.");
      setCreated(data);
      if (files.length) {
        const uploaded: string[] = [];
        let failed = 0;
        for (const file of files) {
          const path = `${data.id}/${crypto.randomUUID()}.${file.name.split(".").pop()}`;
          const { error: uploadError } = await supabase.storage
            .from("case-files")
            .upload(path, file);
          if (uploadError) failed++;
          else uploaded.push(path);
        }
        if (uploaded.length) {
          const { error: saveError } = await supabase
            .from("legal_cases")
            .update({ attachments: uploaded })
            .eq("id", data.id);
          if (saveError) failed = files.length;
        }
        if (failed)
          setAttachmentError(
            `حُفظ الطلب، وتعذّر إرفاق ${failed} من الملفات. احتفظ بها لمشاركتها مع المحامي عبر القناة المتفق عليها.`,
          );
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "تعذّر تقديم الطلب. حاول مرة أخرى.",
      );
    } finally {
      setBusy(false);
    }
  };
  const pickFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const list = [...files, ...Array.from(incoming)];
    if (list.length > 3) {
      setError("يمكن إرفاق 3 ملفات كحد أقصى.");
      return;
    }
    if (
      list.some(
        (f) =>
          f.size > 10 * 1024 * 1024 ||
          ![
            "application/pdf",
            "image/jpeg",
            "image/png",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(f.type),
      )
    ) {
      setError("اختر ملفات PDF أو Word أو صورًا، بحجم لا يتجاوز 10MB لكل ملف.");
      return;
    }
    setFiles(list);
    setError("");
  };
  if (
    (params.get("quick_service") && servicesLoading) ||
    (params.get("lawyer") && lawyersLoading)
  )
    return (
      <Layout>
        <p className="loading-state" role="status">
          جاري تحميل اختيارك...
        </p>
      </Layout>
    );
  if (created)
    return (
      <Layout>
        <div className="site-container page-content">
          <div className="surface success-message max-w-2xl mx-auto my-12">
            <CheckCircle2 size={42} />
            <h1 className="text-2xl font-bold mb-3">تم حفظ طلبك</h1>
            <p>
              رقم الطلب: <bdi>{created.case_number ?? created.id}</bdi>
            </p>
            <p>يمكنك متابعة الطلب من حسابك. لم تُنفّذ عملية دفع.</p>
            {attachmentError && (
              <p className="error-message mt-4">{attachmentError}</p>
            )}
            <Link className="navy-button mt-6" to="/my-cases">
              متابعة طلباتي
            </Link>
          </div>
        </div>
      </Layout>
    );
  return (
    <Layout>
      <div className="site-container page-content">
        <div className="page-intro">
          <p className="eyebrow">من احتياجك إلى طلب واضح</p>
          <h1>طلب خدمة قانونية</h1>
          <p>أضف التفاصيل، ثم راجع طلبك قبل إرساله.</p>
        </div>
        <ol className="stepper">
          <li className={step === 1 ? "current" : ""}>1. تفاصيل الطلب</li>
          <li className={step === 2 ? "current" : ""}>2. المراجعة والإرسال</li>
        </ol>
        <div className="form-grid">
          <section className="surface">
            {step === 1 ? (
              <>
                <h2>ما الذي تحتاج المساعدة فيه؟</h2>
                <div className="form-fields">
                  <div>
                    <label htmlFor="request-service-type">نوع الخدمة *</label>
                    <select
                      id="request-service-type"
                      disabled={!!quick}
                      value={form.serviceType}
                      onChange={(e) => update("serviceType", e.target.value)}
                    >
                      <option value="">اختر الخدمة</option>
                      {[
                        ...new Set([...types, ...(quick ? [quick.title] : [])]),
                      ].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="request-specialty">التخصص القانوني *</label>
                    <select
                      id="request-specialty"
                      value={form.specialty}
                      onChange={(e) => update("specialty", e.target.value)}
                    >
                      <option value="">اختر التخصص</option>
                      {[
                        ...new Set([
                          ...specialties,
                          ...(chosenLawyer ? [chosenLawyer.specialty] : []),
                        ]),
                      ].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="request-title">عنوان الطلب *</label>
                    <input
                      id="request-title"
                      value={form.title}
                      maxLength={180}
                      onChange={(e) => update("title", e.target.value)}
                      placeholder="مثال: مراجعة بنود عقد عمل"
                    />
                  </div>
                  <div>
                    <label htmlFor="request-description">
                      تفاصيل احتياجك *
                    </label>
                    <textarea
                      id="request-description"
                      value={form.description}
                      maxLength={10000}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="اشرح الموضوع وما الذي تتوقعه من الخدمة..."
                    />
                  </div>
                  <div className="field-row">
                    <div>
                      <label htmlFor="request-urgency">الأولوية</label>
                      <select
                        id="request-urgency"
                        value={form.urgency}
                        onChange={(e) => update("urgency", e.target.value)}
                      >
                        <option value="normal">عادية</option>
                        <option value="urgent">عاجلة</option>
                        <option value="flexible">مرنة</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="request-contact">
                        طريقة التواصل المفضلة
                      </label>
                      <select
                        id="request-contact"
                        value={form.contactMethod}
                        onChange={(e) =>
                          update("contactMethod", e.target.value)
                        }
                      >
                        <option value="platform">من خلال المنصة</option>
                        <option value="phone">مكالمة هاتفية</option>
                        <option value="video">اجتماع مرئي</option>
                      </select>
                    </div>
                  </div>
                  {!quick && (
                    <div>
                      <label htmlFor="request-budget">
                        ميزانية مقترحة بالريال (اختياري)
                      </label>
                      <input
                        id="request-budget"
                        type="number"
                        min="0"
                        max="10000000"
                        value={form.budget}
                        onChange={(e) => update("budget", e.target.value)}
                        placeholder="تُحدّد الأتعاب عند الاتفاق"
                      />
                    </div>
                  )}
                  <div>
                    <label htmlFor="request-files">
                      المستندات ذات الصلة (اختياري)
                    </label>
                    <div className="notice">
                      <Upload size={20} className="mb-2" />
                      <input
                        id="request-files"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => pickFiles(e.target.files)}
                      />
                      <p className="mt-2">حتى 3 ملفات، 10MB لكل ملف.</p>
                    </div>
                    {files.map((f, i) => (
                      <div
                        key={`${f.name}-${i}`}
                        className="flex justify-between items-center text-xs mt-2"
                      >
                        <span>{f.name}</span>
                        <button
                          aria-label={`إزالة ${f.name}`}
                          onClick={() =>
                            setFiles(files.filter((_, n) => n !== i))
                          }
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-actions">
                  <button className="navy-button" onClick={next}>
                    مراجعة الطلب <ArrowLeft size={16} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>راجع التفاصيل قبل الإرسال</h2>
                <dl className="summary-list">
                  <div>
                    <dt>عنوان الطلب</dt>
                    <dd>{form.title}</dd>
                  </div>
                  <div>
                    <dt>نوع الخدمة</dt>
                    <dd>{form.serviceType}</dd>
                  </div>
                  <div>
                    <dt>التخصص</dt>
                    <dd>{form.specialty}</dd>
                  </div>
                  <div>
                    <dt>المحامي المطلوب</dt>
                    <dd>{chosenLawyer?.name ?? "طلب عام"}</dd>
                  </div>
                  <div>
                    <dt>المرفقات</dt>
                    <dd>{files.length} ملفات</dd>
                  </div>
                </dl>
                <p className="whitespace-pre-wrap mt-6">{form.description}</p>
                <div className="notice mt-5">
                  يُرسل الطلب إلى المنصة لتنسيق الخدمة. تُراجع الأتعاب والنطاق
                  قبل التنفيذ، ولا يتم الدفع في هذه الخطوة.
                </div>
                <div className="form-actions">
                  <button
                    className="outline-button"
                    disabled={busy}
                    onClick={() => setStep(1)}
                  >
                    <ArrowRight size={16} />
                    تعديل التفاصيل
                  </button>
                  <button
                    className="navy-button"
                    disabled={busy || lawyersLoading || servicesLoading}
                    onClick={submit}
                  >
                    {busy ? "جاري حفظ الطلب..." : "إرسال الطلب"}
                  </button>
                </div>
                {authRequired && (
                  <div className="notice mt-5" role="alert">
                    سجّل الدخول في تبويب جديد، ثم عُد لإرسال الطلب؛ ستبقى
                    التفاصيل في هذه الصفحة.
                    <Link
                      className="text-link block mt-2"
                      to="/login"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      تسجيل الدخول
                    </Link>
                  </div>
                )}
              </>
            )}
            {error && (
              <p className="error-message mt-5" role="alert">
                {error}
              </p>
            )}
          </section>
          <aside className="surface request-summary">
            <h2>ملخص اختيارك</h2>
            <dl className="summary-list">
              <div>
                <dt>الخدمة</dt>
                <dd>{quick?.title ?? form.serviceType ?? "لم تُحدد"}</dd>
              </div>
              <div>
                <dt>المحامي</dt>
                <dd>{chosenLawyer?.name ?? "طلب عام"}</dd>
              </div>
              {quick && (
                <>
                  <div>
                    <dt>السعر المعلن</dt>
                    <dd>{quick.price} ريال</dd>
                  </div>
                  <div>
                    <dt>المدة المعلنة</dt>
                    <dd>{quick.duration}</dd>
                  </div>
                </>
              )}
            </dl>
            <p className="notice">
              تُحدّد بداية التنفيذ بعد قبول الطلب واكتمال متطلباته.
            </p>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
