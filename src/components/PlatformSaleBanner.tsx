import { Sparkles, Rocket, MessageCircle, Clock, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
const PlatformSaleBanner = () => {
  // Countdown timer - 7 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        minutes: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
        seconds: Math.floor(distance % (1000 * 60) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const handleContact = () => {
    const message = encodeURIComponent('طلب تواصل منصة سند القانونية');
    window.open(`https://t.me/Mram2030?text=${message}`, '_blank');
  };
  return <div className="container mx-auto px-4 -mt-8 mb-12">
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-violet-700 border-0 shadow-[0_25px_60px_rgba(124,58,237,0.5)] hover:shadow-[0_30px_80px_rgba(124,58,237,0.7)] transition-all duration-500 group">
        {/* Animated Background Sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => <div key={i} className="absolute animate-pulse" style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}>
              <Sparkles className="text-amber-400/60" size={Math.random() * 20 + 10} />
            </div>)}
        </div>

        {/* Radial Glow Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{
          animationDelay: '1s'
        }}></div>
        </div>

        {/* Main Floating Sparkles */}
        <div className="absolute top-8 right-8 animate-bounce">
          <Zap className="h-12 w-12 text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
        </div>
        <div className="absolute bottom-8 left-8 animate-bounce" style={{
        animationDelay: '0.5s'
      }}>
          <Sparkles className="h-10 w-10 text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.8)]" />
        </div>

        <div className="relative p-8 md:p-12">
          <div className="flex flex-col items-center gap-8">
            {/* Top Badge and Title Section */}
            <div className="text-center text-white space-y-4 w-full">
              {/* Explosive Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 px-6 py-3 rounded-full border-2 border-yellow-300 shadow-[0_0_30px_rgba(251,191,36,0.6)] animate-pulse mb-2">
                <Rocket className="h-6 w-6 animate-bounce" />
                <span className="text-base font-black">🔥 عرض حصري محدود 🔥</span>
              </div>

              {/* Main Title */}
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 drop-shadow-[0_2px_15px_rgba(251,191,36,0.8)] animate-pulse">
                  منصة قانونية متكاملة
                </span>
                <span className="block text-3xl md:text-4xl mt-3 text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.5)]">
                  جاهزة للتشغيل الفوري 🚀
                </span>
              </h2>

              {/* Description */}
              <p className="text-xl md:text-2xl text-blue-50 font-bold drop-shadow-lg max-w-3xl mx-auto">
                ابدأ مشروعك القانوني الناجح اليوم بمنصة احترافية كاملة
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-amber-400/50 shadow-[0_0_40px_rgba(251,191,36,0.4)] w-full max-w-2xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="h-6 w-6 text-amber-300 animate-pulse" />
                <span className="text-amber-300 font-bold text-lg">ينتهي العرض خلال:</span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center" dir="ltr">
                <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl p-4 shadow-lg">
                  <div className="text-3xl md:text-4xl font-black text-slate-900">{timeLeft.days}</div>
                  <div className="text-xs md:text-sm font-bold text-slate-800 mt-1">يوم</div>
                </div>
                <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl p-4 shadow-lg">
                  <div className="text-3xl md:text-4xl font-black text-slate-900">{timeLeft.hours}</div>
                  <div className="text-xs md:text-sm font-bold text-slate-800 mt-1">ساعة</div>
                </div>
                <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl p-4 shadow-lg">
                  <div className="text-3xl md:text-4xl font-black text-slate-900">{timeLeft.minutes}</div>
                  <div className="text-xs md:text-sm font-bold text-slate-800 mt-1">دقيقة</div>
                </div>
                <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl p-4 shadow-lg animate-pulse">
                  <div className="text-3xl md:text-4xl font-black text-slate-900">{timeLeft.seconds}</div>
                  <div className="text-xs md:text-sm font-bold text-slate-800 mt-1">ثانية</div>
                </div>
              </div>
            </div>

            {/* Price Tag - Explosive Style */}
            <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-900 px-8 py-6 rounded-2xl shadow-[0_15px_50px_rgba(251,191,36,0.6)] border-4 border-yellow-300 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <span className="text-lg font-bold">السعر الخاص:</span>
                <span className="text-5xl md:text-6xl font-black drop-shadow-lg">6,500</span>
                <span className="text-2xl font-black">ريال فقط</span>
              </div>
            </div>

            {/* Circular Badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-900 text-sm md:text-base px-6 py-3 rounded-full border-2 border-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.5)] font-bold hover:scale-110 transition-transform">
                ✓ تصميم احترافي
              </Badge>
              <Badge className="bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-900 text-sm md:text-base px-6 py-3 rounded-full border-2 border-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.5)] font-bold hover:scale-110 transition-transform">
                ✓ لوحة تحكم كاملة
              </Badge>
              <Badge className="bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-900 text-sm md:text-base px-6 py-3 rounded-full border-2 border-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.5)] font-bold hover:scale-110 transition-transform">
                ✓ نظام دفع متكامل
              </Badge>
              <Badge className="bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-900 text-sm md:text-base px-6 py-3 rounded-full border-2 border-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.5)] font-bold hover:scale-110 transition-transform">
                ✓ دعم فني مجاني
              </Badge>
            </div>

            {/* CTA Button */}
            <Button onClick={handleContact} size="lg" className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-900 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 shadow-[0_15px_40px_rgba(251,191,36,0.6)] hover:shadow-[0_20px_50px_rgba(251,191,36,0.8)] transform hover:scale-110 active:scale-95 transition-all duration-300 text-xl font-black px-10 py-7 h-auto group border-4 border-yellow-300">
              <MessageCircle className="h-7 w-7 ml-2 group-hover:animate-bounce drop-shadow-lg" />
              تواصل واطلب الآن - لا تفوت الفرصة!
            </Button>
          </div>
        </div>

        {/* Bottom Animated Line */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 animate-pulse shadow-[0_0_20px_rgba(251,191,36,0.8)]"></div>
      </Card>
    </div>;
};
export default PlatformSaleBanner;