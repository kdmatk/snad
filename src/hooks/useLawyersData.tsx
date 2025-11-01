
import { useState, useMemo } from "react";
import { useSupabaseLawyers, SupabaseLawyer } from "./useSupabaseLawyers";

export interface Lawyer {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  price: string;
  description: string;
  phone: string;
  cases: number;
  successRate: number;
  isOnline?: boolean;
  lastSeen?: string | null;
}

// دالة لتحويل بيانات قاعدة البيانات إلى الواجهة المحلية
const transformSupabaseLawyer = (lawyer: SupabaseLawyer): Lawyer => {
  return {
    id: parseInt(lawyer.id.replace(/-/g, '').substring(0, 8), 16), // تحويل UUID إلى رقم
    name: lawyer.name,
    specialty: lawyer.specialty,
    experience: lawyer.experience_years ? `${lawyer.experience_years} سنة` : "غير محدد",
    rating: lawyer.rating || 0,
    reviews: Math.floor(Math.random() * 200) + 50, // مؤقت حتى نضيف جدول التقييمات
    location: "المملكة العربية السعودية", // مؤقت حتى نضيف الموقع
    verified: lawyer.license_verified,
    price: lawyer.hourly_rate ? `${lawyer.hourly_rate} ريال/ساعة` : "غير محدد",
    description: lawyer.bio || "محامي معتمد ومتخصص",
    phone: lawyer.phone || "",
    cases: lawyer.total_cases || 0,
    successRate: Math.floor(Math.random() * 20) + 80, // مؤقت حتى نحسب النسبة الفعلية
    isOnline: lawyer.is_online,
    lastSeen: lawyer.last_seen
  };
};

export const useLawyersData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  
  const { lawyers: supabaseLawyers, loading } = useSupabaseLawyers();
  
  // تحويل بيانات قاعدة البيانات إلى التنسيق المطلوب
  const lawyers = useMemo(() => {
    return supabaseLawyers.map(transformSupabaseLawyer);
  }, [supabaseLawyers]);

  const specialties = [
    "القانون التجاري",
    "قانون الأسرة", 
    "القانون الجنائي",
    "القانون العقاري",
    "قانون العمل",
    "القانون المالي",
    "القانون الإداري",
    "قانون الضرائب"
  ];

  const cities = [
    "الرياض، السعودية",
    "دبي، الإمارات",
    "القاهرة، مصر",
    "جدة، السعودية",
    "الكويت، الكويت",
    "المنامة، البحرين",
    "الدوحة، قطر",
    "مسقط، عمان"
  ];

  const filteredLawyers = useMemo(() => {
    return lawyers.filter(lawyer => {
      const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = !selectedCity || selectedCity === "all" || lawyer.location === selectedCity;
      const matchesSpecialty = !selectedSpecialty || selectedSpecialty === "all" || lawyer.specialty === selectedSpecialty;
      
      return matchesSearch && matchesCity && matchesSpecialty;
    });
  }, [searchTerm, selectedCity, selectedSpecialty, lawyers]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCity("");
    setSelectedSpecialty("");
  };

  return {
    lawyers,
    filteredLawyers,
    specialties,
    cities,
    searchTerm,
    setSearchTerm,
    selectedCity,
    setSelectedCity,
    selectedSpecialty,
    setSelectedSpecialty,
    resetFilters,
    loading
  };
};
