import { MessageCircle, Sparkles, Check, Scale } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const PlatformSaleBanner = () => {
  const handleContact = () => {
    const message = encodeURIComponent('طلب تواصل منصة سند القانونية');
    window.open(`https://t.me/Mram2030?text=${message}`, '_blank');
  };

  const features = [
    "تصميم احترافي",
    "لوحة تحكم كاملة",
    "نظام دفع متكامل",
    "دعم فني مجاني"
  ];

  return (
    <div className="container mx-auto px-4 -mt-8 mb-12">
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 border border-blue-400/20 shadow-xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] hover:border-blue-400/40">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-indigo-400/5" />
        
        {/* For Sale Badge */}
        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg animate-pulse">
          للبيع
        </div>
        
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Justice Scale Icon */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-2xl" />
                <div className="relative bg-gradient-to-br from-blue-800/50 to-indigo-800/50 p-6 rounded-full border border-blue-400/30">
                  <Scale className="h-16 w-16 text-blue-300" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="text-center md:text-right space-y-6 flex-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-400/10 text-blue-300 px-4 py-2 rounded-full border border-blue-400/30">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">عرض لمدة محددة</span>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  منصة قانونية متكاملة
                </h2>
                <p className="text-lg text-blue-200/70">
                  جاهزة للتشغيل الفوري
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-blue-100 text-sm"
                  >
                    <Check className="h-4 w-4 text-blue-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & CTA Section */}
            <div className="flex flex-col items-center gap-6 bg-blue-800/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20">
              {/* Price */}
              <div className="text-center">
                <p className="text-blue-200/70 text-sm mb-1">السعر الخاص</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">6,500</span>
                  <span className="text-xl text-blue-300 font-semibold">ريال</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={handleContact} 
                size="lg" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-6 h-auto transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="h-5 w-5 ml-2" />
                تواصل الآن
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlatformSaleBanner;
