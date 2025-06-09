
import { FileText, MessageCircle, Scale, Edit, Users, Clock } from "lucide-react";

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

export const useQuickServicesData = () => {
  const services: QuickService[] = [
    {
      id: 1,
      title: "مراجعة عقد عمل",
      description: "مراجعة شاملة لعقد عمل مكون من 3 صفحات وتقديم ملاحظات قانونية",
      duration: "خلال 12 ساعة",
      durationHours: 12,
      price: 149,
      rating: 4.9,
      lawyer: "محامي معتمد",
      category: "مراجعة عقود",
      icon: FileText,
      popular: true
    },
    {
      id: 2,
      title: "استشارة أحوال شخصية",
      description: "استشارة مفصلة في قضايا الزواج والطلاق والحضانة",
      duration: "خلال 6 ساعات",
      durationHours: 6,
      price: 199,
      rating: 4.8,
      lawyer: "محامي معتمد",
      category: "استشارات",
      icon: MessageCircle
    },
    {
      id: 3,
      title: "صياغة مذكرة قانونية",
      description: "إعداد مذكرة قانونية احترافية للدفوع والمرافعات",
      duration: "خلال 24 ساعة",
      durationHours: 24,
      price: 299,
      rating: 4.7,
      lawyer: "محامي معتمد",
      category: "صياغة قانونية",
      icon: Edit
    },
    {
      id: 4,
      title: "مراجعة عقد إيجار",
      description: "مراجعة بنود عقد الإيجار وتقديم التوصيات اللازمة",
      duration: "خلال 8 ساعات",
      durationHours: 8,
      price: 129,
      rating: 4.9,
      lawyer: "محامي معتمد",
      category: "مراجعة عقود",
      icon: FileText,
      popular: true
    },
    {
      id: 5,
      title: "صياغة شكوى رسمية",
      description: "إعداد شكوى قانونية رسمية للجهات المختصة",
      duration: "خلال 18 ساعة",
      durationHours: 18,
      price: 249,
      rating: 4.6,
      lawyer: "محامي معتمد",
      category: "شكاوى",
      icon: Scale
    },
    {
      id: 6,
      title: "توجيه قانوني سريع",
      description: "إرشاد قانوني فوري للإجراءات الواجب اتخاذها",
      duration: "خلال 3 ساعات",
      durationHours: 3,
      price: 99,
      rating: 4.8,
      lawyer: "محامي معتمد",
      category: "توجيه قانوني سريع",
      icon: Clock
    },
    {
      id: 7,
      title: "مراجعة عقد شراكة",
      description: "تحليل شامل لعقد الشراكة التجارية وتقييم المخاطر",
      duration: "خلال 24 ساعة",
      durationHours: 24,
      price: 399,
      rating: 4.9,
      lawyer: "محامي معتمد",
      category: "مراجعة عقود",
      icon: Users
    },
    {
      id: 8,
      title: "استشارة قانون العمل",
      description: "استشارة متخصصة في حقوق العمال والقضايا العمالية",
      duration: "خلال 4 ساعات",
      durationHours: 4,
      price: 179,
      rating: 4.7,
      lawyer: "محامي معتمد",
      category: "استشارات",
      icon: MessageCircle,
      popular: true
    },
    {
      id: 9,
      title: "صياغة عقد خدمات",
      description: "إعداد عقد تقديم خدمات احترافي وشامل",
      duration: "خلال 16 ساعات",
      durationHours: 16,
      price: 279,
      rating: 4.8,
      lawyer: "محامي معتمد",
      category: "صياغة قانونية",
      icon: Edit
    }
  ];

  const categories = [
    { name: "استشارات", value: "استشارات" },
    { name: "مراجعة عقود", value: "مراجعة عقود" },
    { name: "صياغة قانونية", value: "صياغة قانونية" },
    { name: "شكاوى", value: "شكاوى" },
    { name: "توجيه قانوني سريع", value: "توجيه قانوني سريع" }
  ];

  return {
    services,
    categories
  };
};
