import type { ClientConsultation, ServiceRequest } from "@/hooks/useClientData";
export const documentStatuses = new Set([
  "awaiting_documents",
  "waiting_documents",
  "pending_documents",
]);
const statuses: Record<string, { label: string; tone: string }> = {
  open: { label: "قيد المراجعة", tone: "amber" },
  pending: { label: "بانتظار التأكيد", tone: "amber" },
  assigned: { label: "تم تعيين المحامي", tone: "blue" },
  in_progress: { label: "قيد التنفيذ", tone: "green" },
  completed: { label: "مكتمل", tone: "green" },
  closed: { label: "مغلق", tone: "muted" },
  cancelled: { label: "ملغي", tone: "muted" },
  scheduled: { label: "محدد الموعد", tone: "blue" },
  confirmed: { label: "مؤكد", tone: "green" },
  awaiting_documents: { label: "بانتظار مستند", tone: "amber" },
  waiting_documents: { label: "بانتظار مستند", tone: "amber" },
  pending_documents: { label: "بانتظار مستند", tone: "amber" },
};
export function statusInfo(status: string | null) {
  return (
    statuses[status ?? ""] ?? {
      label: status || "لم تُحدد الحالة",
      tone: "muted",
    }
  );
}
export function shortId(request: ServiceRequest) {
  return request.case_number || request.id.slice(0, 8).toUpperCase();
}
export function dateLabel(
  value: string | null | undefined,
  includeTime = false,
) {
  if (!value || Number.isNaN(Date.parse(value))) return "لم يُحدد";
  return new Intl.DateTimeFormat("ar-AE", {
    calendar: "gregory",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(includeTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(new Date(value));
}
export function consultationTitle(c: ClientConsultation) {
  return c.legal_services?.name || "استشارة قانونية";
}
export function consultationType(type: string) {
  return (
    (
      {
        chat: "محادثة نصية",
        voice: "مكالمة صوتية",
        video: "اجتماع مرئي",
        phone: "مكالمة هاتفية",
      } as Record<string, string>
    )[type] || "استشارة قانونية"
  );
}
export function futureAppointments(
  consultations: ClientConsultation[],
  now = Date.now(),
) {
  return consultations
    .filter(
      (c) =>
        ["scheduled", "confirmed"].includes(c.status ?? "") &&
        c.started_at &&
        Date.parse(c.started_at) > now,
    )
    .sort((a, b) => Date.parse(a.started_at!) - Date.parse(b.started_at!));
}
