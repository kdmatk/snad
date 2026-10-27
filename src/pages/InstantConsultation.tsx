import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MessageSquare, Phone, Video } from "lucide-react";
import Layout from "@/components/Layout";
import LawyerCard from "@/components/lawyers/LawyerCard";
import { useLawyersData, matchesLawyerId } from "@/hooks/useLawyersData";
export default function InstantConsultation() {
  const [params] = useSearchParams();
  const { lawyers, loading } = useLawyersData();
  const [method, setMethod] = useState("platform");
  const selectedId = params.get("lawyer");
  const lawyer = lawyers.find((l) => matchesLawyerId(l, selectedId));
  return (
    <Layout>
      <div className="site-container page-content">
        <div className="page-intro">
          <p className="eyebrow">استشارة تناسب احتياجك</p>
          <h1>طلب استشارة قانونية</h1>
          <p>اختر وسيلة التواصل، ثم أرسل التفاصيل لتنسيق الموعد مع المحامي.</p>
        </div>
        {loading ? (
          <p className="loading-state" role="status">
            جاري تحميل المحامي...
          </p>
        ) : selectedId && !lawyer ? (
          <div className="empty-state">
            <p>لم نعثر على المحامي المختار.</p>
            <Link to="/lawyers" className="outline-button">
              اختيار محامٍ
            </Link>
          </div>
        ) : (
          <div className="profile-grid pt-0">
            <section className="surface">
              <h2>كيف تفضّل التواصل؟</h2>
              <div className="form-fields">
                {[
                  [
                    "platform",
                    "من خلال المنصة",
                    "أرسل طلبك وتابع التنسيق من حسابك",
                    MessageSquare,
                  ],
                  [
                    "phone",
                    "مكالمة صوتية",
                    "طلب تنسيق مكالمة مع المحامي",
                    Phone,
                  ],
                  [
                    "video",
                    "اجتماع مرئي",
                    "يُنسّق الموعد والوسيلة مع المحامي",
                    Video,
                  ],
                ].map(([value, label, desc, Icon]) => {
                  const MethodIcon = Icon as typeof Phone;
                  return (
                    <label
                      key={String(value)}
                      className="flex items-center gap-3 rounded-md border p-4 cursor-pointer"
                      style={{
                        background: method === value ? "#f1f6f9" : "#fff",
                      }}
                    >
                      <input
                        style={{ width: 18, minHeight: 18 }}
                        type="radio"
                        name="method"
                        value={String(value)}
                        checked={method === value}
                        onChange={() => setMethod(String(value))}
                      />
                      <MethodIcon size={20} />
                      <span>
                        {String(label)}
                        <small className="block text-muted-foreground font-normal mt-1">
                          {String(desc)}
                        </small>
                      </span>
                    </label>
                  );
                })}
              </div>
              <p className="notice mt-6">
                هذا طلب لتنسيق الاستشارة. لا يبدأ اتصال أو يُخصم مبلغ بمجرد
                اختيار الوسيلة.
              </p>
              <Link
                className="navy-button mt-5"
                to={`/request-service?service=1&method=${method}${lawyer ? `&lawyer=${lawyer.id}` : ""}`}
              >
                متابعة إلى تفاصيل الطلب
              </Link>
            </section>
            <aside>
              {lawyer ? (
                <>
                  <p className="result-count">المحامي المختار</p>
                  <LawyerCard lawyer={lawyer} />
                </>
              ) : (
                <div className="surface">
                  <h2>اختر المحامي أو اترك لنا احتياجك</h2>
                  <p>يمكنك تحديد المحامي من الدليل أو تقديم طلب عام.</p>
                  <Link className="outline-button mt-4" to="/lawyers">
                    تصفح المحامين
                  </Link>
                </div>
              )}
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
}
