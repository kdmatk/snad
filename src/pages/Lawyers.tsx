import { useState } from "react";
import Layout from "@/components/Layout";
import LawyerCard from "@/components/lawyers/LawyerCard";
import { useLawyersData } from "@/hooks/useLawyersData";
export default function Lawyers() {
  const d = useLawyersData();
  const [sort, setSort] = useState("default");
  const list = [...d.filteredLawyers]
    .filter((l) => !l.name.includes("تجريبي"))
    .sort((a, b) =>
      sort === "price"
        ? (a.hourlyRate ?? Infinity) - (b.hourlyRate ?? Infinity)
        : sort === "experience"
          ? parseInt(b.experience || "0") - parseInt(a.experience || "0")
          : 0,
    );
  return (
    <Layout>
      <div className="site-container">
        <div className="page-intro">
          <p className="eyebrow">خبرات قانونية متعددة</p>
          <h1>اختر المحامي المناسب لك</h1>
          <p>
            تعرّف على التخصص والخبرة والسعر، ثم اطلع على الملف قبل تقديم طلبك.
          </p>
        </div>
        <section className="page-content">
          <div className="filter-bar">
            <input
              aria-label="البحث عن محامٍ أو تخصص"
              placeholder="ابحث عن محامٍ أو تخصص..."
              value={d.searchTerm}
              onChange={(e) => d.setSearchTerm(e.target.value)}
            />
            <select
              aria-label="التخصص"
              value={d.selectedSpecialty}
              onChange={(e) => d.setSelectedSpecialty(e.target.value)}
            >
              <option value="">جميع التخصصات</option>
              {d.specialties.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              aria-label="ترتيب المحامين"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">ترتيب افتراضي</option>
              <option value="price">السعر: الأقل أولًا</option>
              <option value="experience">الخبرة: الأعلى أولًا</option>
            </select>
          </div>
          {d.loading ? (
            <p className="loading-state" role="status">
              جاري تحميل المحامين...
            </p>
          ) : (
            <>
              <p className="result-count" aria-live="polite">
                {list.length} محاميًا ضمن نتائج البحث
              </p>
              {list.length ? (
                <div className="featured-lawyers-grid">
                  {list.map((l) => (
                    <LawyerCard key={l.id} lawyer={l} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>لم نعثر على محامين بهذه المعايير.</p>
                  <button className="outline-button" onClick={d.resetFilters}>
                    إعادة تعيين البحث
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </Layout>
  );
}
