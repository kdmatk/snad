import { adminDate } from "@/components/admin/adminUtils";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  FileClock,
  FilePlus2,
  Info,
  Menu,
  RefreshCw,
  Search,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { adminNavigation } from "@/components/admin/adminNavigation";
import AdminRequests, {
  AdminEmpty,
  AdminFailure,
} from "@/components/admin/AdminRequests";
import LawyersManagement from "@/components/admin/LawyersManagement";
import ClientsManagement from "@/components/admin/ClientsManagement";
import ServicesManagement from "@/components/admin/ServicesManagement";
import QuickServicesManagement from "@/components/admin/QuickServicesManagement";
import PaymentsManagement from "@/components/admin/PaymentsManagement";
import ArticlesManagement from "@/components/admin/ArticlesManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";
import {
  useAdminOverview,
  useAdminRequests,
  type RequestFilters,
} from "@/hooks/useAdminWorkspace";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import "./admin-dashboard.css";

type OverviewState = Pick<
  ReturnType<typeof useAdminOverview>,
  "data" | "isPending" | "isFetching" | "error"
>;
type RequestState = Pick<
  ReturnType<typeof useAdminRequests>,
  "data" | "isPending" | "isFetching" | "error"
>;
export interface AdminWorkspaceProps {
  admin: { name: string; email: string; role: string };
  view: string;
  overview: OverviewState;
  requestState: RequestState;
  filters: RequestFilters;
  onFilters: (patch: Partial<RequestFilters>) => void;
  onNavigate: (view: string, extra?: Record<string, string>) => void;
  onReload: () => void;
  onLogout: () => void;
  loggingOut: boolean;
  section?: ReactNode;
}
export function AdminWorkspaceView({
  admin,
  view,
  overview,
  requestState,
  filters,
  onFilters,
  onNavigate,
  onReload,
  onLogout,
  loggingOut,
  section,
}: AdminWorkspaceProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  useEffect(() => {
    if (!activityOpen && !accountOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivityOpen(false);
        setAccountOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [activityOpen, accountOpen]);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);
  const stats = overview.data;
  const navigate = (next: string, extra?: Record<string, string>) => {
    setMobileOpen(false);
    setActivityOpen(false);
    setAccountOpen(false);
    onNavigate(next, extra);
  };
  const sidebar = (
    <AdminSidebar
      activeTab={view}
      onTabChange={navigate}
      onLogout={onLogout}
      loggingOut={loggingOut}
      reviewCount={
        stats ? stats.pendingCount + stats.incompleteCount : undefined
      }
    />
  );
  const title =
    view === "overview"
      ? "لوحة الإدارة"
      : adminNavigation.find((n) => n.id === view)?.label || "لوحة الإدارة";
  const requests = (
    <AdminRequests
      requests={requestState.data?.requests ?? []}
      count={requestState.data?.count ?? 0}
      loading={requestState.isPending}
      refreshing={requestState.isFetching}
      error={requestState.error?.message ?? null}
      filters={filters}
      onFilters={onFilters}
      overview={view === "overview"}
      onViewAll={() => navigate("cases")}
      retry={onReload}
    />
  );
  return (
    <div className="admin-workspace" dir="rtl">
      <a className="ad-skip" href="#admin-main">
        انتقل إلى المحتوى
      </a>
      <aside className="ad-sidebar">{sidebar}</aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="ad-mobile-sidebar">
          <SheetTitle className="sr-only">قائمة الإدارة</SheetTitle>
          <SheetDescription className="sr-only">
            انتقل بين أقسام إدارة منصة سند
          </SheetDescription>
          {sidebar}
        </SheetContent>
      </Sheet>
      <div className="ad-work-area">
        <header className="ad-topbar">
          <button
            className="ad-icon-button ad-menu-button"
            aria-label="فتح قائمة الإدارة"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={23} />
          </button>
          <form
            className="ad-global-search ad-search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("cases", { q: globalSearch.trim() });
            }}
          >
            <Search size={20} aria-hidden="true" />
            <input
              aria-label="البحث برقم الطلب أو عنوانه"
              placeholder="البحث برقم الطلب أو عنوانه..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
            <button type="submit" className="sr-only">
              بحث
            </button>
          </form>
          <div className="ad-header-actions">
            <div className="ad-popover-owner">
              <button
                className="ad-icon-button"
                aria-label="ملخص المتابعة"
                aria-expanded={activityOpen}
                onClick={() => {
                  setActivityOpen(!activityOpen);
                  setAccountOpen(false);
                }}
              >
                <Bell size={22} />
              </button>
              {activityOpen && (
                <div className="ad-popover">
                  <h2>ملخص المتابعة</h2>
                  {overview.error ? (
                    <p>تعذّر تحميل الملخص.</p>
                  ) : !stats ? (
                    <p>جارٍ التحميل...</p>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate("cases", { status: "action" })}
                      >
                        {stats.actionCount} طلب بانتظار إجراء
                      </button>
                      <button
                        onClick={() =>
                          navigate("lawyers", { status: "review" })
                        }
                      >
                        {stats.pendingCount} ملف محامٍ قيد المراجعة
                      </button>
                      <p>
                        {stats.incompleteCount} ملف بانتظار استكمال البيانات
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="ad-popover-owner">
              <button
                className="ad-account"
                aria-label="قائمة حساب الإدارة"
                aria-expanded={accountOpen}
                onClick={() => {
                  setAccountOpen(!accountOpen);
                  setActivityOpen(false);
                }}
              >
                <span className="ad-account-avatar">
                  <UserRound size={23} />
                </span>
                <span>{admin.name || "مدير النظام"}</span>
                <ChevronDown size={16} />
              </button>
              {accountOpen && (
                <div className="ad-popover">
                  <strong>{admin.name || "مدير النظام"}</strong>
                  <p dir="ltr">{admin.email}</p>
                  <p>
                    {admin.role === "super_admin"
                      ? "مدير رئيسي"
                      : "مدير المنصة"}
                  </p>
                  <Link to="/">عرض الموقع</Link>
                  <button disabled={loggingOut} onClick={onLogout}>
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="ad-main" id="admin-main">
          <div className="ad-page-heading">
            <div>
              <h1>{title}</h1>
              <p>
                {view === "overview"
                  ? "كل ما يحتاج قرارك، في مكان واحد"
                  : view === "cases"
                    ? "تابع الطلبات المسجلة وحالتها والمحامي المسند إليها"
                    : "إدارة منصة سند للخدمات القانونية"}
              </p>
            </div>
            <div className="ad-date">
              <span>
                <CalendarDays size={18} />
                {new Intl.DateTimeFormat("ar-AE", {
                  timeZone: "Asia/Dubai",
                  calendar: "gregory",
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(now)}
              </span>
              <span>
                الساعة{" "}
                {new Intl.DateTimeFormat("ar-AE", {
                  timeZone: "Asia/Dubai",
                  hour: "numeric",
                  minute: "2-digit",
                }).format(now)}{" "}
                · توقيت دبي
              </span>
              {["overview", "cases"].includes(view) && (
                <button
                  className="ad-text-link"
                  disabled={overview.isFetching || requestState.isFetching}
                  onClick={onReload}
                >
                  <RefreshCw
                    size={14}
                    className={
                      overview.isFetching || requestState.isFetching
                        ? "animate-spin"
                        : ""
                    }
                  />
                  تحديث البيانات
                </button>
              )}
            </div>
          </div>
          {view === "overview" ? (
            <>
              {overview.error && (
                <AdminFailure
                  message={overview.error.message}
                  retry={onReload}
                />
              )}
              <div className="ad-stats" aria-busy={overview.isFetching}>
                {[
                  {
                    label: "ملفات محامين للمراجعة",
                    help: stats
                      ? stats.incompleteCount
                        ? `${stats.incompleteCount} ملف آخر بانتظار استكمال البيانات`
                        : "لا توجد ملفات بانتظار استكمال البيانات"
                      : "بانتظار المراجعة والاعتماد",
                    value: stats?.pendingCount,
                    Icon: UsersRound,
                    tone: "gold",
                    action: () => navigate("lawyers", { status: "review" }),
                  },
                  {
                    label: "طلبات جديدة",
                    help: "تم استلامها خلال آخر ٧ أيام",
                    value: stats?.recentCount,
                    Icon: FilePlus2,
                    tone: "blue",
                    action: () => navigate("cases"),
                  },
                  {
                    label: "طلبات بانتظار إجراء",
                    help: "تحتاج إلى مراجعتك",
                    value: stats?.actionCount,
                    Icon: FileClock,
                    tone: "rose",
                    action: () => navigate("cases", { status: "action" }),
                  },
                ].map(({ label, help, value, Icon, tone, action }) => (
                  <button className="ad-stat" key={label} onClick={action}>
                    <div>
                      <strong>{overview.error ? "—" : (value ?? "…")}</strong>
                      <h2>{label}</h2>
                      <p>{help}</p>
                    </div>
                    <span className={`ad-stat-icon ${tone}`}>
                      <Icon size={30} />
                    </span>
                  </button>
                ))}
              </div>
              <div className="ad-overview-grid">
                {requests}
                <section
                  className="ad-panel ad-review-lawyers"
                  aria-labelledby="ad-review-title"
                >
                  <div className="ad-panel-heading">
                    <h2 id="ad-review-title">ملفات المحامين للمراجعة</h2>
                    <button
                      className="ad-text-link"
                      onClick={() => navigate("lawyers", { status: "review" })}
                    >
                      عرض الكل
                    </button>
                  </div>
                  {overview.error ? (
                    <AdminFailure
                      message="تعذّر تحميل ملفات المراجعة."
                      retry={onReload}
                    />
                  ) : overview.isPending ? (
                    <div className="ad-empty" role="status">
                      جارٍ تحميل الملفات...
                    </div>
                  ) : stats?.lawyers.length ? (
                    stats.lawyers.map((l) => (
                      <article className="ad-review-lawyer" key={l.id}>
                        <div className="ad-applicant">
                          <span className="ad-account-avatar">
                            <UserRound size={25} />
                          </span>
                          <div>
                            <h3>{l.name || "ملف محامٍ غير مكتمل"}</h3>
                            <p>{l.specialty || "بانتظار إضافة التخصص"}</p>
                          </div>
                        </div>
                        <span
                          className={`ad-status ${l.registration_status === "pending" ? "amber" : "muted"}`}
                        >
                          {l.registration_status === "pending"
                            ? "قيد المراجعة"
                            : "بيانات غير مكتملة"}
                        </span>
                        <div className="ad-review-footer">
                          <span>
                            <CalendarDays size={15} />
                            {adminDate(l.created_at)}
                          </span>
                          <button
                            className="ad-outline"
                            onClick={() =>
                              navigate("lawyers", { lawyer: l.id })
                            }
                          >
                            مراجعة الملف
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <AdminEmpty
                      title="لا توجد ملفات للمراجعة"
                      text="ستظهر هنا طلبات المحامين الجديدة والملفات التي تحتاج استكمالًا."
                    />
                  )}
                </section>
              </div>
            </>
          ) : view === "cases" ? (
            requests
          ) : (
            <div className="ad-management">
              {[
                "clients",
                "services",
                "payments",
                "articles",
                "settings",
              ].includes(view) && (
                <p className="ad-demo-note">
                  <Info size={17} />
                  معاينة القسم ببيانات توضيحية؛ الإجراءات هنا لا تمثل سجلات
                  تشغيلية فعلية.
                </p>
              )}
              {section}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default function AdminDashboard() {
  const { admin, loading, isAuthenticated, logoutAdmin } = useAdminAuth();
  const [params, setParams] = useSearchParams();
  const requestedView = params.get("view") || "overview";
  const view = adminNavigation.some((n) => n.id === requestedView)
    ? requestedView
    : "overview";
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(params.get("q") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState(params.get("status") || "all");
  const [loggingOut, setLoggingOut] = useState(false);
  useEffect(() => {
    setSearch(params.get("q") || "");
    setStatus(params.get("status") || "all");
    setPage(0);
    setCategory("all");
  }, [params]);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search), 250);
    return () => window.clearTimeout(timer);
  }, [search]);
  const filters = {
    search,
    status,
    category,
    page,
    pageSize: view === "overview" ? 5 : 15,
  };
  const overview = useAdminOverview(admin?.id);
  const requestState = useAdminRequests(
    admin?.id,
    { ...filters, search: debouncedSearch },
    ["overview", "cases"].includes(view),
  );
  const onNavigate = (next: string, extra: Record<string, string> = {}) =>
    setParams({ view: next, ...extra });
  const onFilters = (patch: Partial<RequestFilters>) => {
    if (patch.search !== undefined) setSearch(patch.search);
    if (patch.status !== undefined) setStatus(patch.status);
    if (patch.category !== undefined) setCategory(patch.category);
    if (patch.page !== undefined) setPage(patch.page);
  };
  const onReload = () => {
    void overview.refetch();
    if (["overview", "cases"].includes(view)) void requestState.refetch();
  };
  if (loading)
    return (
      <div className="admin-workspace ad-loading" dir="rtl" role="status">
        <RefreshCw className="animate-spin" />
        جارٍ التحقق من صلاحية الإدارة...
      </div>
    );
  if (!isAuthenticated || !admin) return <AdminLogin />;
  const onLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutAdmin();
    } finally {
      setLoggingOut(false);
    }
  };
  const sections: Record<string, ReactNode> = {
    lawyers: (
      <LawyersManagement
        selectedLawyerId={params.get("lawyer")}
        initialStatus={params.get("status")}
      />
    ),
    clients: <ClientsManagement />,
    services: <ServicesManagement />,
    "quick-services": <QuickServicesManagement />,
    payments: <PaymentsManagement />,
    articles: <ArticlesManagement />,
    settings: <SettingsManagement />,
  };
  return (
    <AdminWorkspaceView
      admin={admin}
      view={view}
      overview={overview}
      requestState={requestState}
      filters={filters}
      onFilters={onFilters}
      onNavigate={onNavigate}
      onReload={onReload}
      onLogout={onLogout}
      loggingOut={loggingOut}
      section={sections[view]}
    />
  );
}
