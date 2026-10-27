import { Link } from "react-router-dom";
import { MessageSquare, FileText, BriefcaseBusiness } from "lucide-react";
import Layout from "@/components/Layout";
export default function Contact() {
  return (
    <Layout>
      <div className="site-container page-content">
        <div className="page-intro">
          <p className="eyebrow">نساعدك تبدأ من المكان الصحيح</p>
          <h1>كيف يمكننا مساعدتك؟</h1>
          <p>اختر نوع احتياجك للوصول إلى المسار المناسب داخل سند.</p>
        </div>
        <div className="about-steps">
          {[
            {
              title: "أحتاج خدمة قانونية",
              desc: "حدّد موضوعك وأرسل تفاصيل الطلب إلى المنصة.",
              to: "/request-service",
              label: "تقديم طلب خدمة",
              Icon: FileText,
            },
            {
              title: "أتابع طلبًا قائمًا",
              desc: "اطّلع على حالة طلبك وتفاصيله من حسابك.",
              to: "/my-cases",
              label: "متابعة طلباتي",
              Icon: MessageSquare,
            },
            {
              title: "أرغب بالانضمام كمحامٍ",
              desc: "تعرّف على التسجيل وأرسل بيانات ملفك للمراجعة.",
              to: "/lawyer-register",
              label: "انضم كمحامٍ",
              Icon: BriefcaseBusiness,
            },
          ].map(({ title, desc, to, label, Icon }) => (
            <section className="surface" key={to}>
              <Icon className="text-secondary mb-4" size={28} />
              <h2>{title}</h2>
              <p>{desc}</p>
              <Link className="outline-button mt-5" to={to}>
                {label}
              </Link>
            </section>
          ))}
        </div>
        <div className="surface">
          <h2>لديك سؤال عن استخدام المنصة؟</h2>
          <p>راجع الأسئلة الشائعة حول اختيار المحامي والخدمات وطلباتك.</p>
          <Link className="text-link mt-4" to="/faq">
            زيارة مركز المساعدة
          </Link>
        </div>
      </div>
    </Layout>
  );
}
