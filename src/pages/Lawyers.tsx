
import Layout from "@/components/Layout";
import LawyersHeader from "@/components/lawyers/LawyersHeader";
import LawyersSearch from "@/components/lawyers/LawyersSearch";
import LawyersGrid from "@/components/lawyers/LawyersGrid";
import { useLawyersData } from "@/hooks/useLawyersData";
import { Loader2 } from "lucide-react";

const Lawyers = () => {
  const {
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
  } = useLawyersData();

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <LawyersHeader />
          
          <LawyersSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
            specialties={specialties}
            cities={cities}
          />

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="mr-2">جاري تحميل المحامين...</span>
            </div>
          ) : (
            <LawyersGrid 
              filteredLawyers={filteredLawyers}
              onResetFilters={resetFilters}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Lawyers;
