
import { useState } from "react";
import { Scale, FileText, Users, MessageCircle, Award, Clock } from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: any;
  price: string;
  duration: string;
  features: string[];
  category: string;
  popular?: boolean;
}

export const useServicesData = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const services: Service[] = [
    {
      id: 1,
      title: "الاستشارات القانونية",
      description: "احصل على استشارة قانونية فورية من محامين متخصصين",
      icon: MessageCircle,
      price: "من 200 ريال",
      duration: "30-60 دقيقة",
      features: ["استشارة فورية", "عبر الهاتف أو الفيديو", "تقرير مكتوب"],
      category: "استشارات",
      popular: true
    },
    {
      id: 2,
      title: "التمثيل القضائي",
      description: "تمثيل قانوني احترافي في جميع أنواع القضايا",
      icon: Scale,
      price: "حسب القضية",
      duration: "حسب المدة القانونية",
      features: ["تمثيل كامل", "إعداد المرافعات", "المتابعة القضائية"],
      category: "تمثيل"
    },
    {
      id: 3,
      title: "صياغة العقود",
      description: "صياغة ومراجعة العقود والاتفاقيات القانونية",
      icon: FileText,
      price: "من 500 ريال",
      duration: "3-5 أيام عمل",
      features: ["صياغة احترافية", "مراجعة قانونية", "ضمان الحماية"],
      category: "وثائق"
    },
    {
      id: 4,
      title: "الوساطة والتحكيم",
      description: "حل النزاعات خارج المحاكم بطريقة ودية",
      icon: Users,
      price: "من 1000 ريال",
      duration: "حسب تعقيد النزاع",
      features: ["حل سريع", "توفير التكاليف", "سرية تامة"],
      category: "حلول"
    },
    {
      id: 5,
      title: "الاستشارات المتخصصة",
      description: "استشارات في مجالات قانونية متخصصة",
      icon: Award,
      price: "من 300 ريال",
      duration: "60-90 دقيقة",
      features: ["خبراء متخصصون", "تحليل معمق", "توصيات عملية"],
      category: "تخصص"
    },
    {
      id: 6,
      title: "المتابعة القانونية",
      description: "خدمة المتابعة المستمرة للقضايا والمعاملات",
      icon: Clock,
      price: "اشتراك شهري",
      duration: "متواصل",
      features: ["متابعة دورية", "تقارير منتظمة", "دعم مستمر"],
      category: "متابعة"
    }
  ];

  const categories = [
    { name: "الكل", value: "" },
    { name: "استشارات", value: "استشارات" },
    { name: "تمثيل", value: "تمثيل" },
    { name: "وثائق", value: "وثائق" },
    { name: "حلول", value: "حلول" },
    { name: "تخصص", value: "تخصص" },
    { name: "متابعة", value: "متابعة" }
  ];

  const filteredServices = selectedCategory 
    ? services.filter(service => service.category === selectedCategory)
    : services;

  return {
    services: filteredServices,
    categories,
    selectedCategory,
    setSelectedCategory
  };
};
