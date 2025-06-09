
import { Button } from "@/components/ui/button";
import LawyerCard from "./LawyerCard";
import { Lawyer } from "@/hooks/useLawyersData";

interface LawyersGridProps {
  filteredLawyers: Lawyer[];
  onResetFilters: () => void;
}

const LawyersGrid = ({ filteredLawyers, onResetFilters }: LawyersGridProps) => {
  if (filteredLawyers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">لم يتم العثور على محامين يطابقون البحث</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={onResetFilters}
        >
          إعادة تعيين الفلاتر
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-muted-foreground">
          تم العثور على {filteredLawyers.length} محامي
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLawyers.map((lawyer) => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} />
        ))}
      </div>
    </>
  );
};

export default LawyersGrid;
