
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const EmergencyContact = () => {
  return (
    <Card className="mt-6 border-red-200 bg-red-50">
      <CardContent className="p-6 text-center">
        <h3 className="font-bold text-red-800 mb-2">حالة طارئة؟</h3>
        <p className="text-sm text-red-600 mb-4">
          للحالات القانونية العاجلة، اتصل بخط الطوارئ
        </p>
        <Button variant="destructive" size="lg">
          <Phone className="h-5 w-5 ml-2" />
          اتصال طوارئ
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmergencyContact;
