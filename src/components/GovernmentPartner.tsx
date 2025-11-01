import { ExternalLink, FileText, TrendingUp, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import mojLogo from "@/assets/moj-logo.svg";

const GovernmentPartner = () => {
  const features = [
    { icon: FileText, text: "شروح للأنظمة والأحكام القضائية" },
    { icon: TrendingUp, text: "تقارير شهرية للمستجدات" },
    { icon: BookOpen, text: "جميع إصدارات الوزارة" }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-background border-y border-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary/20">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl shadow-xl flex items-center justify-center p-4 border-4 border-secondary/30">
                <img 
                  src={mojLogo} 
                  alt="شعار وزارة العدل السعودية" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center md:text-right space-y-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  البوابة القانونية الرسمية
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  مرجع مهم للمهتمين بالشأن القانوني والقضائي - يسهل الوصول للمعلومة النظامية بكل سهولة
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 bg-primary/5 rounded-lg p-3 border border-primary/10 hover:border-secondary/30 transition-all"
                  >
                    <feature.icon className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div>
                <Button 
                  asChild
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all group"
                >
                  <a 
                    href="https://laws.moj.gov.sa/ar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <span>زيارة البوابة القانونية</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernmentPartner;
