import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole, Loader2, CheckCircle2 } from "lucide-react";
import Brand from "@/components/Brand";
import { supabase } from "@/integrations/supabase/client";

import { parseActivationLink } from "@/components/admin/activationLink";

// Keep the fragment through reloads until setup succeeds. It is never sent to
// the server or verified on page load, so email scanners cannot consume it.
export default function SetPassword() {
  const [link, setLink] = useState(() =>
    parseActivationLink(window.location.hash),
  );
  const verified = useRef(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "referrer";
    meta.content = "no-referrer";
    document.head.appendChild(meta);
    const updateLink = () => {
      setLink(parseActivationLink(window.location.hash));
      verified.current = false;
      setError("");
      setDone(false);
      setPassword("");
      setConfirm("");
    };
    window.addEventListener("hashchange", updateLink);
    return () => {
      meta.remove();
      window.removeEventListener("hashchange", updateLink);
    };
  }, []);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!link.token || !link.type) return;
    if (password.length < 12) {
      setError("استخدم كلمة مرور من 12 حرفًا على الأقل.");
      return;
    }
    if (password !== confirm) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    setBusy(true);
    try {
      if (!verified.current) {
        const result = await supabase.auth.verifyOtp({
          token_hash: link.token,
          type: link.type,
        });
        if (result.error || !result.data.session) {
          setError("رابط التفعيل غير صالح أو انتهت مدته. اطلب رابطًا جديدًا.");
          return;
        }
        verified.current = true;
      }
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) {
        setError(
          "تعذّر حفظ كلمة المرور. جرّب كلمة أطول وغير مستخدمة سابقًا ثم أعد المحاولة.",
        );
        return;
      }
      setPassword("");
      setConfirm("");
      window.history.replaceState(null, "", window.location.pathname);
      setDone(true);
    } catch {
      setError("تعذّر الاتصال بخدمة الدخول. يرجى المحاولة مرة أخرى.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-5 py-12 gap-7 font-cairo"
    >
      <Brand />
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex justify-center text-primary mb-5">
          {done ? <CheckCircle2 size={35} /> : <LockKeyhole size={35} />}
        </div>
        <h1 className="text-2xl font-bold text-center mb-3">
          {done ? "تم تعيين كلمة المرور" : "تفعيل الدخول إلى سند"}
        </h1>
        {done ? (
          <>
            <p className="text-center text-slate-600 text-sm leading-7 mb-6">
              حُفظت كلمة المرور. يمكنك الآن تسجيل الدخول إلى حسابك.
            </p>
            <a className="navy-button w-full" href="/login">
              تسجيل الدخول إلى حسابك
            </a>
          </>
        ) : !link.token || !link.type ? (
          <>
            <p className="text-center text-slate-600 text-sm leading-7 mb-6">
              افتح رابط التفعيل الذي أُرسل إلى بريدك الإلكتروني. هذه الصفحة
              تحتاج رابطًا صالحًا لتعيين كلمة المرور.
            </p>
            <Link to="/login" className="navy-button w-full">
              العودة إلى تسجيل الدخول
            </Link>
          </>
        ) : (
          <>
            <p className="text-center text-slate-600 text-sm leading-7 mb-6">
              اختر كلمة مرور خاصة بك. سيتم التحقق من رابط البريد عند الحفظ.
            </p>
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-semibold mb-2"
                >
                  كلمة المرور الجديدة
                </label>
                <input
                  id="new-password"
                  type="password"
                  dir="ltr"
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={128}
                  required
                  disabled={busy}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-3 focus:outline-primary"
                />
                <p className="text-xs text-slate-500 mt-2">
                  12 حرفًا على الأقل؛ يُفضّل مزج الحروف والأرقام والرموز.
                </p>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-semibold mb-2"
                >
                  تأكيد كلمة المرور
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  dir="ltr"
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={128}
                  required
                  disabled={busy}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-3 focus:outline-primary"
                />
              </div>
              {error && (
                <p
                  role="alert"
                  className="rounded-md bg-red-50 px-3 py-3 text-sm text-red-700 leading-7"
                >
                  {error}
                </p>
              )}
              <button
                disabled={busy}
                className="navy-button w-full disabled:opacity-60"
              >
                {busy && <Loader2 size={18} className="animate-spin" />}
                {busy
                  ? "جاري التحقق والحفظ..."
                  : "تفعيل الحساب وحفظ كلمة المرور"}
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
