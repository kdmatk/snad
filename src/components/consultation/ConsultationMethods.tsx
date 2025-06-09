
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConsultationMethod } from "@/hooks/useInstantConsultationData";

interface ConsultationMethodsProps {
  methods: ConsultationMethod[];
  selectedMethod: string;
  onMethodSelect: (methodId: string) => void;
}

const ConsultationMethods = ({ methods, selectedMethod, onMethodSelect }: ConsultationMethodsProps) => {
  return (
    <Card className="shadow-lg border-0 mb-6">
      <CardHeader>
        <CardTitle>اختر طريقة الاستشارة</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {methods.map((method) => {
          const IconComponent = method.icon;
          return (
            <div
              key={method.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50'
              } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => method.available && onMethodSelect(method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{method.title}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{method.price}</div>
                  <div className="text-sm text-muted-foreground">{method.duration}</div>
                  {!method.available && (
                    <Badge variant="secondary" className="mt-1">غير متاح</Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ConsultationMethods;
