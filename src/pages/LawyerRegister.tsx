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
     …7514 tokens truncated…                      type="checkbox"
                        className="rounded"
                        disabled={loading}
                      />
                      <span>تذكرني</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-primary hover:underline"
                    >
                      نسيت كلمة المرور؟
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري تسجيل الدخول...
                      </>
                    ) : (
                      "تسجيل الدخول"
                    )}
                  </Button>
                </form>

                <Separator />

                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    ليس لديك حساب؟{" "}
                    <Link
                      to={
                        lawyerReturn
                          ? "/register?redirect=/lawyer-register"
                          : "/register"
                      }
                      className="text-primary hover:underline font-medium"
                    >
                      إنشاء حساب جديد
                    </Link>
                  </p>

                  <p className="text-muted-foreground">
                    هل أنت محامي؟{" "}
                    <Link
                      to="/lawyer-register"
                      className="text-secondary hover:underline font-medium"
                    >
                      انضم كمحامي
                    </Link>
                  </p>

                  <p className="text-muted-foreground">
                    دخول المدير:{" "}
                    <Link
                      to="/admin"
                      className="text-secondary hover:underline font-medium"
                    >
                      لوحة التحكم
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
