import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, Clock, Phone, Shield, MapPin, Award, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedLawyers = () => {
  const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null);
  const navigate = useNavigate();

  const lawyers = [
    {
      id: 1,
      name: "د. أحمد محمد العلي",
      specialty: "القانون التجاري",
      experience: "15 سنة",
      rating: 4.9,
      reviews: 245,
      location: "الرياض، السعودية",
      verified: true,
      price: "500 ريال/ساعة",
      image: "/placeholder.svg",
      description: "خبير في القانون التجاري والشركات مع سجل حافل من القضايا الناجحة",
      phone: "+966501234567"
    },
    {
      id: 2,
      name: "د. فاطمة سالم الزهراني",
      specialty: "قانون الأسرة",
      experience: "12 سنة",
      rating: 4.8,
      reviews: 189,
      location: "دبي، الإمارات",
      verified: true,
      price: "400 ريال/ساعة",
      image: "/placeholder.svg",
      description: "متخصصة في قضايا الأسرة والأحوال الشخصية",
      phone: "+971501234567"
    },
    {
      id: 3,
      name: "د. محمود علي الخطيب",
      specialty: "القانون الجنائي",
      experience: "20 سنة",
      rating: 5.0,
      reviews: 312,
      location: "القاهرة، مصر",
      verified: true,
      price: "600 ريال/ساعة",
      image: "/placeholder.svg",
      description: "محامي جنائي بارز مع خبرة واسعة في القضايا المعقدة",
      phone: "+201234567890"
    }
  ];

  const handleConsultation = (lawyer: typeof lawyers[0]) => {
    setSelectedLawyer(lawyer.id);
    navigate(`/instant-consultation?lawyer=${lawyer.id}`);
  };

  const handleCall = (lawyer: typeof lawyers[0]) => {
    window.open(`tel:${lawyer.phone}`, '_self');
  };

  const handleViewProfile = (lawyer: typeof lawyers[0]) => {
    navigate(`/lawyer/${lawyer.id}`);
  };

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
          {lawyers.map((lawyer) => (
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    onClick={() => handleCall(lawyer)}
                  >
                    <Phone className="h-4 w-4" />
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
