import { adminDate } from "./adminUtils";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCheck,
  FileText,
  RefreshCw,
  Search,
  UserRound,
} from "lucide-react";
import type { AdminRequest, RequestFilters } from "@/hooks/useAdminWorkspace";
import { requestNumber } from "@/components/lawyer/workspaceUtils";
import { statusInfo } from "@/components/client/clientUtils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export function AdminEmpty({ title, text }: { title: string; text: string }) {
  return (
    <div className="ad-empty">
      <CheckCheck size={30} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
export function AdminFailure({
  message,
  retry,
}: {
  message: string;
  retry: () => void;
}) {
  return (
    <div className="ad-failure" role="alert">
      <p>{message}</p>
      <button className="ad-outline" onClick={retry}>
        <RefreshCw size={16} />
        إعادة المحاولة
      </button>
    </div>
  );
}
export interface AdminRequestsProps {
  requests: AdminRequest[];
  count: number;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  filters: RequestFilters;
  onFilters: (patch: Partial<RequestFilters>) => void;
  overview: boolean;
  onViewAll: () => void;
  retry: () => void;
}
export default function AdminRequests({
  requests,
  count,
  loading,
  refreshing,
  error,
  filters,
  onFilters,
  overview,
  onViewAll,
  retry,
}: AdminRequestsProps) {
  const [selected, setSelected] = useState<AdminRequest | null>(null);
  const categories = [
    ...new Set(
      [
        "تجاري",
        "أسرة",
        "عقاري",
        "عمالي",
        "جنائي",
        "إداري",
        "عام",
        ...requests.map((r) => r.category),
        ...(filters.category !== "all" ? [filters.category] : []),
      ].filter(Boolean),
    ),
  ];
  return (
    <section
      className="ad-panel ad-requests"
      aria-labelledby="ad-requests-title"
    >
      <div className="ad-panel-heading">
        <h2 id="ad-requests-title">
          {overview ? "الطلبات الحديثة" : "جميع الطلبات"}
        </h2>
        {overview ? (
          <button className="ad-text-link" onClick={onViewAll}>
            عرض جميع الطلبات
          </button>
        ) : (
          <span className="ad-muted">{count} طلب</span>
        )}
      </div>
      <div className="ad-filters">
        <label className="ad-search">
          <Search size={18} aria-hidden="true" />
          <input
            aria-label="البحث في الطلبات"
            placeholder="عنوان الطلب أو رقمه..."
            value={filters.search}
            onChange={(e) => onFilters({ search: e.target.value, page: 0 })}
          />
        </label>
        <select
          aria-label="تصفية حسب الخدمة"
          value={filters.category}
          onChange={(e) => onFilters({ category: e.target.value, page: 0 })}
        >
          <option value="all">جميع الخدمات</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          aria-label="تصفية حسب حالة الطلب"
          value={filters.status}
          onChange={(e) => onFilters({ status: e.target.value, page: 0 })}
        >
          <option value="all">جميع الحالات</option>
          <option value="action">بانتظار إجراء</option>
          <option value="open">قيد المراجعة</option>
          <option value="pending">بانتظار التأكيد</option>
          <option value="assigned">تم الإسناد</option>
          <option value="in_progress">قيد التنفيذ</option>
          <option value="completed">مكتمل</option>
          <option value="closed">مغلق</option>
          <option value="cancelled">ملغي</option>
        </select>
        <button
          className="ad-primary"
          onClick={() => onFilters({ status: "action", page: 0 })}
        >
          مراجعة الطلبات
          <ArrowLeft size={18} />
        </button>
      </div>
      {error ? (
        <AdminFailure message={error} retry={retry} />
      ) : loading ? (
        <div className="ad-empty" role="status">
          <RefreshCw className="animate-spin" />
          جارٍ تحميل الطلبات...
        </div>
      ) : requests.length ? (
        <>
          <div className="ad-table-wrap" aria-busy={refreshing}>
            <table className="ad-request-table">
              <thead>
                <tr>
                  <th>رقم الطلب</th>
                  <th>الخدمة</th>
                  <th>الحالة</th>
                  <th>المحامي</th>
                  <th>الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => {
                  const status = statusInfo(r.status);
                  return (
                    <tr key={r.id}>
                      <td data-label="رقم الطلب">
                        <bdi className="ad-request-number">
                          #{requestNumber(r)}
                        </bdi>
                        <time
                          className="ad-cell-sub"
                          dateTime={r.created_at ?? undefined}
                        >
                          {adminDate(r.created_at)}
                        </time>
                      </td>
                      <td data-label="الخدمة">
                        <div className="ad-service">
                          <span className="ad-object-icon">
                            <FileText size={21} />
                          </span>
                          <div>
                            <strong>{r.title}</strong>
                            <span className="ad-cell-sub">{r.category}</span>
                          </div>
                        </div>
                      </td>
                      <td data-label="الحالة">
                        <span className={`ad-status ${status.tone}`}>
                          {status.label}
                        </span>
                      </td>
                      <td data-label="المحامي">
                        <span className="ad-lawyer-name">
                          <UserRound size={19} aria-hidden="true" />
                          {r.lawyerName ||
                            (r.lawyer_id ? "الاسم غير متوفر" : "لم يُسند بعد")}
                        </span>
                      </td>
                      <td data-label="الإجراء">
                        <button
                          className="ad-outline"
                          aria-label={`عرض الطلب ${requestNumber(r)}`}
                          onClick={() => setSelected(r)}
                        >
                          عرض الطلب
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {count > filters.pageSize && (
            <div className="ad-pagination">
              <span>
                عرض {filters.page * filters.pageSize + 1}–
                {Math.min((filters.page + 1) * filters.pageSize, count)} من{" "}
                {count}
              </span>
              <div>
                <button
                  className="ad-outline"
                  disabled={filters.page === 0 || refreshing}
                  onClick={() => onFilters({ page: filters.page - 1 })}
                >
                  السابق
                </button>
                <button
                  className="ad-outline"
                  disabled={
                    (filters.page + 1) * filters.pageSize >= count || refreshing
                  }
                  onClick={() => onFilters({ page: filters.page + 1 })}
                >
                  التالي
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <AdminEmpty
          title={
            filters.search ||
            filters.status !== "all" ||
            filters.category !== "all"
              ? "لا توجد طلبات مطابقة"
              : "لا توجد طلبات حتى الآن"
          }
          text="ستظهر الطلبات المسجلة هنا مع حالتها والمحامي المسند إليها."
        />
      )}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="ad-detail" dir="rtl">
          <DialogTitle>
            تفاصيل الطلب {selected && <bdi>#{requestNumber(selected)}</bdi>}
          </DialogTitle>
          <DialogDescription>بيانات الطلب المسجلة في المنصة.</DialogDescription>
          {selected && (
            <>
              <h3>{selected.title}</h3>
              <span className={`ad-status ${statusInfo(selected.status).tone}`}>
                {statusInfo(selected.status).label}
              </span>
              <dl>
                <div>
                  <dt>الخدمة</dt>
                  <dd>{selected.category}</dd>
                </div>
                <div>
                  <dt>المحامي</dt>
                  <dd>
                    {selected.lawyerName ||
                      (selected.lawyer_id ? "الاسم غير متوفر" : "لم يُسند بعد")}
                  </dd>
                </div>
                <div>
                  <dt>
                    <CalendarDays size={16} />
                    تاريخ الطلب
                  </dt>
                  <dd>{adminDate(selected.created_at, true)}</dd>
                </div>
                <div>
                  <dt>آخر تحديث</dt>
                  <dd>{adminDate(selected.updated_at, true)}</dd>
                </div>
                <div>
                  <dt>الميزانية المقدمة</dt>
                  <dd>
                    {selected.budget_min == null && selected.budget_max == null
                      ? "لم تُحدد"
                      : `${selected.budget_min ?? "—"} – ${selected.budget_max ?? "—"} ر.س`}
                  </dd>
                </div>
                <div>
                  <dt>المرفقات</dt>
                  <dd>{selected.attachments?.length || 0} ملف</dd>
                </div>
              </dl>
              <div className="ad-description">
                <h4>وصف الطلب</h4>
                <p>{selected.description || "لم يُضف وصف."}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
