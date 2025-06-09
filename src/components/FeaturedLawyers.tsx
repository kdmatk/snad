import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, Clock, Phone, Shield } from "lucide-react";

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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">المحامون المميزون</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            تعرف على نخبة من أفضل المحامين المتخصصين والمعتمدين في منصة سند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <Card key={lawyer.id} className="hover:shadow-lg transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="font-bold text-lg">{lawyer.name}</h3>
                    {lawyer.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <Shield className="h-3 w-3 ml-1" />
                        مُوثق
                      </Badge>
                    )}
                  </div>
                  <p className="text-secondary font-medium">{lawyer.specialty}</p>
                  <p className="text-sm text-muted-foreground">{lawyer.location}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{lawyer.rating}</span>
                    <span className="text-muted-foreground">({lawyer.reviews} تقييم)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{lawyer.experience}</span>
                  </div>
                </div>

                <div className="text-center py-2">
                  <p className="text-lg font-bold text-primary">{lawyer.price}</p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    استشارة فورية
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            عرض جميع المحامين
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLawyers;
