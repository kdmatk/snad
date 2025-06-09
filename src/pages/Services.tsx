
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, FileText, Users, Phone, MessageCircle, Clock, Shield, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "الاستشارات القانونية",
      description: "احصل على استشارة قانونية فورية من محامين متخصصين",
      icon: MessageCircle,
      price: "من 200 ريال",
      duration: "30-60 دقيقة",
      features: ["استشارة فورية", "عبر الهاتف أو الفيديو", "تقرير مكتوب"],
      category: "استشارات",
      popular: true
    },
    {
      id: 2,
      title: "التمثيل القضائي",
      description: "تمثيل قانوني احترافي في جميع أنواع القضايا",
      icon: Scale,
      price: "حسب القضية",
      duration: "حسب المدة القانونية",
      features: ["تمثيل كامل", "إعداد المرافعات", "المتابعة القضائية"],
      category: "تمثيل"
    },
    {
      id: 3,
      title: "صياغة العقود",
      description: "صياغة ومراجعة العقود والاتفاقيات القانونية",
      icon: FileText,
      price: "من 500 ريال",
      duration: "3-5 أيام عمل",
      features: ["صياغة احترافية", "مراجعة قانونية", "ضمان الحماية"],
      category: "وثائق"
    },
    {
      id: 4,
      title: "الوساطة والتحكيم",
      description: "حل النزاعات خارج المحاكم بطريقة ودية",
      icon: Users,
      price: "من 1000 ريال",
      duration: "حسب تعقيد النزاع",
      features: ["حل سريع", "توفير التكاليف", "سرية تامة"],
      category: "حلول"
    },
    {
      id: 5,
      title: "الاستشارات المتخصصة",
      description: "استشارات في مجالات قانونية متخصصة",
      icon: Award,
      price: "من 300 ريال",
      duration: "60-90 دقيقة",
      features: ["خبراء متخصصون", "تحليل معمق", "توصيات عملية"],
      category: "تخصص"
    },
    {
      id: 6,
      title: "المتابعة القانونية",
      description: "خدمة المتابعة المستمرة للقضايا والمعاملات",
      icon: Clock,
      price: "اشتراك شهري",
      duration: "متواصل",
      features: ["متابعة دورية", "تقارير منتظمة", "دعم مستمر"],
      category: "متابعة"
    }
  ];

  const categories = [
    { name: "الكل", value: "" },
    { name: "استشارات", value: "استشارات" },
    { name: "تمثيل", value: "تمثيل" },
    { name: "وثائق", value: "وثائق" },
    { name: "حلول", value: "حلول" },
    { name: "تخصص", value: "تخصص" },
    { name: "متابعة", value: "متابعة" }
  ];

  const handleRequestService = (serviceId: number) => {
    navigate(`/request-service?service=${serviceId}`);
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">خدماتنا القانونية</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              نقدم مجموعة شاملة من الخدمات القانونية المتخصصة لتلبية جميع احتياجاتك القانونية
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 relative"
                >
                  {service.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-secondary text-white">
                      الأكثر طلباً
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <p className="font-bold text-primary text-lg">{service.price}</p>
                        <p className="text-muted-foreground">{service.duration}</p>
                      </div>
                      <Badge variant="outline" className="border-primary/20 text-primary">
                        {service.category}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold text-sm">المميزات:</p>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <Shield className="h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => handleRequestService(service.id)}
                    >
                      طلب الخدمة
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">هل تحتاج استشارة قانونية فورية؟</h2>
            <p className="mb-6 opacity-90">
              تواصل مع محامينا المعتمدين الآن واحصل على استشارة قانونية فورية
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => navigate('/instant-consultation')}
              >
                <Phone className="h-5 w-5 ml-2" />
                استشارة فورية
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => navigate('/lawyers')}
              >
                تصفح المحامين
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
