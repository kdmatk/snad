
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SupabaseLawyer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  specialty: string;
  license_number: string;
  registration_status: string;
  rating: number | null;
  total_cases: number | null;
  avatar_url: string | null;
  created_at: string;
  bio?: string | null;
  experience_years?: number | null;
  hourly_rate?: number | null;
  license_verified: boolean;
}

export const useSupabaseLawyers = () => {
  const [lawyers, setLawyers] = useState<SupabaseLawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadLawyers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lawyers')
        .select('*')
        .eq('registration_status', 'approved')
        .order('rating', { ascending: false, nullsLast: true });

      if (error) throw error;
      setLawyers(data || []);
    } catch (error) {
      console.error('Error loading lawyers:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات المحامين",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLawyers();
  }, []);

  const addLawyer = async (lawyerData: Partial<SupabaseLawyer>) => {
    try {
      const { data, error } = await supabase
        .from('lawyers')
        .insert([{
          ...lawyerData,
          registration_status: 'approved',
          license_verified: true,
          rating: 0,
          total_cases: 0
        }])
        .select()
        .single();

      if (error) throw error;
      
      setLawyers(prev => [...prev, data]);
      toast({
        title: "تم بنجاح",
        description: "تم إضافة المحامي بنجاح",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding lawyer:', error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة المحامي",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    lawyers,
    loading,
    loadLawyers,
    addLawyer
  };
};
