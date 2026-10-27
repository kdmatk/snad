import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Home,
  FileText,
  CalendarDays,
  MessageSquare,
  UserRound,
  CircleHelp,
  Search,
  Bell,
  Plus,
  ArrowLeft,
  ChevronLeft,
  Clock3,
  Menu,
  X,
  RefreshCw,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import Brand from "@/components/Brand";
import {
  useClientData,
  type ServiceRequest,
  type ClientConsultation,
} from "@/hooks/useClientData";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import RequestDetails from "@/components/client/RequestDetails";
import {
  consultationTitle,
  consultationType,
  dateLabel,
  documentStatuses,
  futureAppointments,
  shortId,
  statusInfo,
} from "@/components/client/clientUtils";
import "./client-dashboard.css";

type Workspace = ReturnType<typeof useClientData>;
const navigation = [
  { id: "overview", title: "نظرة عامة", Icon: Home },
  { id: "requests", title: "طلباتي", Icon: FileText },
  { id: "appointments", title: "المواعيد", Icon: CalendarDays },
  { id: "consultations", title: "الاستشارات", Icon: MessageSquare },
  { id: "profile", title: "الملف الشخصي", Icon: UserRound },
];
function Status({ value }: { value: string | null }) {
  const s = statusInfo(value);
  return (
    <span className={`cd-status ${s.tone}`}>
      <Clock3 size={14} />
      {s.label}
    </span>
  );
}
function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="cd-empty">
      <FileText size={28} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
