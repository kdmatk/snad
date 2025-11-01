import { Sparkles, Rocket, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const PlatformSaleBanner = () => {
  const handleContact = () => {
    const message = encodeURIComponent('طلب تواصل منصة سند القانونية');
    window.open(`https://t.me/Mram2030?text=${message}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 -mt-8 mb-12">
      <Card className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 border-0 shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>

        {/* Animated Sparkles */}
        <div className="absolute top-4 right-4 animate-pulse">
          <Sparkles className="h-8 w-8 text-yellow-200" />
        </div>
        <div className="absolute bottom-4 left-4 animate-pulse delay-75">
          <Sparkles className="h-6 w-6 text-yellow-200" />
        </div>

        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Content Section */}
            <div className="flex-1 text-center md:text-right text-white space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-2">
                <Rocket className="h-5 w-5 text-yellow-200 animate-bounce" />
                <span className="text-sm font-bold">عرض خاص ⚡</span>
              </div>

              {/* Main Title */}
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="block text-yellow-100">منصة قانونية متكاملة</span>
                <span className="block text-2xl md:text-3xl mt-2">جاهزة للتشغيل الفوري 🚀</span>
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/90 font-medium">
                ابدأ مشروعك القانوني الناجح اليوم بمنصة احترافية كاملة
              </p>

              {/* Price Tag */}
              <div className="inline-flex items-baseline gap-3 bg-white text-amber-600 px-6 py-3 rounded-xl shadow-lg">
                <span className="text-sm font-medium">السعر الخاص:</span>
                <span className="text-3xl md:text-4xl font-bold">6,500</span>
                <span className="text-lg font-bold">ريال فقط</span>
              </div>

              {/* Features List */}
              <div className="flex flex-wrap justify-center md:justify-end gap-3 text-sm font-medium text-white/90 pt-2">
                <span className="bg-white/10 px-3 py-1 rounded-full">✓ تصميم احترافي</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">✓ لوحة تحكم كاملة</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">✓ نظام دفع متكامل</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">✓ دعم فني مجاني</span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col items-center gap-4 md:min-w-[280px]">
              <Button
                onClick={handleContact}
                size="lg"
                className="bg-white text-amber-600 hover:bg-yellow-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg font-bold px-8 py-6 h-auto group"
              >
                <MessageCircle className="h-6 w-6 ml-2 group-hover:animate-bounce" />
                تواصل واطلب الآن
              </Button>
              
              <p className="text-white/80 text-sm font-medium animate-pulse">
                ⏰ عرض محدود - لا تفوت الفرصة!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-300"></div>
      </Card>
    </div>
  );
};

export default PlatformSaleBanner;
