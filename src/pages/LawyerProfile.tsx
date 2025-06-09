
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, User, Shield, MapPin, Phone, MessageCircle, Award, Calendar, Clock, FileText, Scale } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const LawyerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app, this would be fetched based on the ID
  const lawyer = {
    id: parseInt(id || "1"),
    name: "د. أحمد محمد العلي",
    specialty: "القانون التجاري",
    experience: "15 سنة",
    rating: 4.9,
    reviews: 245,
    location: "الرياض، السعودية",
    verified: true,
    price: "500 ريال/ساعة",
    description: "خبير في القانون التجاري والشركات مع سجل حافل من القضايا الناجحة في مجال الشركات والاستثمار والقانون المصرفي",
    phone: "+966501234567",
    email: "ahmed.ali@example.com",
    cases: 156,
    successRate: 95,
    languages: ["العربية", "الإنجليزية"],
    education: [
      "دكتوراه في القانون التجاري - جامعة الملك سعود",
      "ماجستير في القانون الدولي - جامعة القاهرة",
      "بكالوريوس القانون - جامعة الإسكندرية"
    ],
    certifications: [
      "عضو نقابة المحامين السعودية",
      "شهادة التحكيم التجاري الدولي",
      "شهادة في القانون المصرفي"
    ],
    services: [
      "استشارات قانونية",
      "التمثيل القضائي",
      "صياغة العقود",
      "التحكيم التجاري"
    ]
  };

  const reviews = [
    {
      id: 1,
      clientName: "محمد الأحمد",
      rating: 5,
      date: "2024-01-15",
      comment: "محامي ممتاز، خدمة احترافية وسرعة في الرد. نصح بحلول عملية وفعالة لقضيتي التجارية."
    },
    {
      id: 2,
      clientName: "فاطمة الزهراني",
      rating: 5,
      date: "2024-01-10",
      comment: "تعامل راقي ومهنية عالية. ساعدني في حل مشكلة قانونية معقدة بطريقة سهلة ومفهومة."
    },
    {
      id: 3,
      clientName: "خالد العتيبي",
      rating: 4,
      date: "2024-01-05",
      comment: "خبرة واسعة في القانون التجاري. أنصح بالتعامل معه لكل من يحتاج استشارة قانونية تجارية."
    }
  ];

  const cases = [
    {
      id: 1,
      title: "قضية نزاع تجاري بين شركتين",
      type: "تجاري",
      status: "مغلقة",
      result: "نجح",
      year: "2023"
    },
    {
      id: 2,
      title: "صياغة عقد شراكة استراتيجية",
      type: "عقود",
      status: "مكتملة",
      result: "نجح",
      year: "2023"
    },
    {
      id: 3,
      title: "تحكيم تجاري دولي",
      type: "تحكيم",
      status: "مغلقة",
      result: "نجح",
      year: "2022"
    }
  ];

  const handleConsultation = () => {
    navigate(`/instant-consultation?lawyer=${lawyer.id}`);
  };

  const handleCall = () => {
    window.open(`tel:${lawyer.phone}`, '_self');
  };

  const handleScheduleAppointment = () => {
    navigate(`/schedule-appointment?lawyer=${lawyer.id}`);
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Profile */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center relative">
                        <User className="h-16 w-16 text-white" />
                        {lawyer.verified && (
                          <div className="absolute -bottom-2 -right-2 bg-secondary rounded-full p-2">
                            <Shield className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold">{lawyer.name}</h1>
                        {lawyer.verified && (
                          <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                            مُوثق
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-xl text-secondary font-semibold mb-2">{lawyer.specialty}</p>
                      
                      <div className="flex items-center gap-4 text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{lawyer.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          <span>{lawyer.experience}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          <span className="font-bold text-lg">{lawyer.rating}</span>
                          <span className="text-muted-foreground">({lawyer.reviews} تقييم)</span>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg text-primary">{lawyer.cases}</div>
                          <div className="text-sm text-muted-foreground">قضية</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg text-green-600">{lawyer.successRate}%</div>
                          <div className="text-sm text-muted-foreground">نجاح</div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {lawyer.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {lawyer.languages.map((language, index) => (
                          <Badge key={index} variant="outline" className="border-primary/20 text-primary">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Card */}
            <div>
              <Card className="shadow-lg border-0 sticky top-8">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-primary mb-2">{lawyer.price}</div>
                    <div className="text-sm text-muted-foreground">رسوم الاستشارة</div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleConsultation}
                    >
                      <MessageCircle className="h-5 w-5 ml-2" />
                      استشارة فورية
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={handleScheduleAppointment}
                    >
                      <Calendar className="h-5 w-5 ml-2" />
                      حجز موعد
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full"
                      onClick={handleCall}
                    >
                      <Phone className="h-5 w-5 ml-2" />
                      اتصال مباشر
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground text-center">
                      متاح للرد خلال <span className="font-bold text-primary">دقائق</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="about">نبذة</TabsTrigger>
              <TabsTrigger value="services">الخدمات</TabsTrigger>
              <TabsTrigger value="cases">القضايا</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              <TabsTrigger value="contact">التواصل</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>التعليم والمؤهلات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {lawyer.education.map((edu, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>الشهادات والعضويات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {lawyer.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="services" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>الخدمات المقدمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lawyer.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                        <Scale className="h-6 w-6 text-primary" />
                        <span className="font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cases" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>أمثلة من القضايا السابقة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cases.map((case_item) => (
                      <div key={case_item.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold">{case_item.title}</h3>
                          <Badge 
                            variant={case_item.result === 'نجح' ? 'default' : 'secondary'}
                            className={case_item.result === 'نجح' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {case_item.result}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{case_item.type}</span>
                          <span>{case_item.year}</span>
                          <span>{case_item.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>آراء العملاء</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">{review.clientName}</p>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات التواصل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">رقم الهاتف</p>
                        <p className="text-muted-foreground">{lawyer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">المكان</p>
                        <p className="text-muted-foreground">{lawyer.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Clock className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">ساعات العمل</p>
                        <p className="text-muted-foreground">الأحد - الخميس: 8ص - 6م</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default LawyerProfile;
