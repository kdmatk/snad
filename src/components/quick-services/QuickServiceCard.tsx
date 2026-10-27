import { Clock3, ArrowLeft } from "lucide-react";
import type { QuickService } from "@/hooks/useQuickServicesData";
export default function QuickServiceCard({
  service,
  onOrder,
}: {
  service: QuickService;
  onOrder: (s: QuickService) => void;
}) {
  const Icon = service.icon;
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-icon">
          <Icon size={25} />
        </span>
        <h3>
          <button className="service-title" onClick={() => onOrder(service)}>
            {service.title}
          </button>
        </h3>
      </div>
      <p>{service.description}</p>
      <div className="service-facts">
        <strong>
          {service.price.toLocaleString("ar-SA")} <small>ريال</small>
        </strong>
        <span>
          <Clock3 size={16} />
          {service.duration}
        </span>
      </div>
      <button
        className="outline-button service-button"
        onClick={() => onOrder(service)}
      >
        عرض الخدمة <ArrowLeft size={15} />
      </button>
    </article>
  );
}
