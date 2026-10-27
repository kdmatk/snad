import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
export default function Articles() {
  const [articles, setArticles] = useState<Tables<"legal_articles">[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    let live = true;
    supabase
      .from("legal_articles")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (live) {
          setArticles(data ?? []);
          setError(!!error);
          setLoading(false);
        }
      });
    return () => {
      live = false;
    };
  }, []);
  const article = articles.find((a) => a.id === params.get("article"));
  return (
    <Layout>
      <div className="site-container page-content">
        <div className="page-intro">
          <p className="eyebrow">المعرفة القانونية</p>
          <h1>{article?.title ?? "المقالات القانونية"}</h1>
          <p>
            {article
              ? "محتوى قانوني للتوعية العامة؛ تختلف التفاصيل باختلاف الحالة والاختصاص."
              : "مقالات منشورة للتوعية وفهم المسائل القانونية."}
          </p>
        </div>
        {article ? (
          <article className="surface max-w-4xl mx-auto">
            <button className="text-link mb-5" onClick={() => setParams({})}>
              العودة إلى المقالات
            </button>
            <p className="eyebrow">{article.category}</p>
            <div className="article-body">{article.content}</div>
            {article.updated_at && (
              <p className="text-xs text-muted-foreground mt-6">
                آخر تحديث:{" "}
                {new Date(article.updated_at).toLocaleDateString("ar-SA")}
              </p>
            )}
          </article>
        ) : (
          <>
            <div className="filter-bar">
              <input
                aria-label="ابحث في المقالات"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث بعنوان المقال أو التصنيف..."
              />
            </div>
            {loading ? (
              <p className="loading-state" role="status">
                جاري تحميل المقالات...
              </p>
            ) : error ? (
              <p className="error-message">
                تعذّر تحميل المقالات. حاول مرة أخرى لاحقًا.
              </p>
            ) : articles.filter((a) =>
                `${a.title} ${a.category}`.includes(query),
              ).length ? (
              <div className="article-grid">
                {articles
                  .filter((a) => `${a.title} ${a.category}`.includes(query))
                  .map((a) => (
                    <article className="article-card" key={a.id}>
                      <span className="eyebrow">{a.category}</span>
                      <h2>{a.title}</h2>
                      <p>{a.content.slice(0, 150)}…</p>
                      <button
                        className="outline-button"
                        onClick={() => {
                          setParams({ article: a.id });
                          window.scrollTo(0, 0);
                        }}
                      >
                        اقرأ المقال
                      </button>
                    </article>
                  ))}
              </div>
            ) : (
              <div className="empty-state">
                <h2>لا توجد مقالات منشورة مطابقة حاليًا</h2>
                <p>يمكنك استعراض المكتبة القانونية أو طلب خدمة متخصصة.</p>
                <Link className="outline-button" to="/legal-library">
                  المكتبة القانونية
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
