import { EmptyState as Empty, LoadingState, FailureState } from "@/components/ui/workspace-state";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FileText,
  MessageSquare,
  UserRound,
  CircleHelp,
  Search,
  Bell,
  ArrowLeft,
  ChevronLeft,
  Clock3,
  Menu,
  X,
  RefreshCw,
  LogOut,
  Check,
  Settings,
  CalendarDays,
  Pencil,
  Archive,
} from "lucide-react";
import Brand from "@/components/Brand";
import LawyerApplicationForm from "@/components/LawyerApplicationForm";
import {
  useLawyerWorkspace,
  type LawyerRequest,
  type LawyerConsultation,
} from "@/hooks/useLawyerWorkspace";
import {
  initials,
  nextConsultation,
  requestLane,
  requestNumber,
} from "@/components/lawyer/workspaceUtils";
import {
  dateLabel,
  statusInfo,
  consultationType,
} from "@/components/client/clientUtils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import "./client-dashboard.css";
import "./lawyer-dashboard.css";
type Workspace = ReturnType<typeof useLawyerWorkspace>;
const nav = [
  { id: "requests", label: "الطلبات", Icon: FileText },
  { id: "consultations", label: "الاستشارات", Icon: MessageSquare },
  { id: "profile", label: "الملف المهني", Icon: UserRound },
  { id: "help", label: "المساعدة", Icon: CircleHelp },
];
const lanes = [
  { id: "review", title: "قيد المراجعة", Icon: Clock3 },
  { id: "progress", title: "قيد التنفيذ", Icon: Settings },
  { id: "complete", title: "مكتمل", Icon: Check },
] as const;

