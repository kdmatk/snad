import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type AdminRequest = Tables<"legal_cases"> & {
  lawyerName: string | null;
};
export type ReviewLawyer = Pick<
  Tables<"lawyers">,
  "id" | "name" | "specialty" | "registration_status" | "created_at"
>;
export const actionStatuses = [
  "open",
  "pending",
  "submitted",
  "new",
  "under_review",
];
export interface RequestFilters {
  search: string;
  status: string;
  category: string;
  page: number;
  pageSize: number;
}
export function searchPattern(value: string) {
  // Keep PostgREST logic and wildcard characters out of user search text.
  return value
    .replace(/[^\p{L}\p{N}\s@.-]/gu, " ")
    .trim()
    .slice(0, 100);
}
export function useAdminOverview(adminId: string | undefined) {
  return useQuery({
    queryKey: ["admin-overview", adminId],
    enabled: !!adminId,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
      const [action, recent, pending, incomplete, lawyers] = await Promise.all([
        supabase
          .from("legal_cases")
          .select("id", { count: "exact", head: true })
          .in("status", actionStatuses),
        supabase
          .from("legal_cases")
          .select("id", { count: "exact", head: true })
          .gte("created_at", weekAgo),
        supabase
          .from("lawyers")
          .select("id", { count: "exact", head: true })
          .eq("registration_status", "pending"),
        supabase
          .from("lawyers")
          .select("id", { count: "exact", head: true })
          .eq("registration_status", "incomplete"),
        supabase
          .from("lawyers")
          .select("id,name,specialty,registration_status,created_at")
          .in("registration_status", ["pending", "incomplete"])
          .order("created_at", { ascending: true })
          .limit(3),
      ]);
      if ([action, recent, pending, incomplete, lawyers].some((r) => r.error))
        throw new Error("تعذّر تحميل ملخص المنصة. أعد المحاولة.");
      return {
        actionCount: action.count ?? 0,
        recentCount: recent.count ?? 0,
        pendingCount: pending.count ?? 0,
        incompleteCount: incomplete.count ?? 0,
        lawyers: lawyers.data ?? [],
      };
    },
  });
}
export function useAdminRequests(
  adminId: string | undefined,
  filters: RequestFilters,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["admin-requests", adminId, filters],
    enabled: !!adminId && enabled,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      let query = supabase.from("legal_cases").select("*", { count: "exact" });
      if (filters.status === "action")
        query = query.in("status", actionStatuses);
      else if (filters.status !== "all")
        query = query.eq("status", filters.status);
      if (filters.category !== "all")
        query = query.eq("category", filters.category);
      const search = searchPattern(filters.search);
      if (search)
        query = query.or(
          `title.ilike.%${search}%,case_number.ilike.%${search}%`,
        );
      const { data, count, error } = await query
        .order("created_at", { ascending: false })
        .order("id")
        .range(
          filters.page * filters.pageSize,
          (filters.page + 1) * filters.pageSize - 1,
        );
      if (error) throw new Error("تعذّر تحميل الطلبات. أعد المحاولة.");
      const lawyerIds = [
        ...new Set(
          (data ?? [])
            .map((r) => r.lawyer_id)
            .filter((id): id is string => !!id),
        ),
      ];
      const lawyers = lawyerIds.length
        ? await supabase
            .from("lawyers")
            .select("user_id,name")
            .in("user_id", lawyerIds)
        : { data: [], error: null };
      if (lawyers.error)
        throw new Error("تعذّر تحميل أسماء المحامين المسندة إليهم الطلبات.");
      const names = new Map(
        (lawyers.data ?? []).map((l) => [l.user_id, l.name]),
      );
      return {
        requests: (data ?? []).map((r) => ({
          ...r,
          lawyerName: r.lawyer_id ? (names.get(r.lawyer_id) ?? null) : null,
        })),
        count: count ?? 0,
      };
    },
  });
}
