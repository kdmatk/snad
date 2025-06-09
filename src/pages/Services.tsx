
import Layout from "@/components/Layout";
import ServicesHeader from "@/components/services/ServicesHeader";
import ServicesCategories from "@/components/services/ServicesCategories";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesCTA from "@/components/services/ServicesCTA";
import { useServicesData } from "@/hooks/useServicesData";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const { services, categories, selectedCategory, setSelectedCategory } = useServicesData();

  const handleRequestService = (serviceId: number) => {
    navigate(`/request-service?service=${serviceId}`);
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <ServicesHeader />
          
          <ServicesCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <ServicesGrid 
            services={services}
            onRequestService={handleRequestService}
          />

          <ServicesCTA />
        </div>
      </div>
    </Layout>
  );
};

export default Services;
