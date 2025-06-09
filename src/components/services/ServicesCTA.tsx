
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServicesCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">هل تحتاج استشارة قانونية فورية؟</h2>
      <p className="mb-6 opacity-90">
        تواصل مع محامينا المعتمدين الآن واحصل على استشارة قانونية فورية
      </p>
      <div className="flex justify-center gap-4">
        <Button 
          variant="secondary"
          size="lg"
          onClick={() => navigate('/instant-consultation')}
        >
          <Phone className="h-5 w-5 ml-2" />
          استشارة فورية
        </Button>
        <Button 
          variant="outline"
          size="lg"
          className="border-white text-white hover:bg-white hover:text-primary"
          onClick={() => navigate('/lawyers')}
        >
          تصفح المحامين
        </Button>
      </div>
    </div>
  );
};

export default ServicesCTA;
