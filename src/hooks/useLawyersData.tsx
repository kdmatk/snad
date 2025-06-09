
import { useState, useMemo } from "react";

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
}

export const useLawyersData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const lawyers: Lawyer[] = [
    {
      id: 1,
      name: "د. أحمد محمد العلي",
      specialty: "القانون التجاري",
      experience: "15 سنة",
      rating: 4.9,
      reviews: 245,
      location: "الرياض، السعودية",
      verified: true,
      price: "500 ريال/ساعة",
      description: "خبير في القانون التجاري والشركات مع سجل حافل من القضايا الناجحة",
      phone: "+966501234567",
      cases: 156,
      successRate: 95
    },
    {
      id: 2,
      name: "د. فاطمة سالم الزهراني",
      specialty: "قانون الأسرة",
      experience: "12 سنة",
      rating: 4.8,
      reviews: 189,
      location: "دبي، الإمارات",
      verified: true,
      price: "400 ريال/ساعة",
      description: "متخصصة في قضايا الأسرة والأحوال الشخصية",
      phone: "+971501234567",
      cases: 123,
      successRate: 92
    },
    {
      id: 3,
      name: "د. محمود علي الخطيب",
      specialty: "القانون الجنائي",
      experience: "20 سنة",
      rating: 5.0,
      reviews: 312,
      location: "القاهرة، مصر",
      verified: true,
      price: "600 ريال/ساعة",
      description: "محامي جنائي بارز مع خبرة واسعة في القضايا المعقدة",
      phone: "+201234567890",
      cases: 298,
      successRate: 97
    },
    {
      id: 4,
      name: "د. نور الدين المصري",
      specialty: "القانون العقاري",
      experience: "10 سنة",
      rating: 4.7,
      reviews: 167,
      location: "جدة، السعودية",
      verified: true,
      price: "450 ريال/ساعة",
      description: "متخصص في القانون العقاري وقضايا العقارات",
      phone: "+966501234568",
      cases: 89,
      successRate: 90
    },
    {
      id: 5,
      name: "د. ليلى أحمد الكويتي",
      specialty: "قانون العمل",
      experience: "8 سنة",
      rating: 4.6,
      reviews: 134,
      location: "الكويت، الكويت",
      verified: true,
      price: "350 ريال/ساعة",
      description: "خبيرة في قانون العمل وحقوق العمال",
      phone: "+96550123456",
      cases: 76,
      successRate: 88
    },
    {
      id: 6,
      name: "د. خالد محمد البحريني",
      specialty: "القانون المالي",
      experience: "14 سنة",
      rating: 4.9,
      reviews: 203,
      location: "المنامة، البحرين",
      verified: true,
      price: "550 ريال/ساعة",
      description: "متخصص في القانون المالي والمصرفي",
      phone: "+97350123456",
      cases: 145,
      successRate: 94
    }
  ];

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
    resetFilters
  };
};
