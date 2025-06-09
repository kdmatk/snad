
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";
import { AvailableLawyer } from "@/hooks/useInstantConsultationData";

interface AvailableLawyersProps {
  lawyers: AvailableLawyer[];
  selectedMethod: string;
  onStartConsultation: (lawyerId: number, method: string) => void;
}

const AvailableLawyers = ({ lawyers, selectedMethod, onStartConsultation }: AvailableLawyersProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle>المحامون المتاحون الآن</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {lawyers.map((lawyer) => (
          <div key={lawyer.id} className="p-4 border rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{lawyer.name}</h3>
                <p className="text-sm text-muted-foreground">{lawyer.specialty}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-bold">{lawyer.rating}</span>
                </div>
                <Badge 
                  variant={lawyer.status === 'متاح الآن' ? 'default' : 'secondary'}
                  className={lawyer.status === 'متاح الآن' ? 'bg-green-100 text-green-800' : ''}
                >
                  {lawyer.status}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span>الرد خلال: {lawyer.responseTime}</span>
              <span className="font-medium text-primary">{lawyer.price}</span>
            </div>
            
            <Button 
              className="w-full"
              disabled={lawyer.status !== 'متاح الآن' || !selectedMethod}
              onClick={() => onStartConsultation(lawyer.id, selectedMethod)}
            >
              {lawyer.status === 'متاح الآن' ? 'بدء الاستشارة' : 'غير متاح'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AvailableLawyers;
