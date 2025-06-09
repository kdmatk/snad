
import Layout from "@/components/Layout";
import LawyersHeader from "@/components/lawyers/LawyersHeader";
import LawyersSearch from "@/components/lawyers/LawyersSearch";
import LawyersGrid from "@/components/lawyers/LawyersGrid";
import { useLawyersData } from "@/hooks/useLawyersData";

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
    resetFilters
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

          <LawyersGrid 
            filteredLawyers={filteredLawyers}
            onResetFilters={resetFilters}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Lawyers;
