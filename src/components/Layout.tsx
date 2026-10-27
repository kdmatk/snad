import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return (
    <div className="site-layout" dir="rtl">
      <a href="#main-content" className="skip-link">
        انتقل إلى المحتوى
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
