import { AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const DemoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
            <p className="text-sm font-medium">
              🎯 نسخة تجريبية - جرب جميع مميزات المنصة
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/demo')}
              className="bg-white text-amber-600 hover:bg-white/90 whitespace-nowrap"
            >
              عرض معلومات الدخول
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className="h-8 w-8 hover:bg-white/20 flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DemoBanner;
