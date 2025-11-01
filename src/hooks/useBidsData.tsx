import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Bid {
  id: string;
  case_id: string;
  lawyer_id: string;
  amount: number;
  proposal: string;
  delivery_days: number;
  discount_percentage: number;
  score: number;
  status: string;
  is_accepted: boolean;
  created_at: string;
  responded_at?: string;
  estimated_duration?: string;
  lawyer?: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    total_cases: number;
    avatar_url?: string;
  };
}

export const useBidsData = (caseId?: string) => {
  const queryClient = useQueryClient();

  // جلب جميع المزايدات لقضية معينة
  const { data: bids, isLoading } = useQuery({
    queryKey: ["bids", caseId],
    queryFn: async () => {
      if (!caseId) return [];

      const { data, error } = await supabase
        .from("case_bids")
        .select(`
          *,
          lawyer:lawyers(
            id,
            name,
            specialty,
            rating,
            total_cases,
            avatar_url
          )
        `)
        .eq("case_id", caseId)
        .order("score", { ascending: false });

      if (error) throw error;
      return data as Bid[];
    },
    enabled: !!caseId,
  });

  // إضافة مزايدة جديدة
  const addBid = useMutation({
    mutationFn: async (bidData: {
      case_id: string;
      lawyer_id: string;
      amount: number;
      delivery_days: number;
      proposal: string;
      estimated_duration?: string;
    }) => {
      const { data, error } = await supabase
        .from("case_bids")
        .insert([bidData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bids"] });
      toast.success("تم إرسال العرض بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء إرسال العرض");
    },
  });

  // قبول مزايدة
  const acceptBid = useMutation({
    mutationFn: async (bidId: string) => {
      const { data, error } = await supabase
        .from("case_bids")
        .update({ 
          is_accepted: true, 
          status: "accepted",
          responded_at: new Date().toISOString()
        })
        .eq("id", bidId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bids"] });
      toast.success("تم قبول العرض بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء قبول العرض");
    },
  });

  // رفض مزايدة
  const rejectBid = useMutation({
    mutationFn: async (bidId: string) => {
      const { data, error } = await supabase
        .from("case_bids")
        .update({ 
          status: "rejected",
          responded_at: new Date().toISOString()
        })
        .eq("id", bidId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bids"] });
      toast.success("تم رفض العرض");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء رفض العرض");
    },
  });

  return {
    bids: bids || [],
    isLoading,
    addBid,
    acceptBid,
    rejectBid,
  };
};
