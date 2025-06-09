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
import { useNavigate } from "react-router-dom";

const LegalServices = () => {
  const navigate = useNavigate();

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
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      cases: "890+ قضية"
    },
    {
      id: 3,
      title: "قانون الأسرة",
      description: "قضايا الزواج والطلاق والحضانة والأحوال الشخصية",
      icon: Users,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      cases: "2,100+ قضية"
    },
    {
      id: 4,
      title: "القانون العقاري",
      description: "استشارات وخدمات قانونية في العقارات والملكية",
      icon: Home,
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      cases: "750+ قضية"
    },
    {
      id: 5,
      title: "قانون العمل",
      description: "حقوق العمال وقضايا العمل والتأمينات الاجتماعية",
      icon: Briefcase,
      color: "text-slate-700",
      bgColor: "bg-slate-50",
      cases: "640+ قضية"
    },
    {
      id: 6,
      title: "القانون الجنائي",
      description: "الدفاع في القضايا الجنائية والجرائم المختلفة",
      icon: Shield,
      color: "text-blue-800",
      bgColor: "bg-blue-50",
      cases: "450+ قضية"
    }
  ];

  const handleServiceRequest = (serviceId: number) => {
    navigate(`/request-service?service=${serviceId}`);
  };

  return (
    <section className="py-16 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            خدماتنا القانونية
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            مجموعة شاملة من الخدمات القانونية المتخصصة لتلبية جميع احتياجاتكم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.id} 
                className="hover:shadow-xl transition-all duration-300 border-blue-200 bg-white/90 backdrop-blur-sm shadow-lg hover:-translate-y-1"
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${service.bgColor} rounded-full mx-auto mb-4 flex items-center justify-center border border-blue-200`}>
                    <IconComponent className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-blue-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-secondary" />
                    <span className="text-secondary font-medium">{service.cases}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white group"
                    onClick={() => handleServiceRequest(service.id)}
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
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            onClick={() => navigate('/services')}
          >
            عرض جميع الخدمات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LegalServices;
