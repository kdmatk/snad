import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type ClientProfile = Tables<"clients">;
export type ServiceRequest = Tables<"legal_cases"> & {
  lawyer?: { name: string };
};
export type ClientConsultation = Tables<"consultations"> & {
  lawyers: { name: string } | null;
  legal_services: { name: string } | null;
};
export type ClientUserProfile = Tables<"user_profiles">;

export const useClientData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      setUser(error ? null : (data.session?.user ?? null));
      setSessionLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setSessionLoading(false);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const query = useQuery({
    queryKey: ["client-workspace", user?.id],
    enabled: !!user && !sessionLoading,
    staleTime: 30_000,
    queryFn: async () => {
      if (!user) throw new Error("يلزم تسجيل الدخول");
      const [clientResult, profileResult, casesResult] = await Promise.all([
        supabase
          .from("clients")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("legal_cases")
          .select("*")
          .eq("client_id", user.id)
          .order("updated_at", { ascending: false, nullsFirst: false }),
      ]);
      if (clientResult.error || profileResult.error || casesResult.error) {
        throw new Error("تعذّر تحميل بيانات حسابك. يرجى إعادة المحاولة.");
      }
      const cases = casesResult.data ?? [];
      const assignedIds = [
        ...new Set(
          cases.map((c) => c.lawyer_id).filter((id): id is string => !!id),
        ),
      ];
      const [lawyersResult, consultationsResult] = await Promise.all([
        assignedIds.length
          ? supabase
              .from("lawyers")
              .select("user_id,name")
              .in("user_id", assignedIds)
          : Promise.resolve({ data: [], error: null }),
        clientResult.data
          ? supabase
              .from("consultations")
              .select("*, lawyers(name), legal_services(name)")
              .eq("client_id", clientResult.data.id)
              .order("created_at", { ascending: false })
          : Promise.resolve({ data: [], error: null }),
      ]);
      if (lawyersResult.error || consultationsResult.error)
        throw new Error("تعذّر تحميل تفاصيل الخدمات. يرجى إعادة المحاولة.");
      const names = new Map(
        (lawyersResult.data ?? []).map((l) => [l.user_id, l.name]),
      );
      return {
        profile: clientResult.data,
        userProfile: profileResult.data,
        requests: cases.map((c) => ({
          ...c,
          lawyer:
            c.lawyer_id && names.has(c.lawyer_id)
              ? { name: names.get(c.lawyer_id)! }
              : undefined,
        })) as ServiceRequest[],
        consultations: (consultationsResult.data ?? []) as ClientConsultation[],
      };
    },
  });
  return {
    user,
    profile: query.data?.profile ?? null,
    userProfile: query.data?.userProfile ?? null,
    requests: query.data?.requests ?? [],
    consultations: query.data?.consultations ?? [],
    loading: sessionLoading || (!!user && query.isPending),
    error: query.error?.message ?? null,
    refreshing: query.isFetching,
    reloadData: query.refetch,
  };
};
