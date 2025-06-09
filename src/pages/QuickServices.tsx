
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QuickServiceCard from "@/components/quick-services/QuickServiceCard";
import QuickOrderForm from "@/components/quick-services/QuickOrderForm";
import QuickServicesFAQ from "@/components/quick-services/QuickServicesFAQ";
import { useQuickServicesData } from "@/hooks/useQuickServicesData";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, Filter } from "lucide-react";

const QuickServices = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const { services, categories } = useQuickServicesData();

  const filteredServices = services.filter(service => {
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "duration":
        return a.durationHours - b.durationHours;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleOrderService = (service: any) => {
    setSelectedService(service);
    setShowOrderForm(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              الخدمات القانونية السريعة – أنجز أمورك القانونية فورًا وبسعر ثابت
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              اختر من بين خدمات قانونية مُحددة مسبقًا، نفذها خلال وقت قياسي، وادفع بأمان.<br />
              كل خدمة يقدمها محامٍ معتمد وموثق على منصة سند.
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="ابحث عن خدمة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>

              {/* Categories Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الفئات</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">التقييم</SelectItem>
                  <SelectItem value="price">السعر</SelectItem>
                  <SelectItem value="duration">المدة</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Filter className="h-4 w-4 ml-2" />
                فلترة متقدمة
              </Button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sortedServices.map((service) => (
              <QuickServiceCard
                key={service.id}
                service={service}
                onOrder={handleOrderService}
              />
            ))}
          </div>

          {/* FAQ Section */}
          <QuickServicesFAQ />
        </div>

        {/* Order Form Dialog */}
        <Dialog open={showOrderForm} onOpenChange={setShowOrderForm}>
          <DialogContent className="max-w-2xl">
            <QuickOrderForm
              service={selectedService}
              onClose={() => setShowOrderForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default QuickServices;
