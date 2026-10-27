import { Link, useParams } from "react-router-dom";
import {
  BadgeCheck,
  ArrowRight,
  MessageSquare,
  CalendarDays,
} from "lucide-react";
import Layout from "@/components/Layout";
import LawyerAvatar from "@/components/lawyers/LawyerAvatar";
import { useLawyersData, matchesLawyerId } from "@/hooks/useLawyersData";
export default function LawyerProfile() {
  const { id } = useParams();
  const { lawyers, loading } = useLawyersData();
  const lawyer = lawyers.find((l) => matchesLawyerId(l, id));
  if (loading)
    return (
      <Layout>
        <p className="loading-state" role="status">
          جاري تحميل ملف المحامي...
        </p>
      </Layout>
    );
  if (!lawyer)
    return (
      <Layout>
        <div className="empty-state">
          <h1>ملف المحامي غير متاح</h1>
          <Link className="outline-button" to="/lawyers">
            تصفح المحامين
          </Link>
        </div>
      </Layout>
    );
  return (
    <Layout>
      <div className="site-container">
        <Link className="text-link mt-6" to="/lawyers">
          <ArrowRight size={15} />
          جميع المحامين
        </Link>
        <div className="profile-grid">
          <div>
            <section className="surface">
              <div className="profile-main">
                <LawyerAvatar name={lawyer.name} src={lawyer.image} />
                <div>
                  <h1>{lawyer.name}</h1>
                  <p className="profile-specialty">{lawyer.specialty}</p>
                  {lawyer.verified && (
                    <span className="verified-label">
                      <BadgeCheck size={16} />
                      تم التحقق من الترخيص
                    </span>
                  )}
                  <p className="mt-2">
                    {lawyer.experience === "غير محدد"
                      ? ""
                      : `خبرة ${lawyer.experience}`}
                  </p>
                </div>
              </div>
              <div className="profile-description">
                <h2>نبذة عن المحامي</h2>
                <p>
                  {lawyer.description ||
                    "لم تُضف نبذة تفصيلية بعد. يمكنك إرسال احتياجك القانوني من خلال طلب الخدمة."}
                </p>
              </div>
            </section>
            <section className="surface profile-details">
              <h2>تفاصيل الخدمة</h2>
              <dl>
                <dt>التخصص</dt>
                <dd>{lawyer.specialty}</dd>
                <dt>الأتعاب المعلنة</dt>
                <dd>{lawyer.price}</dd>
                <dt>آلية الطلب</dt>
                <dd>إرسال التفاصيل ثم تنسيق نطاق العمل والموعد.</dd>
              </dl>
            </section>
          </div>
          <aside className="surface booking-panel">
            <div className="booking-price">{lawyer.price}</div>
            <small>تُحدّد مدة الاستشارة والتكلفة الإجمالية عند الاتفاق.</small>
            <Link
              className="navy-button"
              to={`/instant-consultation?lawyer=${lawyer.id}`}
            >
              <MessageSquare size={17} />
              طلب استشارة
            </Link>
            <Link
              className="outline-button"
              to={`/request-service?lawyer=${lawyer.id}&service=1`}
            >
              <CalendarDays size={17} />
              طلب موعد
            </Link>
            <p className="notice mt-5">
              سيبقى هذا المحامي محددًا في طلبك، ويمكنك مراجعة التفاصيل قبل
              الإرسال.
            </p>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
