import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
const items = [
  [
    "كيف أطلب خدمة قانونية؟",
    "اختر خدمة من القائمة، أو حدّد محاميًا من الدليل، ثم املأ تفاصيل الطلب وراجعه قبل الإرسال.",
  ],
  [
    "هل يبقى المحامي الذي اخترته محددًا؟",
    "نعم، يظهر المحامي المختار في ملخص الطلب، ويُحفظ اسمه ومعرّف ملفه ضمن تفاصيل احتياجك لتنسيق الخدمة.",
  ],
  [
    "هل يتم خصم مبلغ عند إرسال الطلب؟",
    "لا. إرسال الطلب لا يُجري عملية دفع. تُراجع الأتعاب ونطاق العمل والتفاصيل قبل التنفيذ.",
  ],
  [
    "متى تبدأ مدة تنفيذ الخدمة؟",
    "تبدأ بعد قبول الطلب واستلام المتطلبات كاملة، ويُنسّق الموعد مع مقدم الخدمة.",
  ],
  [
    "كيف أتابع طلبي؟",
    "سجّل الدخول إلى حسابك وافتح طلباتي لعرض حالة طلبك وتفاصيله.",
  ],
  [
    "هل يمكنني إرفاق مستندات؟",
    "يمكنك إرفاق ما يصل إلى 3 ملفات في نموذج الطلب، بحجم أقصى 10MB لكل ملف.",
  ],
  [
    "كيف أنضم كمحامٍ؟",
    "استخدم صفحة انضم كمحامٍ، وأضف البيانات والمستندات المطلوبة لإرسال طلب التسجيل للمراجعة.",
  ],
];
export default function FAQ() {
  return (
    <Layout>
      <div className="site-container page-content">
        <div className="page-intro">
          <p className="eyebrow">كيف تعمل سند</p>
          <h1>أسئلة تساعدك على البدء</h1>
          <p>تعرّف على خطوات اختيار الخدمة وتقديم الطلب ومتابعته.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map(([q, a]) => (
            <details key={q} className="surface !p-5">
              <summary className="cursor-pointer font-semibold text-sm">
                {q}
              </summary>
              <p className="mt-3">{a}</p>
            </details>
          ))}
          <div className="flex gap-3 justify-center pt-6">
            <Link className="navy-button" to="/request-service">
              اطلب خدمة
            </Link>
            <Link className="outline-button" to="/contact">
              مركز المساعدة
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
