
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Star, User } from "lucide-react";

interface QuickService {
  id: number;
  title: string;
  description: string;
  duration: string;
  durationHours: number;
  price: number;
  rating: number;
  lawyer: string;
  category: string;
  icon: any;
  popular?: boolean;
}

interface QuickServiceCardProps {
  service: QuickService;
  onOrder: (service: QuickService) => void;
}

const QuickServiceCard = ({ service, onOrder }: QuickServiceCardProps) => {
  const IconComponent = service.icon;

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 border-secondary/20 hover:border-secondary relative group">
      {service.popular && (
        <Badge className="absolute -top-2 -right-2 bg-secondary text-white z-10">
          الأكثر طلباً
        </Badge>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <IconComponent className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl font-bold text-primary mb-2">
          {service.title}
        </CardTitle>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {service.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Duration and Price */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium">{service.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-secondary" />
            <span className="text-lg font-bold text-primary">{service.price} ريال</span>
          </div>
        </div>

        {/* Lawyer Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{service.lawyer}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{service.rating}</span>
          </div>
        </div>

        {/* Category Badge */}
        <Badge variant="outline" className="border-primary/30 text-primary w-full justify-center">
          {service.category}
        </Badge>

        {/* Order Button */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3"
          onClick={() => onOrder(service)}
        >
          اطلب الآن
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickServiceCard;
