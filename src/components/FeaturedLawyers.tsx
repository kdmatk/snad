
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, Clock, Phone, Shield, MapPin, Award } from "lucide-react";

const FeaturedLawyers = () => {
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
      description: "خبير في القانون التجاري والشركات مع سجل حافل من القضايا الناجحة"
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
      description: "متخصصة في قضايا الأسرة والأحوال الشخصية"
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
      description: "محامي جنائي بارز مع خبرة واسعة في القضايا المعقدة"
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="lawyers">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            المحامون المميزون
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            تعرف على نخبة من أفضل المحامين المتخصصين والمعتمدين في منصة سند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lawyers.map((lawyer) => (
            <Card 
              key={lawyer.id} 
              className="hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg hover:-translate-y-2"
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto flex items-center justify-center">
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
                    <h3 className="font-bold text-xl text-center">{lawyer.name}</h3>
                    {lawyer.verified && (
                      <Badge variant="secondary" className="text-xs bg-secondary/10 text-secondary border-secondary/20">
                        مُوثق
                      </Badge>
                    )}
                  </div>
                  <p className="text-secondary font-semibold text-lg">{lawyer.specialty}</p>
                  <div className="flex items-center justify-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{lawyer.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed px-2">
                    {lawyer.description}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-lg">{lawyer.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({lawyer.reviews} تقييم)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span className="font-medium">{lawyer.experience}</span>
                  </div>
                </div>

                <div className="text-center py-3 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{lawyer.price}</p>
                  <p className="text-xs text-muted-foreground">رسوم الاستشارة</p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90" size="sm">
                    استشارة فورية
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white px-8">
            عرض جميع المحامين
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLawyers;