function RequestCard({
  request,
  onOpen,
}: {
  request: LawyerRequest;
  onOpen: () => void;
}) {
  const consultation =
    request.category.includes("استشار") || request.title.includes("استشار");
  return (
    <button
      className="lw-request-card"
      onClick={onOpen}
      aria-label={`تفاصيل طلب ${requestNumber(request)}: ${request.title}`}
    >
      <div className="lw-card-heading">
        <span
          className={`lw-service-icon ${consultation ? "is-consultation" : ""}`}
        >
          {consultation ? <MessageSquare size={23} /> : <FileText size={23} />}
        </span>
        <div>
          <h3>{request.title}</h3>
          <p>
            طلب رقم • <bdi>{requestNumber(request)}</bdi>
          </p>
        </div>
      </div>
      <p className="lw-card-description">
        {request.description || "لم يُضف وصف تفصيلي للطلب."}
      </p>
      <div className="lw-card-footer">
        <span className="lw-avatar" aria-hidden="true">
          {request.clientName ? (
            initials(request.clientName)
          ) : (
            <UserRound size={21} />
          )}
        </span>
        <div className="lw-card-client">
          <small>العميل</small>
          <span>{request.clientName || "لم يُضف الاسم"}</span>
        </div>
        <div className="lw-card-date">
          <small>آخر تحديث</small>
          <time
            dateTime={request.updated_at || request.created_at || undefined}
          >
            {dateLabel(request.updated_at || request.created_at)}
          </time>
        </div>
        <ChevronLeft size={20} className="lw-card-arrow" />
      </div>
    </button>
  );
}
export function LawyerDashboardView({ data }: { data: Workspace }) {
  const [params, setParams] = useSearchParams();
  const rawView = params.get("view") || "requests";
  const view = nav.some((n) => n.id === rawView) ? rawView : "requests";
  const q = params.get("q") || "";
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<LawyerConsultation | null>(
    null,
  );
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [signOutError, setSignOutError] = useState("");
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  const choose = (next: string) => {
    setParams(next === "requests" ? {} : { view: next });
    setMenuOpen(false);
  };
  const search = (text: string) =>
    text.toLocaleLowerCase().includes(q.trim().toLocaleLowerCase());
  const requests = data.requests.filter((r) =>
    search(
      `${r.title} ${r.description || ""} ${r.case_number || ""} ${r.clientName || ""}`,
    ),
  );
  const archive = requests.filter((r) => requestLane(r.status) === "archive");
  const selected = data.requests.find((r) => r.id === requestId);
  const next = nextConsultation(data.consultations);
  const consultations = data.consultations.filter((c) =>
    search(`${c.legal_services?.name || ""} ${c.clients?.name || ""}`),
  );
  const approved =
    !!data.lawyer &&
    data.lawyer.registration_status === "approved" &&
    !!data.lawyer.license_verified;
  const applicationStatus =
    data.lawyer?.registration_status === "pending"
      ? "طلبك قيد المراجعة"
      : data.lawyer?.registration_status === "rejected"
        ? "طلبك يحتاج مراجعة بياناتك"
        : "الملف المهني قيد الاستكمال";
  const updates = [
    ...data.requests.map((r) => ({
      id: r.id,
      title: r.title,
      text: statusInfo(r.status).label,
      at: r.updated_at || r.created_at,
      request: r,
    })),
    ...data.consultations.map((c) => ({
      id: c.id,
      title: c.legal_services?.name || "استشارة قانونية",
      text: statusInfo(c.status).label,
      at: c.created_at,
      request: null,
    })),
  ]
    .sort(
      (a, b) => (Date.parse(b.at || "") || 0) - (Date.parse(a.at || "") || 0),
    )
    .slice(0, 10);
  return (
    <div className="client-dashboard lawyer-dashboard" dir="rtl">
      <a className="skip-link" href="#lawyer-main">
        انتقل إلى المحتوى
      </a>
      <aside
        className={`cd-sidebar ${menuOpen ? "is-open" : ""}`}
        aria-label="تنقل حساب المحامي"
      >
        <Brand />
        <nav aria-label="قائمة المحامي">
          {nav.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={view === id ? "active" : ""}
              aria-current={view === id ? "page" : undefined}
              onClick={() => choose(id)}
            >
              <Icon size={25} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="cd-sidebar-bottom">
          <Link to="/">
            <LogOut size={22} />
            العودة إلى الموقع
          </Link>
          {data.user && (
            <button
              onClick={async () => {
                setSignOutError("");
                const { error } = await supabase.auth.signOut();
                if (error) setSignOutError("تعذّر تسجيل الخروج. أعد المحاولة.");
                else choose("requests");
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
              aria-label={
                menuOpen ? "إغلاق قائمة المحامي" : "فتح قائمة المحامي"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
            <strong>حساب المحامي</strong>
            <span>/</span>
            <span>{nav.find((n) => n.id === view)!.label}</span>
          </div>
          <div className="cd-top-actions">
            <div className="cd-search">
              <Search size={21} />
              <input
                aria-label="البحث في طلبات المحامي"
                placeholder="البحث في الطلبات..."
                value={q}
                onChange={(e) => {
                  const p = new URLSearchParams(params);
                  if (!["requests", "consultations"].includes(view)) p.delete("view");
                  if (e.target.value) p.set("q", e.target.value);
                  else p.delete("q");
                  setParams(p, { replace: true });
                }}
              />
              {q && (
                <button
                  aria-label="مسح البحث"
                  onClick={() => {
                    const p = new URLSearchParams(params);
                    p.delete("q");
                    setParams(p, { replace: true });
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              className="cd-notification"
              aria-label="عرض آخر تحديثات المحامي"
              onClick={() => setUpdatesOpen(true)}
            >
              <Bell size={24} />
            </button>
          </div>
        </header>
        <main id="lawyer-main" className="cd-main lw-main">
          {data.error && <FailureState message={data.error} retry={() => { void data.reloadData(); }} busy={data.refreshing} />}
          {signOutError && (
            <p role="alert" className="cd-load-error">
              {signOutError}
            </p>
          )}
          {data.loading ? (
            <LoadingState text="جارٍ تحميل مساحة عملك..." />
          ) : data.error && !data.requests.length && !data.consultations.length && ["requests", "consultations", "archive"].includes(view) ? null : (
            <>
              {view === "requests" && (
                <>
                  <section
                    className="lw-appointment-strip"
                    aria-label="الموعد القادم"
                  >
                    {next ? (
                      <>
                        <button
                          className="lw-appointment-details"
                          onClick={() => setAppointment(next)}
                        >
                          عرض التفاصيل <ChevronLeft size={20} />
                        </button>
                        <div className="lw-appointment-subject">
                          <span className="lw-service-icon is-consultation">
                            <MessageSquare size={24} />
                          </span>
                          <div>
                            <h2>
                              {next.legal_services?.name || "استشارة قانونية"}
                            </h2>
                            <p>
                              {consultationType(next.type)}
                              {next.clients?.name
                                ? ` مع ${next.clients.name}`
                                : ""}
                            </p>
                          </div>
                        </div>
                        <div className="lw-appointment-date">
                          <CalendarDays size={29} />
                          <div>
                            <h3>الموعد القادم</h3>
                            <p>{dateLabel(next.started_at)}</p>
                            <span>
                              {new Intl.DateTimeFormat("ar-AE", {
                                hour: "numeric",
                                minute: "2-digit",
                              }).format(new Date(next.started_at!))}{" "}
                              • بتوقيت جهازك
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="lw-appointment-details">
                          <CalendarDays size={27} />
                        </div>
                        <div className="lw-appointment-subject">
                          <div>
                            <h2>لا يوجد موعد قادم مؤكد</h2>
                            <p>
                              {data.user
                                ? "سيظهر موعد الاستشارة هنا بعد تسجيل وقتها وتأكيدها."
                                : "سجّل الدخول لعرض مواعيدك وطلباتك."}
                            </p>
                          </div>
                        </div>
                        <button
                          className="cd-link"
                          onClick={() => choose("consultations")}
                        >
                          عرض الاستشارات <ChevronLeft size={18} />
                        </button>
                      </>
                    )}
                  </section>
                  <div className="lw-heading">
                    <div>
                      <h1>كل طلب، وخطوته التالية</h1>
                      <p>تابع طلباتك بسهولة من المراجعة حتى الإغلاق.</p>
                    </div>
                    <button
                      className="gold-button"
                      onClick={() => choose("profile")}
                    >
                      <Pencil size={21} />
                      تحديث الملف المهني
                    </button>
                  </div>
                  {!data.error && !data.user && (
                    <div className="lw-account-notice">
                      <UserRound size={23} />
                      <div>
                        <h2>سجّل الدخول إلى حساب المحامي</h2>
                        <p>ستظهر هنا الطلبات المسندة إليك بعد تسجيل الدخول.</p>
                      </div>
                      <Link to="/login" className="navy-button">
                        تسجيل الدخول
                      </Link>
                    </div>
                  )}
                  {!data.error && data.user && !approved && (
                    <div className="lw-account-notice">
                      <UserRound size={23} />
                      <div>
                        <h2>
                          {data.lawyer || data.profile?.user_type === "lawyer"
                            ? applicationStatus
                            : "هذا الحساب غير مرتبط بملف محامٍ"}
                        </h2>
                        <p>
                          {data.lawyer
                            ? "طلبك ظاهر للإدارة، وملفك غير منشور حتى استكمال بياناته واعتماده."
                            : "راجع حسابك أو تواصل مع الإدارة لربط الملف المهني."}
                        </p>
                      </div>
                      <button
                        className="outline-button"
                        onClick={() => choose("profile")}
                      >
                        عرض الملف المهني
                      </button>
                    </div>
                  )}
                  <div className="lw-board">
                    {lanes.map(({ id, title, Icon }) => {
                      const items = requests.filter(
                        (r) => requestLane(r.status) === id,
                      );
                      return (
                        <section
                          className={`lw-lane ${id}`}
                          key={id}
                          aria-labelledby={`lw-lane-${id}`}
                        >
                          <header>
                            <span className="lw-lane-icon">
                              <Icon size={27} />
                            </span>
                            <h2 id={`lw-lane-${id}`}>{title}</h2>
                            <span className="lw-lane-count">
                              {items.length}
                            </span>
                          </header>
                          <div className="lw-lane-body">
                            {items.length ? (
                              items.map((r) => (
                                <RequestCard
                                  key={r.id}
                                  request={r}
                                  onOpen={() => setRequestId(r.id)}
                                />
                              ))
                            ) : (
                              <Empty
                                title={
                                  q ? "لا توجد نتائج مطابقة" : "لا توجد طلبات"
                                }
                                text={
                                  q
                                    ? "جرّب رقم الطلب أو اسم العميل."
                                    : id === "review"
                                      ? "ستظهر هنا الطلبات المسندة إليك للمراجعة."
                                      : id === "progress"
                                        ? "ستظهر هنا طلباتك الجاري تنفيذها."
                                        : "ستظهر هنا الطلبات التي اكتملت."
                                }
                              />
                            )}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                  {!!archive.length && (
                    <button
                      className="cd-link lw-archive-link"
                      onClick={() => setArchiveOpen(true)}
                    >
                      <Archive size={17} />
                      المغلقة والملغاة ({archive.length})
                    </button>
                  )}
                </>
              )}
              {view === "consultations" && (
                <>
                  <div className="lw-heading">
                    <div>
                      <h1>استشاراتك القانونية</h1>
                      <p>تابع الحالة ووقت الجلسة المسجل لكل استشارة.</p>
                    </div>
                    <button
                      className="outline-button"
                      onClick={() => data.reloadData()}
                      disabled={data.refreshing}
                    >
                      <RefreshCw size={17} />
                      تحديث
                    </button>
                  </div>
                  <section className="cd-panel lw-consultations">
                    {consultations.length ? (
                      consultations.map((c) => (
                        <button key={c.id} onClick={() => setAppointment(c)}>
                          <span className="lw-service-icon is-consultation">
                            <MessageSquare size={23} />
                          </span>
                          <div>
                            <h2>
                              {c.legal_services?.name || "استشارة قانونية"}
                            </h2>
                            <p>
                              {c.clients?.name || "لم يُضف اسم العميل"} •{" "}
                              {consultationType(c.type)}
                            </p>
                          </div>
                          <span
                            className={`cd-status ${statusInfo(c.status).tone}`}
                          >
                            {statusInfo(c.status).label}
                          </span>
                          <ChevronLeft size={20} />
                        </button>
                      ))
                    ) : (
                      <Empty
                        title="لا توجد استشارات لعرضها"
                        text={
                          q
                            ? "لا توجد نتائج تطابق بحثك."
                            : "ستظهر هنا الاستشارات المرتبطة بملفك المهني."
                        }
                      />
                    )}
                  </section>
                </>
              )}
              {view === "profile" && (
                <>
                  <div className="lw-heading">
                    <div>
                      <h1>الملف المهني</h1>
                      <p>بيانات حسابك وطلب انضمامك إلى سند.</p>
                    </div>
                  </div>
                  <section className="cd-panel lw-profile">
                    {!data.user ? (
                      <>
                        <Empty
                          title="سجّل الدخول لاستكمال ملفك"
                          text="استخدم البريد المرتبط بحساب المحامي."
                        />
                        <Link className="navy-button" to="/login">
                          تسجيل الدخول
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="lw-profile-summary">
                          <span className="lw-avatar">
                            <UserRound size={27} />
                          </span>
                          <div>
                            <h2>
                              {data.lawyer?.name || "ملف محامٍ غير مكتمل"}
                            </h2>
                            <p>
                              <bdi>{data.user.email}</bdi>
                            </p>
                            <span
                              className={`cd-status ${approved ? "green" : "amber"}`}
                            >
                              {approved ? "ملف معتمد" : applicationStatus}
                            </span>
                          </div>
                        </div>
                        {data.lawyer ? (
                          <LawyerApplicationForm
                            key={data.lawyer.id}
                            lawyer={data.lawyer}
                            userId={data.user.id}
                            onSaved={data.reloadData}
                          />
                        ) : (
                          <p className="cd-muted">
                            لا يوجد ملف مهني مرتبط بالحساب.{" "}
                            <Link className="cd-link" to="/contact">
                              تواصل مع الإدارة
                            </Link>
                          </p>
                        )}
                      </>
                    )}
                  </section>
                </>
              )}
              {view === "help" && (
                <>
                  <div className="lw-heading">
                    <div>
                      <h1>كيف نساعدك؟</h1>
                      <p>إجابات واضحة ومساعدة لاستكمال عملك على سند.</p>
                    </div>
                  </div>
                  <section className="cd-panel lw-help">
                    <CircleHelp size={36} />
                    <h2>الدعم والمساعدة</h2>
                    <p>لاستفسارات الملف المهني والطلبات، تواصل مع فريق سند.</p>
                    <Link className="navy-button" to="/contact">
                      تواصل معنا <ArrowLeft size={17} />
                    </Link>
                    <Link className="cd-link" to="/faq">
                      الأسئلة الشائعة <ChevronLeft size={16} />
                    </Link>
                  </section>
                </>
              )}
              <p className="cd-page-footnote">سند — مساحة عملك القانونية.</p>
            </>
          )}
        </main>
      </div>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setRequestId(null);
        }}
      >
        <DialogContent className="cd-request-dialog" dir="rtl">
          {selected && (
            <>
              <p className="cd-eyebrow">
                طلب <bdi>{requestNumber(selected)}</bdi>
              </p>
              <DialogTitle>{selected.title}</DialogTitle>
              <DialogDescription>
                تفاصيل الطلب المسند إلى حسابك.
              </DialogDescription>
              <div className="cd-detail-meta">
                <span
                  className={`cd-status ${statusInfo(selected.status).tone}`}
                >
                  {statusInfo(selected.status).label}
                </span>
                <span>{selected.category}</span>
              </div>
              <p className="cd-request-description">
                {selected.description || "لم يُضف وصف تفصيلي."}
              </p>
              <dl className="cd-profile-values">
                <div>
                  <dt>العميل</dt>
                  <dd>{selected.clientName || "لم يُضف الاسم"}</dd>
                </div>
                <div>
                  <dt>رقم الطلب</dt>
                  <dd>
                    <bdi>{requestNumber(selected)}</bdi>
                  </dd>
                </div>
                <div>
                  <dt>تاريخ الطلب</dt>
                  <dd>{dateLabel(selected.created_at)}</dd>
                </div>
                <div>
                  <dt>آخر تحديث</dt>
                  <dd>
                    {dateLabel(
                      selected.updated_at || selected.created_at,
                      true,
                    )}
                  </dd>
                </div>
                <div>
                  <dt>المستندات المسجلة</dt>
                  <dd>{selected.attachments?.length || 0}</dd>
                </div>
              </dl>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!appointment}
        onOpenChange={(open) => {
          if (!open) setAppointment(null);
        }}
      >
        <DialogContent className="cd-request-dialog" dir="rtl">
          {appointment && (
            <>
              <DialogTitle>
                {appointment.legal_services?.name || "استشارة قانونية"}
              </DialogTitle>
              <DialogDescription>
                تفاصيل الاستشارة المرتبطة بملفك المهني.
              </DialogDescription>
              <dl className="cd-profile-values">
                <div>
                  <dt>العميل</dt>
                  <dd>{appointment.clients?.name || "لم يُضف الاسم"}</dd>
                </div>
                <div>
                  <dt>الحالة</dt>
                  <dd>{statusInfo(appointment.status).label}</dd>
                </div>
                <div>
                  <dt>طريقة الاستشارة</dt>
                  <dd>{consultationType(appointment.type)}</dd>
                </div>
                <div>
                  <dt>وقت الجلسة</dt>
                  <dd>
                    {[
                      "scheduled",
                      "confirmed",
                      "in_progress",
                      "completed",
                    ].includes(appointment.status || "") &&
                    appointment.started_at
                      ? `${dateLabel(appointment.started_at, true)} — بتوقيت جهازك`
                      : "بانتظار تنسيق الوقت"}
                  </dd>
                </div>
                <div>
                  <dt>تاريخ الطلب</dt>
                  <dd>{dateLabel(appointment.created_at)}</dd>
                </div>
                {appointment.duration_minutes !== null && (
                  <div>
                    <dt>المدة</dt>
                    <dd>{appointment.duration_minutes} دقيقة</dd>
                  </div>
                )}
              </dl>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={updatesOpen} onOpenChange={setUpdatesOpen}>
        <DialogContent className="cd-request-dialog" dir="rtl">
          <DialogTitle>آخر التحديثات</DialogTitle>
          <DialogDescription>
            آخر الحالات المسجلة لطلباتك واستشاراتك.
          </DialogDescription>
          {updates.length ? (
            <ul className="cd-updates-list">
              {updates.map((u) => (
                <li key={u.id}>
                  <Clock3 size={20} />
                  <div>
                    <strong>{u.title}</strong>
                    <p>{u.text}</p>
                    <time>{dateLabel(u.at, true)}</time>
                    {u.request && (
                      <button
                        className="cd-link"
                        onClick={() => {
                          setUpdatesOpen(false);
                          setRequestId(u.id);
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
              text="ستظهر التحديثات المسجلة لخدماتك هنا."
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={archiveOpen} onOpenChange={setArchiveOpen}>
        <DialogContent className="cd-request-dialog" dir="rtl">
          <DialogTitle>المغلقة والملغاة</DialogTitle>
          <DialogDescription>
            طلباتك التي أُغلقت أو أُلغيت، منفصلة عن المكتملة.
          </DialogDescription>
          <div className="lw-archive-list">
            {archive.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setArchiveOpen(false);
                  setRequestId(r.id);
                }}
              >
                <span>{r.title}</span>
                <span className="cd-status muted">
                  {statusInfo(r.status).label}
                </span>
                <ChevronLeft size={18} />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default function LawyerDashboard() {
  const data = useLawyerWorkspace();
  return <LawyerDashboardView data={data} />;
}
