
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, Clock, Phone, Shield, MapPin, Award, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseLawyers } from "@/hooks/useSupabaseLawyers";

const FeaturedLawyers = () => {
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
  const navigate = useNavigate();
  const { lawyers, loading } = useSupabaseLawyers();

  // اختيار أفضل 3 محامين (الأعلى تقييماً)
  const featuredLawyers = lawyers
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3)
    .map(lawyer => ({
      id: lawyer.id,
      name: lawyer.name,
      specialty: lawyer.specialty,
      experience: lawyer.experience_years ? `${lawyer.experience_years} سنة` : "غير محدد",
      rating: lawyer.rating || 0,
      reviews: Math.floor(Math.random() * 200) + 50, // مؤقت
      location: "المملكة العربية السعودية", // مؤقت
      verified: lawyer.license_verified,
      price: lawyer.hourly_rate ? `${lawyer.hourly_rate} ريال/ساعة` : "غير محدد",
      image: lawyer.avatar_url || "/placeholder.svg",
      description: lawyer.bio || "محامي معتمد ومتخصص",
      phone: lawyer.phone || "+966501234567",
      cases: lawyer.total_cases || 0,
      successRate: 95 // نسبة نجاح افتراضية للمحامين المميزين
    }));

  const handleConsultation = (lawyer: typeof featuredLawyers[0]) => {
    setSelectedLawyer(lawyer.id);
    navigate(`/instant-consultation?lawyer=${lawyer.id}`);
  };

  const handleCall = (lawyer: typeof featuredLawyers[0]) => {
    if (lawyer.phone) {
      window.open(`tel:${lawyer.phone}`, '_self');
    }
  };

  const handleViewProfile = (lawyer: typeof featuredLawyers[0]) => {
    navigate(`/lawyer/${lawyer.id}`);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-100 to-blue-50" id="lawyers">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredLawyers.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-100 to-blue-50" id="lawyers">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              المحامون المميزون
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              لا يوجد محامون معتمدون حالياً
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-100 to-blue-50" id="lawyers">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            المحامون المميزون
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            تعرف على نخبة من أفضل المحامين المتخصصين والمعتمدين في منصة سند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredLawyers.map((lawyer) => (
            <Card 
              key={lawyer.id} 
              className={`hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg hover:-translate-y-2 cursor-pointer overflow-hidden ${
                selectedLawyer === lawyer.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleViewProfile(lawyer)}
            >
              <CardHeader className="text-center pb-4">
                {/* صورة المحامي مع إطار ذهبي */}
                <div className="relative mx-auto mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-full mx-auto flex items-center justify-center golden-ring">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  {lawyer.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1.5 shadow-lg golden-ring border-2">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <h3 className="font-bold text-lg text-center">{lawyer.name}</h3>
                    {lawyer.verified && (
                      <Badge className="text-xs bg-secondary/10 text-secondary border border-secondary/30">
                        <Award className="h-3 w-3 ml-1" />
                        مُوثق
                      </Badge>
                    )}
                  </div>
                  
                  {/* Badge للتخصص */}
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 font-semibold">
                    {lawyer.specialty}
                  </Badge>
                  
                  <div className="flex items-center justify-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs">{lawyer.location}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4" onClick={(e) => e.stopPropagation()}>
                {/* نجوم التقييم بألوان ذهبية */}
                <div className="flex items-center justify-center gap-1 bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 rounded-lg p-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 star-golden ${
                          i < Math.floor(lawyer.rating) ? 'fill-current' : 'fill-none'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-lg mr-2">{lawyer.rating}</span>
                  <span className="text-muted-foreground text-sm">({lawyer.reviews} تقييم)</span>
                </div>

                {/* عرض نسبة النجاح بشكل بصري */}
                <div className="space-y-2 bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-green-700">نسبة النجاح</span>
                    <span className="font-bold text-green-600 text-lg">{lawyer.successRate}%</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-green-100">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 rounded-full"
                      style={{ width: `${lawyer.successRate}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    {lawyer.cases} قضية مكتملة
                  </div>
                </div>

                {/* معلومات إضافية */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-primary/5 rounded border border-primary/10">
                    <div className="font-bold text-primary text-lg">{lawyer.cases}</div>
                    <div className="text-xs text-muted-foreground">قضية</div>
                  </div>
                  <div className="text-center p-2 bg-secondary/5 rounded border border-secondary/10">
                    <div className="font-bold text-secondary text-lg">{lawyer.experience}</div>
                    <div className="text-xs text-muted-foreground">خبرة</div>
                  </div>
                </div>

                <div className="text-center py-2 bg-primary/5 rounded-lg">
                  <p className="text-lg font-bold text-primary">{lawyer.price}</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90" 
                    size="sm"
                    onClick={() => handleConsultation(lawyer)}
                  >
                    <MessageCircle className="h-3 w-3 ml-1" />
                    استشارة
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => handleCall(lawyer)}
                  >
                    <Phone className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary text-primary hover:bg-primary hover:text-white px-8"
            onClick={() => navigate('/lawyers')}
          >
            عرض جميع المحامين
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLawyers;
