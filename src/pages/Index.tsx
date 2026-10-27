import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowLeft, Clock3, FileText } from "lucide-react";
import Layout from "@/components/Layout";
import FeaturedLawyers from "@/components/FeaturedLawyers";
import QuickServiceCard from "@/components/quick-services/QuickServiceCard";
import {
  useQuickServicesData,
  type QuickService,
} from "@/hooks/useQuickServicesData";
export default function Index() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { services, loading } = useQuickServicesData();
  const featured =
    services.find((s) => s.title.includes("مراجعة عقد عمل")) ?? services[0];
  const picks = [
    "صياغة عقد خدمات",
    "استشارة أحوال شخصية",
    "صياغة مذكرة قانونية",
  ]
    .map((title) => services.find((s) => s.title === title))
    .filter(Boolean) as QuickService[];
  const showService = (s: QuickService) =>
    navigate(`/quick-services?service=${s.id}`);
  return (
    <Layout>
      <section className="market-hero">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">منصة سند للخدمات القانونية</p>
            <h1>
              خدمات قانونية واضحة،
              <br />
              <span>من محامين متخصصين</span>
            </h1>
            <p className="hero-description">
              اختر الخدمة المناسبة لاحتياجك، واطّلع على تفاصيلها وسعرها ومدة
              تنفيذها قبل تقديم طلبك.
            </p>
            <form
              className="hero-search"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(
                  `/quick-services${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`,
                );
              }}
            >
              <label className="sr-only" htmlFor="service-search">
                ابحث عن خدمة قانونية
              </label>
              <Search size={19} />
              <input
                id="service-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ما الخدمة القانونية التي تحتاجها؟"
              />
              <button className="navy-button" type="submit">
                ابحث عن خدمة
              </button>
            </form>
            <div className="hero-suggestions">
              <span>أو جرّب:</span>
              {["صياغة", "مراجعة", "استشارة", "مذكرة"].map((q, i) => (
                <Link key={q} to={`/quick-services?q=${encodeURIComponent(q)}`}>
                  {
                    [
                      "صياغة قانونية",
                      "مراجعة عقد",
                      "استشارة قانونية",
                      "إعداد مذكرة قانونية",
                    ][i]
                  }
                </Link>
              ))}
            </div>
          </div>
          <div className="featured-service">
            {loading ? (
              <p role="status">جاري تحميل الخدمة...</p>
            ) : featured ? (
              <>
                <img
                  className="contract-image"
                  src="/images/contract-review.webp"
                  alt="مستند عقد وقلم"
                />
                <div className="featured-service-copy">
                  <span className="featured-tag">خدمة مختارة</span>
                  <h2>
                    <FileText size={19} />
                    {featured.title}
                  </h2>
                  <p>{featured.description}</p>
                  <div className="featured-service-facts">
                    <strong>
                      {featured.price.toLocaleString("ar-SA")} ريال
                    </strong>
                    <span>
                      <Clock3 size={15} />
                      {featured.duration}
                    </span>
                  </div>
                  <button
                    className="gold-button"
                    onClick={() => showService(featured)}
                  >
                    عرض تفاصيل الخدمة <ArrowLeft size={15} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>خدمة تناسب احتياجك</h2>
                <p>استعرض الخدمات القانونية المتاحة.</p>
                <Link to="/services" className="gold-button">
                  تصفح الخدمات
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="home-services site-container">
        <div className="section-heading">
          <h2>ابدأ بالخدمة التي تحتاجها</h2>
          <p>خدمات قانونية محددة، بأسعار واضحة ومواعيد تسليم معلنة.</p>
        </div>
        <div className="home-services-grid">
          {(picks.length ? picks : services.slice(1, 4)).map((s) => (
            <QuickServiceCard key={s.id} service={s} onOrder={showService} />
          ))}
        </div>
        <Link to="/quick-services" className="text-link home-more">
          عرض جميع الخدمات <ArrowLeft size={15} />
        </Link>
      </section>
      <FeaturedLawyers />
    </Layout>
  );
}
