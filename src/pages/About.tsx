import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
export default function About() {
  return (
    <Layout>
      <div className="site-container page-content">
        <div className="page-intro">
          <p className="eyebrow">عن منصة سند</p>
          <h1>الوصول إلى الخدمة القانونية، بخطوات أوضح</h1>
          <p>
            منصة تربط الأفراد والمنشآت بالمحامين، وتساعدهم على استعراض الخدمات
            وتحديد احتياجهم ومتابعة طلباتهم.
          </p>
        </div>
        <section className="surface">
          <h2>خدمة مناسبة لاحتياجك</h2>
          <p>
            سواء كنت تبحث عن استشارة، أو مراجعة عقد، أو مساعدة في إجراء قانوني،
            يمكنك البدء بخدمة محددة أو اختيار محامٍ من الدليل. راجع التخصص
            والخبرة والأتعاب المعلنة، ثم أرسل التفاصيل لتنسيق نطاق العمل.
          </p>
        </section>
        <div className="about-steps">
          {[
            [
              "01",
              "اختر الخدمة أو المحامي",
              "استعرض الخدمات أو ملفات المحامين وحدد ما يناسب موضوعك.",
            ],
            [
              "02",
              "أرسل تفاصيل احتياجك",
              "أضف وصفًا واضحًا ومستنداتك ذات الصلة، ثم راجع الطلب قبل إرساله.",
            ],
            [
              "03",
              "تابع طلبك من حسابك",
              "تابع حالة الطلب ونسّق الموعد ونطاق العمل والأتعاب قبل بدء التنفيذ.",
            ],
          ].map(([n, title, desc]) => (
            <section className="surface" key={n}>
              <div className="about-number">{n}</div>
              <h2>{title}</h2>
              <p>{desc}</p>
            </section>
          ))}
        </div>
        <div className="surface text-center">
          <h2>ابدأ من احتياجك القانوني</h2>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link className="navy-button" to="/quick-services">
              تصفح الخدمات
            </Link>
            <Link className="outline-button" to="/lawyers">
              اختر محاميًا
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
