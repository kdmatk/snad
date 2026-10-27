import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Tables } from "@/integrations/supabase/types";
type UserProfile = Tables<"user_profiles">;
export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setUser(data.session?.user ?? null);
        setSessionLoading(false);
      }
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
    queryKey: ["user-profile", user?.id],
    enabled: !!user && !sessionLoading,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const { error } = await supabase
      .from("user_profiles")
      .update(updates)
      .eq("user_id", user.id);
    if (error) throw error;
    await query.refetch();
  };
  return {
    user,
    profile: query.data ?? null,
    loading: sessionLoading || (!!user && query.isPending),
    error: query.error,
    updateProfile,
  };
};
