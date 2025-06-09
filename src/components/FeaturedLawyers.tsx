
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
      phone: lawyer.phone || "+966501234567"
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
              className={`hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg hover:-translate-y-2 cursor-pointer ${
                selectedLawyer === lawyer.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleViewProfile(lawyer)}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  {lawyer.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <h3 className="font-bold text-xl text-center text-blue-900">{lawyer.name}</h3>
                    {lawyer.verified && (
                      <Badge variant="secondary" className="text-xs bg-secondary/10 text-secondary border-secondary/20">
                        مُوثق
                      </Badge>
                    )}
                  </div>
                  <p className="text-secondary font-semibold text-lg">{lawyer.specialty}</p>
                  <div className="flex items-center justify-center gap-1 text-slate-500">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{lawyer.location}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed px-2">
                    {lawyer.description}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between text-sm bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-lg text-blue-900">{lawyer.rating}</span>
                    </div>
                    <span className="text-slate-600">({lawyer.reviews} تقييم)</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Award className="h-4 w-4" />
                    <span className="font-medium">{lawyer.experience}</span>
                  </div>
                </div>

                <div className="text-center py-3 bg-gradient-to-r from-blue-600/10 to-blue-500/10 rounded-lg border border-blue-200">
                  <p className="text-2xl font-bold text-blue-900">{lawyer.price}</p>
                  <p className="text-xs text-slate-600">رسوم الاستشارة</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" 
                    size="sm"
                    onClick={() => handleConsultation(lawyer)}
                  >
                    <MessageCircle className="h-4 w-4 ml-1" />
                    استشارة فورية
                  </Button>
                  {lawyer.phone && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                      onClick={() => handleCall(lawyer)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8"
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
