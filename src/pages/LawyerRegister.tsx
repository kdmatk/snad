import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Check,
  FileText,
  Info,
  Loader2,
  Mail,
  Phone,
  Trash2,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  countries,
  specialties,
  experienceOptions,
  emptyRegistration,
  licenseError,
  stepErrors,
  type LawyerRegistrationFields,
} from "@/components/lawyer-registration/registrationUtils";
import { submitRegistration } from "@/components/lawyer-registration/submitRegistration";
import "./lawyer-register.css";
const draftKey = "snad-lawyer-registration-v2";
function readDraft() {
  try {
    const raw = JSON.parse(sessionStorage.getItem(draftKey) || "null");
    if (raw && Date.now() - raw.time < 2 * 60 * 60 * 1000)
      return {
        fields: { ...emptyRegistration, ...raw.fields },
        step: Math.min(3, Math.max(1, raw.step || 1)),
      };
  } catch {
    /* Storage can be disabled. */
  }
  return { fields: { ...emptyRegistration }, step: 1 };
}
const steps = [
  { title: "بيانات التواصل", text: "بياناتك الشخصية ووسائل التواصل معك" },
  {
    title: "الملف المهني والترخيص",
    text: "أضف خبرتك المهنية ومعلومات الترخيص",
  },
  { title: "المراجعة والإرسال", text: "راجع بياناتك وأرسل طلبك إلى فريق سند" },
];
export interface RegistrationViewProps {
  initialDraft?: { fields: LawyerRegistrationFields; step: number };
  persistDraft?: boolean;
  backendReady?: boolean;
  accountEmail?: string;
  accountLoading?: boolean;
  onSubmit: (data: LawyerRegistrationFields, file: File) => Promise<string>;
}
export function LawyerRegistrationView({
  initialDraft,
  persistDraft = true,
  backendReady = true,
  accountEmail,
  accountLoading = false,
  onSubmit,
}: RegistrationViewProps) {
  const [initial] = useState(() => initialDraft ?? readDraft());
  const [fields, setFields] = useState<LawyerRegistrationFields>(
    initial.fields,
  );
  const [step, setStep] = useState(initial.step);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [savedId, setSavedId] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (accountEmail)
      setFields((p) => (p.email ? p : { ...p, email: accountEmail }));
  }, [accountEmail]);
  useEffect(() => {
    if (savedId || !persistDraft) return;
    try {
      sessionStorage.setItem(
        draftKey,
        JSON.stringify({ fields, step, time: Date.now() }),
      );
    } catch {
      /* Keep in-memory form usable. */
    }
  }, [fields, step, savedId, persistDraft]);
  function change(name: keyof LawyerRegistrationFields, value: string) {
    setFields((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
    setMessage("");
  }
  function move(next: number) {
    setStep(next);
    setErrors({});
    setMessage("");
    requestAnimationFrame(() => {
      heading.current?.focus();
      heading.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }
  function chooseFile(value: File | undefined) {
    const issue = licenseError(value || null);
    setFile(issue ? null : value!);
    setErrors((p) => ({ ...p, file: issue || "" }));
    setMessage("");
  }
  function showErrors(issues: Record<string, string>) {
    setErrors(issues);
    setMessage("راجع الحقول الموضّحة للمتابعة.");
    requestAnimationFrame(() =>
      document.getElementById(`lr-${Object.keys(issues)[0]}`)?.focus(),
    );
  }
  async function next(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    if (step === 3 && !backendReady) {
      setMessage(
        "إرسال الطلبات غير متاح مؤقتًا. يمكنك مراجعة بياناتك والعودة للمحاولة لاحقًا.",
      );
      return;
    }
    if (step < 3) {
      const issues = stepErrors(step, fields, file);
      if (Object.keys(issues).length) return showErrors(issues);
      move(step + 1);
      return;
    }
    const first = stepErrors(1, fields, file);
    const second = stepErrors(2, fields, file);
    if (Object.keys(first).length) {
      setStep(1);
      showErrors(first);
      return;
    }
    if (Object.keys(second).length) {
      setStep(2);
      showErrors(second);
      return;
    }
    if (!accountEmail) {
      setMessage("سجّل الدخول أو أنشئ حسابًا لإرسال طلبك.");
      return;
    }
    if (!agreed) {
      setMessage("وافق على الشروط والأحكام وسياسة الخصوصية قبل الإرسال.");
      return;
    }
    setBusy(true);
    try {
      const id = await onSubmit(fields, file!);
      setSavedId(id);
      try {
        sessionStorage.removeItem(draftKey);
      } catch {
        /* No persisted draft. */
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "تعذّر إرسال الطلب. أعد المحاولة.",
      );
    } finally {
      setBusy(false);
    }
  }
  const field = (
    name: keyof LawyerRegistrationFields,
    label: string,
    placeholder: string,
    type = "text",
    autocomplete?: string,
  ) => (
    <div className="lr-field" key={name}>
      <label htmlFor={`lr-${name}`}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <div className="lr-input-wrap">
        {name === "email" ? (
          <Mail size={18} aria-hidden="true" />
        ) : name === "phone" ? (
          <Phone size={18} aria-hidden="true" />
        ) : null}
        <input
          id={`lr-${name}`}
          type={type}
          autoComplete={autocomplete}
          value={fields[name]}
          onChange={(e) => change(name, e.target.value)}
          placeholder={placeholder}
          maxLength={name === "bio" ? 1000 : 160}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `lr-error-${name}` : undefined}
          dir={["email", "phone"].includes(name) ? "ltr" : undefined}
        />
      </div>
      {errors[name] && (
        <p className="lr-error" id={`lr-error-${name}`}>
          {errors[name]}
        </p>
      )}
    </div>
  );
  const select = (
    name: keyof LawyerRegistrationFields,
    label: string,
    options: string[] | string[][],
    placeholder: string,
  ) => (
    <div className="lr-field" key={name}>
      <label htmlFor={`lr-${name}`}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <select
        id={`lr-${name}`}
        value={fields[name]}
        onChange={(e) => change(name, e.target.value)}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `lr-error-${name}` : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => {
          const [value, text] = Array.isArray(o) ? o : [o, o];
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
      {errors[name] && (
        <p className="lr-error" id={`lr-error-${name}`}>
          {errors[name]}
        </p>
      )}
    </div>
  );
  if (savedId)
    return (
      <section className="lr-success" dir="rtl">
        <span>
          <Check size={32} />
        </span>
        <h1>تم استلام طلب انضمامك</h1>
        <p>
          طلبك قيد المراجعة. يراجع فريق سند بياناتك وترخيص المحاماة قبل اعتماد
          الملف.
        </p>
        <p className="lr-reference">
          رقم الطلب: <bdi>{savedId.slice(0, 8).toUpperCase()}</bdi>
        </p>
        <Link className="lr-primary" to="/lawyer-dashboard">
          متابعة الملف المهني
          <ArrowLeft size={18} />
        </Link>
      </section>
    );
  return (
    <section className="lr-shell" dir="rtl">
      <aside className="lr-sidebar" aria-label="خطوات انضمام المحامي">
        <h1>ابدأ رحلتك مع سند</h1>
        <p>أكمل ملفك المهني للانضمام إلى المنصة</p>
        <ol>
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={
                step === i + 1 ? "active" : step > i + 1 ? "complete" : ""
              }
              aria-current={step === i + 1 ? "step" : undefined}
            >
              <span className="lr-step-number" aria-hidden="true">
                {step > i + 1 ? <Check size={23} /> : i + 1}
              </span>
              <div>
                <h2>{s.title}</h2>
                <p>
                  {step > i + 1 && i === 0
                    ? "أكملت بياناتك الشخصية ووسائل التواصل"
                    : s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="lr-review-note">
          يُراجع فريق سند طلبك قبل نشر ملفك واستقبال الطلبات.
        </p>
      </aside>
      <div className="lr-content">
        <p className="lr-eyebrow">الخطوة {["١", "٢", "٣"][step - 1]} من ٣</p>
        <h2 ref={heading} tabIndex={-1} className="lr-title">
          {step === 1
            ? "لنتعرّف عليك أولًا"
            : step === 2
              ? "عرّفنا بخبرتك المهنية"
              : "راجع طلبك قبل الإرسال"}
        </h2>
        <p className="lr-lead">
          {step === 1
            ? "أضف بيانات التواصل التي سنستخدمها لمتابعة طلب انضمامك."
            : step === 2
              ? "أضف معلوماتك المهنية وترخيص المحاماة لنتمكّن من مراجعة طلبك والانضمام إلى منصة سند."
              : "تأكد من صحة البيانات والترخيص المرفق، ثم أرسل طلبك إلى فريق سند."}
        </p>
        {message && (
          <div className="lr-message" role="alert">
            {message}
          </div>
        )}
        {!backendReady && (
          <div className="lr-message" role="status">
            إرسال طلبات الانضمام غير متاح مؤقتًا. يمكنك الاطلاع على النموذج
            والعودة للمحاولة لاحقًا.
          </div>
        )}
        <form onSubmit={next} noValidate aria-busy={busy}>
          <fieldset disabled={busy}>
            <legend className="sr-only">{steps[step - 1].title}</legend>
            {step === 1 ? (
              <div className="lr-contact-grid">
                <div className="lr-full">
                  {field(
                    "name",
                    "الاسم المهني الكامل",
                    "اسمك كما يظهر في الترخيص",
                    "text",
                    "name",
                  )}
                </div>
                {field(
                  "email",
                  "البريد الإلكتروني",
                  "name@example.com",
                  "email",
                  "email",
                )}
                {field("phone", "رقم الجوال", "+966 5XXXXXXXX", "tel", "tel")}
                {select("country", "البلد", countries, "اختر البلد")}
                {field(
                  "city",
                  "المدينة",
                  "أدخل المدينة",
                  "text",
                  "address-level2",
                )}
                <p className="lr-contact-hint lr-full">
                  <Info size={17} />
                  استخدم بريد حسابك في سند؛ ستحتاج تسجيل الدخول قبل إرسال الطلب.
                </p>
              </div>
            ) : step === 2 ? (
              <>
                <div className="lr-professional-grid">
                  {select(
                    "specialty",
                    "التخصص الرئيسي",
                    specialties,
                    "اختر التخصص",
                  )}
                  {select(
                    "experience",
                    "سنوات الخبرة",
                    experienceOptions,
                    "اختر سنوات الخبرة",
                  )}
                </div>
                <div className="lr-license-number">
                  {field(
                    "licenseNumber",
                    "رقم ترخيص المحاماة",
                    "أدخل رقم ترخيص المحاماة",
                  )}
                </div>
                <div className="lr-field lr-bio">
                  <label htmlFor="lr-bio">
                    نبذة مهنية مختصرة <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="lr-bio"
                    rows={3}
                    maxLength={1000}
                    value={fields.bio}
                    placeholder="اكتب نبذة مختصرة عن خبرتك المهنية ومجالات عملك..."
                    onChange={(e) => change("bio", e.target.value)}
                    aria-invalid={!!errors.bio}
                    aria-describedby="lr-bio-help"
                  />
                  {errors.bio && <p className="lr-error">{errors.bio}</p>}
                  <p id="lr-bio-help" className="lr-help">
                    يمكنك توضيح خبراتك، وأبرز القضايا أو المجالات التي تخصّصت
                    بها.
                  </p>
                </div>
                <div className="lr-upload-section">
                  <label className="lr-upload-label" htmlFor="lr-file">
                    ارفع ترخيص المحاماة <span aria-hidden="true">*</span>
                  </label>
                  <div
                    className={`lr-upload ${errors.file ? "invalid" : ""}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      chooseFile(e.dataTransfer.files[0]);
                    }}
                  >
                    <FileText size={31} aria-hidden="true" />
                    <strong>
                      {file ? file.name : "اختر ملف ترخيص المحاماة"}
                    </strong>
                    <span>
                      {file
                        ? `${(file.size / 1024).toFixed(0)} كيلوبايت`
                        : "PDF, JPG, PNG حتى 5MB"}
                    </span>
                    <div className="lr-file-actions">
                      <label htmlFor="lr-file">
                        {file ? "تغيير الملف" : "اختيار ملف"}
                      </label>
                      {file && (
                        <button
                          type="button"
                          aria-label="إزالة الترخيص المرفق"
                          onClick={() => setFile(null)}
                        >
                          <Trash2 size={17} />
                        </button>
                      )}
                    </div>
                    <input
                      className="sr-only"
                      id="lr-file"
                      type="file"
                      accept="application/pdf,image/jpeg,image/png"
                      onChange={(e) => {
                        chooseFile(e.target.files?.[0]);
                        e.target.value = "";
                      }}
                      aria-invalid={!!errors.file}
                    />
                  </div>
                  {errors.file && <p className="lr-error">{errors.file}</p>}
                  <p className="lr-help lr-upload-help">
                    <Info size={15} />
                    ترخيص المحاماة هو المستند المطلوب لهذه الخطوة.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="lr-review">
                  <div className="lr-review-heading">
                    <h3>بيانات التواصل</h3>
                    <button type="button" onClick={() => move(1)}>
                      تعديل
                    </button>
                  </div>
                  <dl>
                    {[
                      ["الاسم", fields.name],
                      ["البريد الإلكتروني", fields.email],
                      ["الجوال", fields.phone],
                      ["الموقع", `${fields.country}، ${fields.city}`],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>
                          <bdi>{value}</bdi>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="lr-review-heading">
                    <h3>الملف المهني والترخيص</h3>
                    <button type="button" onClick={() => move(2)}>
                      تعديل
                    </button>
                  </div>
                  <dl>
                    <div>
                      <dt>التخصص</dt>
                      <dd>{fields.specialty}</dd>
                    </div>
                    <div>
                      <dt>الخبرة</dt>
                      <dd>
                        {
                          experienceOptions.find(
                            (o) => o[0] === fields.experience,
                          )?.[1]
                        }
                      </dd>
                    </div>
                    <div>
                      <dt>رقم الترخيص</dt>
                      <dd>{fields.licenseNumber}</dd>
                    </div>
                    <div>
                      <dt>الملف المرفق</dt>
                      <dd>{file?.name || "أعد إرفاق الترخيص للمتابعة"}</dd>
                    </div>
                  </dl>
                  <p className="lr-review-bio">{fields.bio}</p>
                </div>
                {!accountEmail && !accountLoading && (
                  <div className="lr-signin-note">
                    <h3>سجّل الدخول لإرسال طلبك</h3>
                    <p>
                      ستبقى بيانات النموذج في هذه الجلسة. بعد العودة، أعد إرفاق
                      ملف الترخيص.
                    </p>
                    <Link to="/login?redirect=/lawyer-register">
                      تسجيل الدخول
                    </Link>
                    <Link to="/register?redirect=/lawyer-register">
                      إنشاء حساب
                    </Link>
                  </div>
                )}
                {accountEmail && (
                  <p className="lr-help">
                    سيُرسل الطلب من حساب <bdi>{accountEmail}</bdi>.
                  </p>
                )}
                <label className="lr-consent">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span>
                    أوافق على{" "}
                    <Link to="/terms" target="_blank" rel="noopener noreferrer">
                      الشروط والأحكام
                    </Link>{" "}
                    و
                    <Link
                      to="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      سياسة الخصوصية
                    </Link>
                    ، وأقر بصحة البيانات المقدمة.
                  </span>
                </label>
              </>
            )}
            <div className="lr-form-actions">
              {step > 1 ? (
                <button
                  type="button"
                  className="lr-secondary"
                  onClick={() => move(step - 1)}
                >
                  <ChevronRight size={17} />
                  السابق
                </button>
              ) : (
                <Link
                  to="/login?redirect=/lawyer-register"
                  className="lr-login-link"
                >
                  لديك حساب؟ تسجيل الدخول
                </Link>
              )}
              <button
                className="lr-primary"
                type="submit"
                disabled={
                  busy ||
                  accountLoading ||
                  (step === 3 && (!accountEmail || !backendReady))
                }
              >
                {busy ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    جارٍ إرسال الطلب...
                  </>
                ) : step === 1 ? (
                  "متابعة للملف المهني"
                ) : step === 2 ? (
                  "متابعة للمراجعة"
                ) : (
                  "إرسال طلب الانضمام"
                )}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
export default function LawyerRegister() {
  const { user, loading } = useUserProfile();
  const readiness = useQuery({
    queryKey: ["lawyer-registration-ready"],
    staleTime: 30_000,
    retry: 1,
    queryFn: async () => {
      const { error } = await supabase
        .from("lawyers")
        .select("license_document_path")
        .limit(0);
      return !error;
    },
  });
  return (
    <Layout>
      <LawyerRegistrationView
        accountEmail={user?.email}
        accountLoading={loading || readiness.isPending}
        backendReady={readiness.isPending || readiness.data === true}
        onSubmit={submitRegistration}
      />
    </Layout>
  );
}
