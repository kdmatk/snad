import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUserProfile } from "./useUserProfile";
import type { Tables } from "@/integrations/supabase/types";
export type LawyerRequest = Tables<"legal_cases"> & {
  clientName: string | null;
};
export type LawyerConsultation = Tables<"consultations"> & {
  clients: { name: string } | null;
  legal_services: { name: string } | null;
};
export function useLawyerWorkspace() {
  const account = useUserProfile();
  const query = useQuery({
    queryKey: ["lawyer-workspace", account.user?.id],
    enabled: !!account.user && !account.loading,
    staleTime: 20_000,
    queryFn: async () => {
      const { data: lawyer, error } = await supabase
        .from("lawyers")
        .select("*")
        .eq("user_id", account.user!.id)
        .maybeSingle();
      if (error) throw new Error("تعذّر تحميل الملف المهني. أعد المحاولة.");
      if (
        !lawyer ||
        lawyer.registration_status !== "approved" ||
        !lawyer.license_verified
      )
        return {
          lawyer,
          requests: [] as LawyerRequest[],
          consultations: [] as LawyerConsultation[],
        };
      const [cases, consultations] = await Promise.all([
        supabase
          .from("legal_cases")
          .select("*")
          .eq("lawyer_id", account.user!.id)
          .order("updated_at", { ascending: false, nullsFirst: false }),
        supabase
          .from("consultations")
          .select("*, clients(name), legal_services(name)")
          .eq("lawyer_id", lawyer.id)
          .order("created_at", { ascending: false }),
      ]);
      if (cases.error || consultations.error)
        throw new Error("تعذّر تحميل الطلبات والاستشارات. أعد المحاولة.");
      const clientIds = [
        ...new Set(
          (cases.data ?? [])
            .map((c) => c.client_id)
            .filter((id): id is string => !!id),
        ),
      ];
      const [profiles, clients] = clientIds.length
        ? await Promise.all([
            supabase
              .from("user_profiles")
              .select("user_id,full_name")
              .in("user_id", clientIds),
            supabase
              .from("clients")
              .select("user_id,name")
              .in("user_id", clientIds),
          ])
        : [
            { data: [], error: null },
            { data: [], error: null },
          ];
      if (profiles.error || clients.error)
        throw new Error("تعذّر تحميل بيانات الطلبات. أعد المحاولة.");
      const names = new Map(
        (clients.data ?? []).map((p) => [p.user_id, p.name]),
      );
      for (const profile of profiles.data ?? [])
        if (profile.full_name) names.set(profile.user_id, profile.full_name);
      return {
        lawyer,
        requests: (cases.data ?? []).map((c) => ({
          ...c,
          clientName: c.client_id ? (names.get(c.client_id) ?? null) : null,
        })),
        consultations: (consultations.data ?? []) as LawyerConsultation[],
      };
    },
  });
  return {
    user: account.user,
    profile: account.profile,
    lawyer: query.data?.lawyer ?? null,
    requests: query.data?.requests ?? [],
    consultations: query.data?.consultations ?? [],
    loading: account.loading || (!!account.user && query.isPending),
    error: account.error
      ? "تعذّر تحميل بيانات الحساب."
      : (query.error?.message ?? null),
    refreshing: query.isFetching,
    reloadData: query.refetch,
  };
}