function ClientProfile({ data }: { data: Workspace }) {
  const p = data.userProfile;
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({
    full_name: p?.full_name ?? "",
    phone: p?.phone ?? "",
    city: p?.city ?? "",
    bio: p?.bio ?? "",
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.user || !p) return;
    setBusy(true);
    setMessage("");
    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          full_name: fields.full_name.trim(),
          phone: fields.phone.trim() || null,
          city: fields.city.trim() || null,
          bio: fields.bio.trim() || null,
        })
        .eq("user_id", data.user.id)
        .select("id")
        .single();
      if (error) throw error;
      await data.reloadData();
      setEditing(false);
      setMessage("تم تحديث بيانات ملفك.");
    } catch {
      setMessage("تعذّر حفظ البيانات. يرجى المحاولة مرة أخرى.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="cd-panel cd-profile-panel">
      <div className="cd-panel-heading">
        <h2>الملف الشخصي</h2>
        {data.user && p && !editing && (
          <button
            className="cd-link"
            onClick={() => {
              setFields({
                full_name: p.full_name,
                phone: p.phone ?? "",
                city: p.city ?? "",
                bio: p.bio ?? "",
              });
              setEditing(true);
            }}
          >
            تعديل البيانات
          </button>
        )}
      </div>
      {!data.user ? (
        <Empty
          title="سجّل الدخول لعرض ملفك"
          text="ستظهر هنا بيانات الحساب المرتبطة بك."
        />
      ) : editing ? (
        <form onSubmit={save} className="cd-profile-form">
          {(
            [
              ["full_name", "الاسم الكامل"],
              ["phone", "رقم الهاتف"],
              ["city", "المدينة"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label htmlFor={`cd-${key}`}>{label}</label>
              <input
                id={`cd-${key}`}
                value={fields[key]}
                maxLength={key === "phone" ? 25 : 120}
                type={key === "phone" ? "tel" : "text"}
                required={key === "full_name"}
                onChange={(e) =>
                  setFields((f) => ({ ...f, [key]: e.target.value }))
                }
              />
            </div>
          ))}
          <div>
            <label htmlFor="cd-bio">نبذة (اختياري)</label>
            <textarea
              id="cd-bio"
              maxLength={1000}
              value={fields.bio}
              onChange={(e) =>
                setFields((f) => ({ ...f, bio: e.target.value }))
              }
            />
          </div>
          <div className="cd-form-actions">
            <button className="navy-button" disabled={busy}>
              {busy ? "جاري الحفظ..." : "حفظ التعديلات"}
            </button>
            <button
              type="button"
              className="outline-button"
              disabled={busy}
              onClick={() => setEditing(false)}
            >
              إلغاء
            </button>
          </div>
        </form>
      ) : (
        <dl className="cd-profile-values">
          <div>
            <dt>الاسم</dt>
            <dd>{p?.full_name || data.profile?.name || "لم يُضف"}</dd>
          </div>
          <div>
            <dt>البريد الإلكتروني</dt>
            <dd>
              <bdi>{data.user.email || "لم يُضف"}</bdi>
            </dd>
          </div>
          <div>
            <dt>رقم الهاتف</dt>
            <dd>
              <bdi>{p?.phone || data.profile?.phone || "لم يُضف"}</bdi>
            </dd>
          </div>
          <div>
            <dt>المدينة</dt>
            <dd>{p?.city || "لم تُضف"}</dd>
          </div>
          {p?.bio && (
            <div>
              <dt>نبذة</dt>
              <dd>{p.bio}</dd>
            </div>
          )}
        </dl>
      )}
      {message && (
        <p className="cd-inline-message" role="status">
          {message}
        </p>
      )}
    </section>
  );
}
export function ClientDashboardView({ data }: { data: Workspace }) {
  const [params, setParams] = useSearchParams();
  const rawView = params.get("view") ?? "overview";
  const view = navigation.some((n) => n.id === rawView) ? rawView : "overview";
  const query = params.get("q") ?? "";
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<ClientConsultation | null>(null);
  const [showUpdates, setShowUpdates] = useState(false);
  const [dismissed, setDismissed] = useState<string | null>(null);
  const choose = (next: string) => {
    setParams(next === "overview" ? {} : { view: next });
    setMenuOpen(false);
  };
  const currentTitle = navigation.find((n) => n.id === view)!.title;
  const selected = data.requests.find((r) => r.id === selectedRequest) ?? null;
  const needsDocuments = data.requests.find((r) =>
    documentStatuses.has(r.status ?? ""),
  );
  const activeRequest = data.requests.find(
    (r) => !["completed", "closed", "cancelled"].includes(r.status ?? ""),
  );
  const next = futureAppointments(data.consultations)[0];
  const search = (text: string) =>
    text.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
  const requests = data.requests.filter((r) =>
    search(
      `${r.title} ${r.case_number || ""} ${r.category} ${r.lawyer?.name ?? ""}`,
    ),
  );
  const shownRequests = view === "overview" ? requests.slice(0, 5) : requests;
  const consultationRows = data.consultations
    .filter((c) => search(`${consultationTitle(c)} ${c.lawyers?.name ?? ""}`))
    .filter((c) =>
      view === "appointments"
        ? ["pending", "scheduled", "confirmed"].includes(c.status ?? "")
        : true,
    );
  const updates = [
    ...data.requests.map((r) => ({
      id: `request-${r.id}`,
      title: r.title,
      text: `${statusInfo(r.status).label} • طلب ${shortId(r)}`,
      at: r.updated_at || r.created_at,
      requestId: r.id,
    })),
    ...data.consultations.map((c) => ({
      id: `consultation-${c.id}`,
      title: consultationTitle(c),
      text: `${statusInfo(c.status).label} • ${consultationType(c.type)}`,
      at: c.created_at,
      requestId: null,
    })),
  ].sort(
    (a, b) => (Date.parse(b.at || "") || 0) - (Date.parse(a.at || "") || 0),
  );
  const bannerKey = !data.user
    ? "signin"
    : needsDocuments?.id || activeRequest?.id || "start";
  const actionTitle = !data.user
    ? "كل خدماتك القانونية تبدأ من حسابك"
    : needsDocuments
      ? "طلبك يحتاج مستندًا لاستكمال المراجعة"
      : activeRequest
        ? "تابع آخر مستجدات طلبك"
        : "ابدأ خدمتك القانونية الأولى";
  const actionText = !data.user
    ? "سجّل الدخول لعرض طلباتك ومواعيدك ومتابعة تحديثاتها."
    : needsDocuments
      ? `${needsDocuments.title} • طلب ${shortId(needsDocuments)}`
      : activeRequest
        ? `${activeRequest.title} • ${statusInfo(activeRequest.status).label}`
        : "اختر الخدمة المناسبة، وأرسل تفاصيل احتياجك في خطوات واضحة.";
  return (
    <div className="client-dashboard" dir="rtl">
      <a className="skip-link" href="#client-main">
        انتقل إلى المحتوى
      </a>
      <aside
        className={`cd-sidebar ${menuOpen ? "is-open" : ""}`}
        aria-label="تنقل حساب العميل"
      >
        <Brand />
        <nav aria-label="قائمة حسابي">
          {navigation.map(({ id, title, Icon }) => (
            <button
              key={id}
              aria-current={view === id ? "page" : undefined}
              onClick={() => choose(id)}
              className={view === id ? "active" : ""}
            >
              <Icon size={23} />
              <span>{title}</span>
            </button>
          ))}
        </nav>
        <div className="cd-sidebar-bottom">
          <Link to="/contact">
            <CircleHelp size={22} />
            دعم ومساعدة
          </Link>
          <Link to="/">
            العودة إلى الموقع <ArrowLeft size={16} />
          </Link>
          {data.user && (
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                choose("overview");
              }}
            >
              <LogOut size={17} />
              تسجيل الخروج
            </button>
          )}
        </div>
      </aside>
      {menuOpen && (
        <button
          className="cd-menu-backdrop"
          aria-label="إغلاق القائمة"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div className="cd-workspace">
        <header className="cd-topbar">
          <div className="cd-breadcrumb">
            <button
              className="cd-menu-toggle"
              aria-label={menuOpen ? "إغلاق قائمة الحساب" : "فتح قائمة الحساب"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
            <span>حسابي</span>
            <span aria-hidden="true">/</span>
            <strong>{currentTitle}</strong>
          </div>
          <div className="cd-top-actions">
            <div className="cd-search">
              <Search size={20} />
              <input
                aria-label="البحث في طلباتك وخدماتك"
                placeholder="البحث في طلباتك وخدماتك..."
                value={query}
                onChange={(e) => {
                  const p = new URLSearchParams(params);
                  if (e.target.value) p.set("q", e.target.value);
                  else p.delete("q");
                  setParams(p, { replace: true });
                }}
              />
              {query && (
                <button
                  aria-label="مسح البحث"
                  onClick={() => {
                    const p = new URLSearchParams(params);
                    p.delete("q");
                    setParams(p, { replace: true });
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>
            <button
              className="cd-notification"
              aria-label="عرض آخر التحديثات"
              onClick={() => setShowUpdates(true)}
            >
              <Bell size={23} />
              {needsDocuments && <span className="cd-notification-dot" />}
            </button>
          </div>
        </header>
        <main id="client-main" className="cd-main">
          <div className="cd-welcome">
            <div>
              <p>
                مرحبًا{" "}
                {data.userProfile?.full_name
                  ? `بك، ${data.userProfile.full_name.split(" ")[0]}`
                  : "بك في سند"}
              </p>
              <h1>
                {view === "overview"
                  ? "كل ما يخص خدماتك، في مكان واحد"
                  : currentTitle}
              </h1>
              <p className="cd-welcome-description">
                تابع طلباتك ومواعيدك واستشاراتك القانونية بسهولة، ومن مكان واحد.
              </p>
            </div>
            <Link to="/request-service" className="gold-button">
              <Plus size={20} />
              طلب خدمة جديدة
            </Link>
          </div>
          {data.error && (
            <div className="cd-load-error" role="alert">
              <span>{data.error}</span>
              <button
                className="cd-link"
                onClick={() => data.reloadData()}
                disabled={data.refreshing}
              >
                <RefreshCw size={16} />
                إعادة المحاولة
              </button>
            </div>
          )}
          {view === "overview" && dismissed !== bannerKey && !data.loading && (
            <section className="cd-action-banner">
              <span className="cd-action-icon">
                <FileText size={25} />
              </span>
              <div>
                <h2>{actionTitle}</h2>
                <p>{actionText}</p>
              </div>
              {!data.user ? (
                <Link className="navy-button" to="/login">
                  تسجيل الدخول
                </Link>
              ) : needsDocuments || activeRequest ? (
                <button
                  className="navy-button"
                  onClick={() =>
                    setSelectedRequest((needsDocuments || activeRequest)!.id)
                  }
                >
                  {needsDocuments ? "استكمال المستندات" : "عرض الطلب"}
                  <FileText size={17} />
                </button>
              ) : (
                <Link className="navy-button" to="/quick-services">
                  استعرض الخدمات <ArrowLeft size={16} />
                </Link>
              )}
              <button
                className="cd-dismiss"
                aria-label="إخفاء التنبيه"
                onClick={() => setDismissed(bannerKey)}
              >
                <X size={18} />
              </button>
            </section>
          )}
          {data.loading ? (
            <div className="cd-loading" role="status">
              <RefreshCw className="animate-spin" size={24} />
              جاري تحميل بيانات حسابك...
            </div>
          ) : view === "profile" ? (
            <ClientProfile key={data.user?.id || "guest"} data={data} />
          ) : view === "overview" || view === "requests" ? (
            <div className={view === "overview" ? "cd-overview-grid" : ""}>
              <section className="cd-panel cd-requests">
                <div className="cd-panel-heading">
                  <h2>
                    {view === "overview" ? "طلباتي الأخيرة" : "جميع طلباتي"}
                  </h2>
                  {view === "overview" && (
                    <button
                      className="cd-link"
                      onClick={() => choose("requests")}
                    >
                      عرض كل الطلبات <ArrowLeft size={17} />
                    </button>
                  )}
                </div>
                {shownRequests.length ? (
                  <div className="cd-table-scroll">
                    <table className="cd-request-table">
                      <thead>
                        <tr>
                          <th scope="col">الخدمة</th>
                          <th scope="col">المحامي</th>
                          <th scope="col">الحالة</th>
                          <th scope="col">آخر تحديث</th>
                          <th scope="col">
                            <span className="sr-only">التفاصيل</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {shownRequests.map((r) => (
                          <tr key={r.id}>
                            <td>
                              <div className="cd-table-service">
                                <span className="cd-file-icon">
                                  <FileText size={22} />
                                </span>
                                <div>
                                  <button
                                    onClick={() => setSelectedRequest(r.id)}
                                  >
                                    {r.title}
                                  </button>
                                  <small>
                                    طلب <bdi>{shortId(r)}</bdi>
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td>
                              {r.lawyer ? (
                                <div className="cd-table-lawyer">
                                  <span aria-hidden="true">
                                    {r.lawyer.name[0]}
                                  </span>
                                  <div>
                                    {r.lawyer.name}
                                    <small>المحامي المعين</small>
                                  </div>
                                </div>
                              ) : (
                                <span className="cd-muted">لم يُعيّن بعد</span>
                              )}
                            </td>
                            <td>
                              <Status value={r.status} />
                            </td>
                            <td>
                              <time
                                dateTime={
                                  r.updated_at || r.created_at || undefined
                                }
                              >
                                {dateLabel(r.updated_at || r.created_at)}
                              </time>
                            </td>
                            <td>
                              <button
                                className="cd-row-action"
                                aria-label={`عرض تفاصيل ${r.title}`}
                                onClick={() => setSelectedRequest(r.id)}
                              >
                                <ChevronLeft size={21} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Empty
                    title={
                      query
                        ? "لا توجد طلبات تطابق بحثك"
                        : "لا توجد طلبات حتى الآن"
                    }
                    text={
                      query
                        ? "جرّب اسم الخدمة أو رقم الطلب."
                        : data.user
                          ? "عند تقديم أول طلب، ستظهر تفاصيله وحالته هنا."
                          : "سجّل الدخول لتظهر هنا الطلبات المرتبطة بحسابك."
                    }
                  />
                )}
              </section>
              {view === "overview" && (
                <aside className="cd-summary">
                  <section className="cd-panel cd-appointment">
                    <h2>
                      <span className="cd-heading-icon">
                        <CalendarDays size={22} />
                      </span>
                      موعدك القادم
                    </h2>
                    {next ? (
                      <>
                        <div className="cd-appointment-body">
                          <p>
                            {new Intl.DateTimeFormat("ar-AE", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              calendar: "gregory",
                            }).format(new Date(next.started_at!))}
                          </p>
                          <strong>
                            <Clock3 size={21} />
                            {new Intl.DateTimeFormat("ar-AE", {
                              hour: "numeric",
                              minute: "2-digit",
                            }).format(new Date(next.started_at!))}
                          </strong>
                          <small>
                            بتوقيت جهازك (
                            {Intl.DateTimeFormat().resolvedOptions().timeZone})
                          </small>
                          <hr />
                          <h3>{consultationTitle(next)}</h3>
                          <p>
                            {next.duration_minutes
                              ? `${next.duration_minutes} دقيقة`
                              : consultationType(next.type)}
                          </p>
                        </div>
                        <button
                          className="outline-button"
                          onClick={() => setSelectedAppointment(next)}
                        >
                          عرض التفاصيل
                        </button>
                      </>
                    ) : (
                      <div className="cd-no-appointment">
                        <CalendarDays size={28} />
                        <h3>لم يُحدد موعد قادم</h3>
                        <p>سيظهر هنا الموعد بعد تأكيد وقته.</p>
                        <button
                          className="outline-button"
                          onClick={() => choose("appointments")}
                        >
                          عرض المواعيد
                        </button>
                      </div>
                    )}
                  </section>
                  <section className="cd-panel cd-latest">
                    <h2>
                      <span className="cd-heading-icon">
                        <FileText size={22} />
                      </span>
                      آخر تحديث
                    </h2>
                    {updates[0] ? (
                      <>
                        <p>{updates[0].title}</p>
                        <span>{updates[0].text}</span>
                        <time>{dateLabel(updates[0].at, true)}</time>
                        <button
                          className="cd-link"
                          onClick={() =>
                            updates[0].requestId
                              ? setSelectedRequest(updates[0].requestId)
                              : choose("consultations")
                          }
                        >
                          عرض التفاصيل <ArrowLeft size={14} />
                        </button>
                      </>
                    ) : (
                      <p className="cd-muted">لا توجد تحديثات لعرضها بعد.</p>
                    )}
                  </section>
                </aside>
              )}
            </div>
          ) : (
            <section className="cd-panel">
              <div className="cd-panel-heading">
                <h2>
                  {view === "appointments"
                    ? "مواعيد الاستشارات"
                    : "استشاراتي القانونية"}
                </h2>
              </div>
              {consultationRows.length ? (
                <div className="cd-consultation-list">
                  {consultationRows.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedAppointment(c)}
                    >
                      <span className="cd-file-icon">
                        <MessageSquare size={21} />
                      </span>
                      <span>
                        <strong>{consultationTitle(c)}</strong>
                        <small>
                          {c.lawyers?.name || "لم يُحدد المحامي"} •{" "}
                          {consultationType(c.type)}
                        </small>
                      </span>
                      <Status value={c.status} />
                      <ChevronLeft size={19} />
                    </button>
                  ))}
                </div>
              ) : (
                <Empty
                  title={
                    query
                      ? "لا توجد نتائج مطابقة"
                      : view === "appointments"
                        ? "لا توجد مواعيد لعرضها"
                        : "لا توجد استشارات حتى الآن"
                  }
                  text={
                    view === "appointments"
                      ? "تظهر أوقات المواعيد المؤكدة عند تسجيلها، وتبقى الطلبات غير المجدولة قيد التنسيق."
                      : "ستظهر هنا الاستشارات المرتبطة بحسابك."
                  }
                />
              )}
            </section>
          )}
          <p className="cd-page-footnote">
            سند — خدمات قانونية واضحة، من محامين متخصصين.
          </p>
        </main>
      </div>
      <RequestDetails
        key={selectedRequest || "closed"}
        request={selected}
        userId={data.user?.id}
        onClose={() => setSelectedRequest(null)}
        onUpdated={data.reloadData}
      />
      <Dialog open={showUpdates} onOpenChange={setShowUpdates}>
        <DialogContent className="cd-request-dialog" dir="rtl">
          <DialogTitle>آخر التحديثات</DialogTitle>
          <DialogDescription>
            آخر الحالات المسجلة لطلباتك واستشاراتك.
          </DialogDescription>
          {updates.length ? (
            <ul className="cd-updates-list">
              {updates.slice(0, 10).map((u) => (
                <li key={u.id}>
                  <CheckCircle2 size={19} />
                  <div>
                    <strong>{u.title}</strong>
                    <p>{u.text}</p>
                    <time>{dateLabel(u.at, true)}</time>
                    {u.requestId && (
                      <button
                        className="cd-link"
                        onClick={() => {
                          setShowUpdates(false);
                          setSelectedRequest(u.requestId);
                        }}
                      >
                        عرض الطلب
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty
              title="لا توجد تحديثات"
              text="ستظهر الحالات المسجلة لطلباتك هنا."
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!selectedAppointment}
        onOpenChange={(open) => {
          if (!open) setSelectedAppointment(null);
        }}
      >
        <DialogContent className="cd-request-dialog" dir="rtl">
          {selectedAppointment && (
            <>
              <DialogTitle>
                {consultationTitle(selectedAppointment)}
              </DialogTitle>
              <DialogDescription>
                تفاصيل الاستشارة المسجلة في حسابك.
              </DialogDescription>
              <dl className="cd-profile-values">
                <div>
                  <dt>المحامي</dt>
                  <dd>{selectedAppointment.lawyers?.name || "لم يُحدد"}</dd>
                </div>
                <div>
                  <dt>الحالة</dt>
                  <dd>
                    <Status value={selectedAppointment.status} />
                  </dd>
                </div>
                <div>
                  <dt>طريقة الاستشارة</dt>
                  <dd>{consultationType(selectedAppointment.type)}</dd>
                </div>
                <div>
                  <dt>وقت الجلسة</dt>
                  <dd>
                    {[
                      "scheduled",
                      "confirmed",
                      "in_progress",
                      "completed",
                    ].includes(selectedAppointment.status || "") &&
                    selectedAppointment.started_at
                      ? dateLabel(selectedAppointment.started_at, true)
                      : "بانتظار تنسيق الوقت"}
                  </dd>
                </div>
                <div>
                  <dt>تاريخ الطلب</dt>
                  <dd>{dateLabel(selectedAppointment.created_at)}</dd>
                </div>
                {selectedAppointment.duration_minutes !== null && (
                  <div>
                    <dt>المدة</dt>
                    <dd>{selectedAppointment.duration_minutes} دقيقة</dd>
                  </div>
                )}
              </dl>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default function ClientDashboard() {
  const data = useClientData();
  return <ClientDashboardView data={data} />;
}
