
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const LegalServices = () => {
  const services = [
    {
      title: "القانون المدني",
      description: "خدمات قانونية شاملة في المسائل المدنية والعقود",
      icon: "⚖️",
      cases: 1250,
      avgPrice: "300 ريال"
    },
    {
      title: "القانون التجاري",
      description: "استشارات الشركات والتجارة الإلكترونية",
      icon: "💼",
      cases: 890,
      avgPrice: "450 ريال"
    },
    {
      title: "القانون الجنائي",
      description: "الدفاع في القضايا الجنائية والمخالفات",
      icon: "🛡️",
      cases: 675,
      avgPrice: "600 ريال"
    },
    {
      title: "قانون العمل",
      description: "حقوق العمال وعلاقات العمل",
      icon: "👔",
      cases: 543,
      avgPrice: "250 ريال"
    },
    {
      title: "القانون العقاري",
      description: "معاملات العقارات والملكية",
      icon: "🏠",
      cases: 432,
      avgPrice: "400 ريال"
    },
    {
      title: "قانون الأسرة",
      description: "الأحوال الشخصية والزواج والطلاق",
      icon: "👨‍👩‍👧‍👦",
      cases: 789,
      avgPrice: "350 ريال"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">التخصصات القانونية</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            اختر من بين مجموعة واسعة من التخصصات القانونية واحصل على الخدمة المناسبة لاحتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-300 group cursor-pointer">
              <CardHeader className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-center">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="text-muted-foreground">
                    {service.cases} قضية مكتملة
                  </div>
                  <Badge variant="outline">
                    متوسط السعر: {service.avgPrice}
                  </Badge>
                </div>
                
                <Button className="w-full" variant="outline">
                  طلب استشارة
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegalServices;
