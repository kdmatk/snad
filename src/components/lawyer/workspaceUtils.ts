import type {
  LawyerConsultation,
  LawyerRequest,
} from "@/hooks/useLawyerWorkspace";
export type RequestLane = "review" | "progress" | "complete" | "archive";
export function requestLane(status: string | null): RequestLane {
  if (status === "in_progress") return "progress";
  if (status === "completed") return "complete";
  if (["closed", "cancelled", "canceled", "rejected"].includes(status ?? ""))
    return "archive";
  return "review";
}
export function requestNumber(
  request: Pick<LawyerRequest, "id" | "case_number">,
) {
  return request.case_number || request.id.slice(0, 8).toUpperCase();
}
export function nextConsultation(
  consultations: LawyerConsultation[],
  now = Date.now(),
) {
  return (
    consultations
      .filter(
        (c) =>
          ["scheduled", "confirmed"].includes(c.status ?? "") &&
          c.started_at &&
          Date.parse(c.started_at) > now,
      )
      .sort(
        (a, b) => Date.parse(a.started_at!) - Date.parse(b.started_at!),
      )[0] ?? null
  );
}
export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join(" ");
}
