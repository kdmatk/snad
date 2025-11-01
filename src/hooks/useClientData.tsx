
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_consultations: number;
  total_spent: number;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  budget_min: number;
  budget_max: number;
  status: string;
  urgency: string;
  created_at: string;
  lawyer?: {
    name: string;
  };
}

export const useClientData = () => {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClientData();
  }, []);

  const loadClientData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // جلب بيانات العميل
      const { data: clientData } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (clientData) {
        setProfile(clientData);
      } else {
        // إنشاء ملف للعميل إذا لم يكن موجود
        const { data: newClient } = await supabase
          .from('clients')
          .insert({
            user_id: user.id,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'عميل جديد',
            email: user.email || '',
            phone: user.user_metadata?.phone || '',
          })
          .select()
          .single();

        if (newClient) {
          setProfile(newClient);
        }
      }

      // جلب طلبات الخدمات
      const { data: casesData } = await supabase
        .from('legal_cases')
        .select(`
          *,
          lawyers(name)
        `)
        .eq('client_id', clientData?.id || '')
        .order('created_at', { ascending: false });

      if (casesData) {
        setRequests(casesData.map((case_: any) => ({
          id: case_.id,
          title: case_.title,
          description: case_.description || '',
          category: case_.category,
          budget_min: case_.budget_min || 0,
          budget_max: case_.budget_max || 0,
          status: case_.status,
          urgency: case_.urgency,
          created_at: case_.created_at,
          lawyer: case_.lawyers && typeof case_.lawyers === 'object' && 'name' in case_.lawyers 
            ? { name: case_.lawyers.name } 
            : undefined
        })));
      }

      // جلب الاستشارات
      const { data: consultationsData } = await supabase
        .from('consultations')
        .select(`
          *,
          lawyers(name),
          legal_services(name)
        `)
        .eq('client_id', clientData?.id || '')
        .order('created_at', { ascending: false });

      if (consultationsData) {
        setConsultations(consultationsData);
      }

    } catch (error) {
      console.error('Error loading client data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createServiceRequest = async (requestData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || !profile) {
        throw new Error('المستخدم غير مسجل الدخول');
      }

      const { data, error } = await supabase
        .from('legal_cases')
        .insert({
          client_id: profile.id,
          title: requestData.title,
          description: requestData.description,
          category: requestData.specialty,
          budget_min: extractMinBudget(requestData.budget),
          budget_max: extractMaxBudget(requestData.budget),
          urgency: requestData.urgency,
          status: 'open'
        })
        .select()
        .single();

      if (error) throw error;

      // تحديث قائمة الطلبات
      await loadClientData();
      
      return data;
    } catch (error) {
      console.error('Error creating service request:', error);
      throw error;
    }
  };

  const extractMinBudget = (budgetRange: string): number => {
    if (budgetRange.includes('أقل من 500')) return 0;
    if (budgetRange.includes('500 - 1000')) return 500;
    if (budgetRange.includes('1000 - 2000')) return 1000;
    if (budgetRange.includes('2000 - 5000')) return 2000;
    if (budgetRange.includes('أكثر من 5000')) return 5000;
    return 0;
  };

  const extractMaxBudget = (budgetRange: string): number => {
    if (budgetRange.includes('أقل من 500')) return 500;
    if (budgetRange.includes('500 - 1000')) return 1000;
    if (budgetRange.includes('1000 - 2000')) return 2000;
    if (budgetRange.includes('2000 - 5000')) return 5000;
    if (budgetRange.includes('أكثر من 5000')) return 10000;
    return 1000;
  };

  return {
    profile,
    requests,
    consultations,
    loading,
    createServiceRequest,
    reloadData: loadClientData
  };
};
