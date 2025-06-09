
import { Button } from "@/components/ui/button";

interface Category {
  name: string;
  value: string;
}

interface ServicesCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ServicesCategories = ({ categories, selectedCategory, onCategoryChange }: ServicesCategoriesProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? "default" : "outline"}
          className="border-primary text-primary hover:bg-primary hover:text-white"
          onClick={() => onCategoryChange(category.value)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default ServicesCategories;
