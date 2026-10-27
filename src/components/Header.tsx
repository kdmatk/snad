import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Brand from "./Brand";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dashboard, setDashboard] = useState("/client-dashboard");
  const navigate = useNavigate();
  useEffect(() => {
    let alive = true;
    const update = async (u: User | null) => {
      if (!alive) return;
      setUser(u);
      if (u) {
        const { data } = await supabase
          .from("user_profiles")
          .select("user_type")
          .eq("user_id", u.id)
          .maybeSingle();
        if (alive)
          setDashboard(
            data?.user_type === "lawyer"
              ? "/lawyer-dashboard"
              : "/client-dashboard",
          );
      }
    };
    supabase.auth
      .getSession()
      .then(({ data }) => update(data.session?.user ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, s) => {
      setTimeout(() => update(s?.user ?? null), 0);
    });
    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, []);
  const nav = [
    ["الخدمات", "/services"],
    ["الخدمات السريعة", "/quick-services"],
    ["المحامون", "/lawyers"],
    ["كيف تعمل سند", "/faq"],
  ];
  return (
    <header className="site-header">
      <div className="site-container header-row">
        <Brand />
        <nav className="desktop-nav" aria-label="القائمة الرئيسية">
          {nav.map(([label, to]) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          {user ? (
            <>
              <Link className="header-login" to={dashboard}>
                حسابي
              </Link>
              <button
                className="header-signout"
                aria-label="تسجيل الخروج"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate("/");
                }}
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link className="header-login" to="/login">
              تسجيل الدخول
            </Link>
          )}
          <Link className="gold-button" to="/request-service">
            اطلب خدمة
          </Link>
        </div>
        <button
          className="mobile-menu-button"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="قائمة الجوال"
        >
          {nav.map(([label, to]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link to={user ? dashboard : "/login"} onClick={() => setOpen(false)}>
            {user ? "حسابي" : "تسجيل الدخول"}
          </Link>
          <Link to="/lawyer-register" onClick={() => setOpen(false)}>
            انضم كمحامٍ
          </Link>
          <Link
            to="/request-service"
            className="gold-button"
            onClick={() => setOpen(false)}
          >
            اطلب خدمة
          </Link>
        </nav>
      )}
    </header>
  );
}
