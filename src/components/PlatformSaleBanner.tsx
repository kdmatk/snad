import { MessageCircle, Sparkles, Check } from "lucide-react";
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
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/20 shadow-xl">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5" />
        
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Content Section */}
            <div className="text-center md:text-right space-y-6 flex-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full border border-amber-500/30">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">عرض لمدة محددة</span>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  منصة قانونية متكاملة
                </h2>
                <p className="text-lg text-slate-400">
                  جاهزة للتشغيل الفوري
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-slate-300 text-sm"
                  >
                    <Check className="h-4 w-4 text-amber-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & CTA Section */}
            <div className="flex flex-col items-center gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              {/* Price */}
              <div className="text-center">
                <p className="text-slate-400 text-sm mb-1">السعر الخاص</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">6,500</span>
                  <span className="text-xl text-amber-400 font-semibold">ريال</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={handleContact} 
                size="lg" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 h-auto transition-all duration-300 hover:scale-105"
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
