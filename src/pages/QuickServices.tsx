import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import QuickServiceCard from "@/components/quick-services/QuickServiceCard";
import QuickServicesFAQ from "@/components/quick-services/QuickServicesFAQ";
import { useQuickServicesData } from "@/hooks/useQuickServicesData";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Clock3 } from "lucide-react";
export default function QuickServices() {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const query = params.get("q") ?? "";
  const { services, categories, loading } = useQuickServicesData();
  const selected = services.find((s) => s.id === params.get("service"));
  const list = services
    .filter(
      (s) =>
        (category === "all" || s.category === category) &&
        `${s.title} ${s.description}`.includes(query),
    )
    .sort((a, b) =>
      sort === "price"
        ? a.price - b.price
        : sort === "duration"
          ? a.durationHours - b.durationHours
          : 0,
    );
  const close = () => {
    const next = new URLSearchParams(params);
    next.delete("service");
    setParams(next, { replace: true });
  };
  return (
    <Layout>
      <div className="site-container page-content">
        <div className="page-intro">
          <p className="eyebrow">نطاق محدد • سعر واضح</p>
          <h1>الخدمات القانونية السريعة</h1>
          <p>
            اختر الخدمة وراجع نطاق العمل والسعر ومدة التنفيذ قبل تقديم طلبك.
          </p>
        </div>
        <div className="filter-bar">
          <input
            aria-label="ابحث عن خدمة"
            value={query}
            placeholder="ابحث عن خدمة..."
            onChange={(e) => {
              const p = new URLSearchParams(params);
              if (e.target.value) p.set("q", e.target.value);
              else p.delete("q");
              setParams(p, { replace: true });
            }}
          />
          <select
            aria-label="فئة الخدمة"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">جميع الفئات</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            aria-label="ترتيب الخدمات"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">ترتيب افتراضي</option>
            <option value="price">السعر: الأقل أولًا</option>
            <option value="duration">المدة: الأقصر أولًا</option>
          </select>
        </div>
        {loading ? (
          <p className="loading-state" role="status">
            جاري تحميل الخدمات...
          </p>
        ) : list.length ? (
          <>
            <p className="result-count">{list.length} خدمات ضمن نتائج البحث</p>
            <div className="home-services-grid">
              {list.map((s) => (
                <QuickServiceCard
                  key={s.id}
                  service={s}
                  onOrder={(service) => {
                    const p = new URLSearchParams(params);
                    p.set("service", service.id);
                    setParams(p);
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>لا توجد خدمات مطابقة لهذا البحث.</p>
            <button
              className="outline-button"
              onClick={() => {
                setCategory("all");
                setParams({});
              }}
            >
              عرض جميع الخدمات
            </button>
          </div>
        )}
        <div className="mt-12">
          <QuickServicesFAQ />
        </div>
      </div>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) close();
        }}
      >
        <DialogContent className="service-dialog max-w-xl" dir="rtl">
          {selected && (
            <>
              <span className="eyebrow">{selected.category}</span>
              <DialogTitle>{selected.title}</DialogTitle>
              <DialogDescription>{selected.description}</DialogDescription>
              <div className="service-facts">
                <strong>{selected.price.toLocaleString("ar-SA")} ريال</strong>
                <span>
                  <Clock3 size={17} />
                  {selected.duration}
                </span>
              </div>
              <div className="notice">
                تبدأ مدة التنفيذ بعد قبول الطلب واستلام المتطلبات كاملة. تُراجع
                تفاصيل نطاق العمل مع مقدم الخدمة.
              </div>
              <Link
                className="navy-button mt-3"
                to={`/request-service?quick_service=${selected.id}`}
              >
                متابعة طلب الخدمة
              </Link>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
