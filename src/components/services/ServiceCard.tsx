import { ArrowLeft, Clock3, Check } from "lucide-react";
import type { Service } from "@/hooks/useServicesData";
export default function ServiceCard({
  service,
  onRequestService,
}: {
  service: Service;
  onRequestService: (id: number) => void;
}) {
  const Icon = service.icon;
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-icon">
          <Icon size={25} />
        </span>
        <h3>{service.title}</h3>
      </div>
      <p>{service.description}</p>
      <ul className="mb-5 space-y-2">
        {service.features.map((f) => (
          <li
            key={f}
            className="flex gap-2 items-center text-xs text-muted-foreground"
          >
            <Check size={14} />
            {f}
          </li>
        ))}
      </ul>
      <div className="service-facts">
        <strong>{service.price}</strong>
        <span>
          <Clock3 size={15} />
          {service.duration}
        </span>
      </div>
      <button
        className="outline-button service-button"
        onClick={() => onRequestService(service.id)}
      >
        طلب الخدمة <ArrowLeft size={15} />
      </button>
    </article>
  );
}
