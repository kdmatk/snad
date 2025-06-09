
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { Service } from "@/hooks/useServicesData";

interface ServiceCardProps {
  service: Service;
  onRequestService: (serviceId: number) => void;
}

const ServiceCard = ({ service, onRequestService }: ServiceCardProps) => {
  const IconComponent = service.icon;

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 relative">
      {service.popular && (
        <Badge className="absolute -top-2 -right-2 bg-secondary text-white">
          الأكثر طلباً
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <IconComponent className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {service.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="font-bold text-primary text-lg">{service.price}</p>
            <p className="text-muted-foreground">{service.duration}</p>
          </div>
          <Badge variant="outline" className="border-primary/20 text-primary">
            {service.category}
          </Badge>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-sm">المميزات:</p>
          <ul className="space-y-1">
            {service.features.map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                <Shield className="h-3 w-3 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={() => onRequestService(service.id)}
        >
          طلب الخدمة
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
