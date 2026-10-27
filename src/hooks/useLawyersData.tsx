import { useState, useMemo } from "react";
import { useSupabaseLawyers, type SupabaseLawyer } from "./useSupabaseLawyers";
export interface Lawyer {
  id: string;
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
  image: string | null;
  hourlyRate: number | null;
  isOnline?: boolean;
  lastSeen?: string | null;
}
export const transformSupabaseLawyer = (l: SupabaseLawyer): Lawyer => ({
  id: l.id,
  name: l.name,
  specialty: l.specialty,
  experience: l.experience_years ? `${l.experience_years} سنة` : "غير محدد",
  rating: l.rating ?? 0,
  reviews: 0,
  location: "",
  verified: l.license_verified,
  price: l.hourly_rate ? `${l.hourly_rate} ريال / ساعة` : "السعر حسب الطلب",
  hourlyRate: l.hourly_rate ?? null,
  description: l.bio || "",
  phone: l.phone || "",
  cases: l.total_cases ?? 0,
  successRate: 0,
  image: l.avatar_url,
  isOnline: l.is_online,
  lastSeen: l.last_seen,
});
export const matchesLawyerId = (l: Lawyer, id: string | null | undefined) =>
  l.id === id ||
  String(parseInt(l.id.replace(/-/g, "").substring(0, 8), 16)) === id;
export function useLawyersData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const { lawyers: data, loading } = useSupabaseLawyers();
  const lawyers = useMemo(() => data.map(transformSupabaseLawyer), [data]);
  const specialties = useMemo(
    () => [...new Set(lawyers.map((l) => l.specialty))],
    [lawyers],
  );
  const cities: string[] = [];
  const filteredLawyers = useMemo(
    () =>
      lawyers.filter(
        (l) =>
          (!searchTerm || `${l.name} ${l.specialty}`.includes(searchTerm)) &&
          (!selectedSpecialty ||
            selectedSpecialty === "all" ||
            l.specialty === selectedSpecialty),
      ),
    [lawyers, searchTerm, selectedSpecialty],
  );
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
    loading,
  };
}
