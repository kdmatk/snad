
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Scale, 
  Building2, 
  Users, 
  Home, 
  Briefcase, 
  Shield, 
  FileText, 
  Gavel,
  ArrowLeft 
} from "lucide-react";

const LegalServices = () => {
  const services = [
    {
      id: 1,
      title: "القانون المدني",
      description: "استشارات وخدمات قانونية شاملة في القانون المدني والعقود",
      icon: Scale,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      cases: "1,250+ قضية"
    },
    {
      id: 2,
      title: "القانون التجاري",
      description: "خدمات قانونية متخصصة للشركات والأعمال التجارية",
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      cases: "890+ قضية"
    },
    {
      id: 3,
      title: "قانون الأسرة",
      description: "قضايا الزواج والطلاق والحضانة والأحوال الشخصية",
      icon: Users,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      cases: "2,100+ قضية"
    },
    {
      id: 4,
      title: "القانون العقاري",
      description: "استشارات وخدمات قانونية في العقارات والملكية",
      icon: Home,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      cases: "750+ قضية"
    },
    {
      id: 5,
      title: "قانون العمل",
      description: "حقوق العمال وقضايا العمل والتأمينات الاجتماعية",
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      cases: "640+ قضية"
    },
    {
      id: 6,
      title: "القانون الجنائي",
      description: "الدفاع في القضايا الجنائية والجرائم المختلفة",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      cases: "450+ قضية"
    }
  ];

  return (
    <section className="py-16 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            خدماتنا القانونية
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            مجموعة شاملة من الخدمات القانونية المتخصصة لتلبية جميع احتياجاتكم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.id} 
                className="hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1"
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${service.bgColor} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                    <IconComponent className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-primary">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-secondary" />
                    <span className="text-secondary font-medium">{service.cases}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white group"
                  >
                    طلب استشارة
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
            عرض جميع الخدمات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LegalServices;
