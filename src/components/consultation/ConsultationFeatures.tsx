
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Star, DollarSign } from "lucide-react";

const ConsultationFeatures = () => {
  return (
    <Card className="bg-gradient-to-r from-primary to-primary/90 text-white">
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-4">مميزات الاستشارة الفورية</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            رد سريع خلال دقائق
          </li>
          <li className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            محامون معتمدون ومتخصصون
          </li>
          <li className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            أسعار واضحة ومحددة مسبقاً
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ConsultationFeatures;
