import { Sparkles, Rocket, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const PlatformSaleBanner = () => {
  const handleContact = () => {
    const message = encodeURIComponent('طلب تواصل منصة سند القانونية');
    window.open(`https://t.me/Mram2030?text=${message}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 -mt-8 mb-12 perspective-1000">
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-amber-500/30 shadow-[0_20px_50px_rgba(217,119,6,0.3)] hover:shadow-[0_30px_70px_rgba(217,119,6,0.5)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group">
        {/* Golden Glow Effect */}
        <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.4),transparent_70%)]"></div>
        </div>
        
        {/* Animated Golden Border Glow */}
        <div className="absolute inset-0 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_20px_rgba(217,119,6,0.5)] group-hover:shadow-[inset_0_0_30px_rgba(217,119,6,0.8)]"></div>
        </div>

        {/* Corner Sparkles */}
        <div className="absolute top-6 right-6 animate-pulse">
          <Sparkles className="h-10 w-10 text-amber-400 drop-shadow-[0_0_10px_rgba(217,119,6,0.8)]" />
        </div>
        <div className="absolute bottom-6 left-6 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="h-8 w-8 text-amber-400 drop-shadow-[0_0_10px_rgba(217,119,6,0.8)]" />
        </div>
        <div className="absolute top-1/2 left-6 animate-pulse" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-6 w-6 text-amber-300 drop-shadow-[0_0_8px_rgba(217,119,6,0.6)]" />
        </div>

        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Content Section */}
            <div className="flex-1 text-center md:text-right text-white space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-amber-400/50 mb-2 shadow-[0_0_20px_rgba(217,119,6,0.4)]">
                <Rocket className="h-5 w-5 text-amber-400 animate-bounce drop-shadow-[0_0_8px_rgba(217,119,6,0.8)]" />
                <span className="text-sm font-bold text-amber-300">عرض خاص ⚡</span>
              </div>

              {/* Main Title */}
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 drop-shadow-[0_2px_10px_rgba(217,119,6,0.5)]">
                  منصة قانونية متكاملة
                </span>
                <span className="block text-2xl md:text-3xl mt-2 text-amber-100 drop-shadow-[0_2px_8px_rgba(217,119,6,0.4)]">
                  جاهزة للتشغيل الفوري 🚀
                </span>
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 font-medium drop-shadow-lg">
                ابدأ مشروعك القانوني الناجح اليوم بمنصة احترافية كاملة
              </p>

              {/* Price Tag - 3D Effect */}
              <div className="inline-flex items-baseline gap-3 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-500 text-slate-900 px-6 py-4 rounded-xl shadow-[0_10px_30px_rgba(217,119,6,0.6)] hover:shadow-[0_15px_40px_rgba(217,119,6,0.8)] transition-all duration-300 hover:scale-105 border-2 border-amber-300">
                <span className="text-sm font-bold">السعر الخاص:</span>
                <span className="text-4xl md:text-5xl font-black drop-shadow-md">6,500</span>
                <span className="text-lg font-bold">ريال فقط</span>
              </div>

              {/* Features List */}
              <div className="flex flex-wrap justify-center md:justify-end gap-3 text-sm font-medium pt-2">
                <span className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 shadow-[0_0_10px_rgba(217,119,6,0.3)]">✓ تصميم احترافي</span>
                <span className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 shadow-[0_0_10px_rgba(217,119,6,0.3)]">✓ لوحة تحكم كاملة</span>
                <span className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 shadow-[0_0_10px_rgba(217,119,6,0.3)]">✓ نظام دفع متكامل</span>
                <span className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 shadow-[0_0_10px_rgba(217,119,6,0.3)]">✓ دعم فني مجاني</span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col items-center gap-4 md:min-w-[280px]">
              <Button
                onClick={handleContact}
                size="lg"
                className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-slate-900 hover:from-amber-500 hover:via-yellow-600 hover:to-amber-600 shadow-[0_10px_30px_rgba(217,119,6,0.5)] hover:shadow-[0_15px_40px_rgba(217,119,6,0.7)] transform hover:scale-110 transition-all duration-300 text-lg font-black px-8 py-6 h-auto group border-2 border-amber-300"
              >
                <MessageCircle className="h-6 w-6 ml-2 group-hover:animate-bounce drop-shadow-lg" />
                تواصل واطلب الآن
              </Button>
              
              <p className="text-amber-300 text-sm font-bold animate-pulse drop-shadow-[0_0_10px_rgba(217,119,6,0.6)]">
                ⏰ عرض محدود - لا تفوت الفرصة!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Golden Glow Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_20px_rgba(217,119,6,0.8)]"></div>
      </Card>
    </div>
  );
};

export default PlatformSaleBanner;
