import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLawyersData } from "@/hooks/useLawyersData";
import LawyerCard from "./lawyers/LawyerCard";
export default function FeaturedLawyers() {
  const { lawyers, loading } = useLawyersData();
  return (
    <section className="home-lawyers site-container">
      <div className="section-heading">
        <h2>تفضّل اختيار المحامي بنفسك؟</h2>
        <p>تصفح ملفات المحامين وتخصصاتهم، واختر الأنسب لاحتياجك.</p>
      </div>
      {loading ? (
        <p className="loading-state" role="status">
          جاري تحميل المحامين...
        </p>
      ) : (
        <div className="featured-lawyers-grid">
          {lawyers
            .filter((l) => !l.name.includes("تجريبي"))
            .slice(0, 2)
            .map((l) => (
              <LawyerCard key={l.id} lawyer={l} />
            ))}
        </div>
      )}
      <Link className="text-link home-more" to="/lawyers">
        تصفح جميع المحامين <ArrowLeft size={15} />
      </Link>
    </section>
  );
}
