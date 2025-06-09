
import ServiceCard from "./ServiceCard";
import { Service } from "@/hooks/useServicesData";

interface ServicesGridProps {
  services: Service[];
  onRequestService: (serviceId: number) => void;
}

const ServicesGrid = ({ services, onRequestService }: ServicesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onRequestService={onRequestService}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
