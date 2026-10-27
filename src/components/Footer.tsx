import { Link } from "react-router-dom";
import Brand from "./Brand";
export default function Footer() {
  const groups = [
    {
      title: "الخدمات",
      links: [
        ["الخدمات القانونية", "/services"],
        ["الخدمات السريعة", "/quick-services"],
        ["اطلب عروض محامين", "/legal-auctions"],
      ],
    },
    {
      title: "المحامون",
      links: [
        ["تصفح المحامين", "/lawyers"],
        ["انضم كمحامٍ", "/lawyer-register"],
        ["المكتبة القانونية", "/legal-library"],
      ],
    },
    {
      title: "كيف تعمل سند",
      links: [
        ["خطوات الطلب", "/faq"],
        ["الأسئلة الشائعة", "/faq"],
        ["مركز المساعدة", "/contact"],
      ],
    },
    {
      title: "عن سند",
      links: [
        ["من نحن", "/about"],
        ["المقالات القانونية", "/articles"],
        ["تواصل معنا", "/contact"],
      ],
    },
  ];
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>خدمات قانونية واضحة، من محامين متخصصين.</p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h2>{g.title}</h2>
              {g.links.map(([label, to]) => (
                <Link to={to} key={`${to}-${label}`}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>جميع الحقوق محفوظة لسند © {new Date().getFullYear()}</span>
          <div>
            <Link to="/privacy">سياسة الخصوصية</Link>
            <Link to="/terms">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
