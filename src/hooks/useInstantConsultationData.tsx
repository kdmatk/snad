
import { useState } from "react";
import { MessageCircle, Phone, Video } from "lucide-react";

export interface ConsultationMethod {
  id: string;
  title: string;
  description: string;
  icon: any;
  price: string;
  duration: string;
  available: boolean;
}

export interface AvailableLawyer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  price: string;
  status: string;
  responseTime: string;
}

export const useInstantConsultationData = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const consultationMethods: ConsultationMethod[] = [
    {
      id: "chat",
      title: "محادثة نصية",
      description: "استشارة سريعة عبر الرسائل النصية",
      icon: MessageCircle,
      price: "200 ريال",
      duration: "30 دقيقة",
      available: true
    },
    {
      id: "voice",
      title: "مكالمة صوتية",
      description: "استشارة مباشرة عبر الهاتف",
      icon: Phone,
      price: "300 ريال",
      duration: "30 دقيقة",
      available: true
    },
    {
      id: "video",
      title: "مكالمة فيديو",
      description: "استشارة مرئية عبر الفيديو",
      icon: Video,
      price: "400 ريال",
      duration: "30 دقيقة",
      available: false
    }
  ];

  const availableLawyers: AvailableLawyer[] = [
    {
      id: 1,
      name: "د. أحمد العلي",
      specialty: "القانون التجاري",
      rating: 4.9,
      price: "500 ريال/ساعة",
      status: "متاح الآن",
      responseTime: "دقائق"
    },
    {
      id: 2,
      name: "د. فاطمة الزهراني",
      specialty: "قانون الأسرة",
      rating: 4.8,
      price: "400 ريال/ساعة",
      status: "متاح الآن",
      responseTime: "دقائق"
    },
    {
      id: 3,
      name: "د. محمود الخطيب",
      specialty: "القانون الجنائي",
      rating: 5.0,
      price: "600 ريال/ساعة",
      status: "مشغول",
      responseTime: "10 دقائق"
    }
  ];

  return {
    consultationMethods,
    availableLawyers,
    selectedMethod,
    setSelectedMethod
  };
};
