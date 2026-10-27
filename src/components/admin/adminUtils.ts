export function adminDate(value: string | null | undefined, time = false) {
  if (!value || !Number.isFinite(Date.parse(value))) return "لم يُحدد";
  return new Intl.DateTimeFormat("ar-AE", {
    calendar: "gregory",
    timeZone: "Asia/Dubai",
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(time ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(new Date(value));
}
