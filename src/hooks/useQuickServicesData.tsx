
import { useEffect, useState } from "react";
import { FileText, MessageCircle, Scale, Edit, Users, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export interface QuickService {
  id: number;
  title: string;
  description: string;
  duration: string;
  durationHours: number;
  price: number;
  rating: number;
  lawyer: string;
  category: string;
  icon: any;
  popular?: boolean;
}

const iconMap: Record<string, any> = {
  FileText,
  MessageCircle,
  Scale,
  Edit,
  Users,
  Clock
};

export const useQuickServicesData = () => {
  const [services, setServices] = useState<QuickService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('quick_services')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;

      const formattedServices: QuickService[] = (data || []).map((service: any) => ({
        id: parseInt(service.id.split('-')[0], 16), // Convert UUID to number for compatibility
        title: service.title,
        description: service.description || '',
        duration: `خلال ${service.duration_hours} ساعة`,
        durationHours: service.duration_hours,
        price: service.price,
        rating: service.rating,
        lawyer: service.lawyer || 'محامي معتمد',
        category: service.category,
        icon: iconMap[service.icon] || FileText,
        popular: service.is_popular
      }));

      setServices(formattedServices);
    } catch (error) {
      console.error('Error fetching quick services:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: "استشارات", value: "استشارات" },
    { name: "مراجعة عقود", value: "مراجعة عقود" },
    { name: "صياغة قانونية", value: "صياغة قانونية" },
    { name: "شكاوى", value: "شكاوى" },
    { name: "توجيه قانوني سريع", value: "توجيه قانوني سريع" }
  ];

  return {
    services,
    categories,
    loading
  };
};
