
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface LawyersSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
  specialties: string[];
  cities: string[];
}

const LawyersSearch = ({
  searchTerm,
  setSearchTerm,
  selectedCity,
  setSelectedCity,
  selectedSpecialty,
  setSelectedSpecialty,
  specialties,
  cities
}: LawyersSearchProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="ابحث عن محامي أو تخصص..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger>
            <SelectValue placeholder="التخصص" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع التخصصات</SelectItem>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger>
            <SelectValue placeholder="المدينة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المدن</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
          <Filter className="h-4 w-4 ml-2" />
          فلترة متقدمة
        </Button>
      </div>
    </div>
  );
};

export default LawyersSearch;
