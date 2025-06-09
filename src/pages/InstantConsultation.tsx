
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Video, Clock, DollarSign, Star, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InstantConsultation = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const consultationMethods = [
    {
      id: "chat",
      title: "محادثة نصية",
      description: "استشارة سريعة عبر الرسائل النصية",
      icon: MessageCircle,
      price: "200 ريال",
      duration: "30 دقيقة",
      available: true
    },
    {
      id: "voice",
      title: "مكالمة صوتية",
      description: "استشارة مباشرة عبر الهاتف",
      icon: Phone,
      price: "300 ريال",
      duration: "30 دقيقة",
      available: true
    },
    {
      id: "video",
      title: "مكالمة فيديو",
      description: "استشارة مرئية عبر الفيديو",
      icon: Video,
      price: "400 ريال",
      duration: "30 دقيقة",
      available: false
    }
  ];

  const availableLawyers = [
    {
      id: 1,
      name: "د. أحمد العلي",
      specialty: "القانون التجاري",
      rating: 4.9,
      price: "500 ريال/ساعة",
      status: "متاح الآن",
      responseTime: "دقائق"
    },
    {
      id: 2,
      name: "د. فاطمة الزهراني",
      specialty: "قانون الأسرة",
      rating: 4.8,
      price: "400 ريال/ساعة",
      status: "متاح الآن",
      responseTime: "دقائق"
    },
    {
      id: 3,
      name: "د. محمود الخطيب",
      specialty: "القانون الجنائي",
      rating: 5.0,
      price: "600 ريال/ساعة",
      status: "مشغول",
      responseTime: "10 دقائق"
    }
  ];

  const handleStartConsultation = (lawyerId: number, method: string) => {
    if (!method) {
      alert("يرجى اختيار طريقة الاستشارة أولاً");
      return;
    }
    
    alert(`بدء استشارة ${method} مع المحامي ${availableLawyers.find(l => l.id === lawyerId)?.name}`);
    // Here you would typically start the consultation session
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">استشارة فورية</h1>
              <p className="text-muted-foreground text-lg">
                احصل على استشارة قانونية فورية من محامين متخصصين
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Consultation Methods */}
              <div>
                <Card className="shadow-lg border-0 mb-6">
                  <CardHeader>
                    <CardTitle>اختر طريقة الاستشارة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {consultationMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div
                          key={method.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedMethod === method.id
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-primary/50'
                          } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => method.available && setSelectedMethod(method.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <IconComponent className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-bold">{method.title}</h3>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary">{method.price}</div>
                              <div className="text-sm text-muted-foreground">{method.duration}</div>
                              {!method.available && (
                                <Badge variant="secondary" className="mt-1">غير متاح</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Quick Info */}
                <Card className="bg-gradient-to-r from-primary to-primary/90 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">مميزات الاستشارة الفورية</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        رد سريع خلال دقائق
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        محامون معتمدون ومتخصصون
                      </li>
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        أسعار واضحة ومحددة مسبقاً
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Available Lawyers */}
              <div>
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>المحامون المتاحون الآن</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {availableLawyers.map((lawyer) => (
                      <div key={lawyer.id} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold">{lawyer.name}</h3>
                            <p className="text-sm text-muted-foreground">{lawyer.specialty}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-bold">{lawyer.rating}</span>
                            </div>
                            <Badge 
                              variant={lawyer.status === 'متاح الآن' ? 'default' : 'secondary'}
                              className={lawyer.status === 'متاح الآن' ? 'bg-green-100 text-green-800' : ''}
                            >
                              {lawyer.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <span>الرد خلال: {lawyer.responseTime}</span>
                          <span className="font-medium text-primary">{lawyer.price}</span>
                        </div>
                        
                        <Button 
                          className="w-full"
                          disabled={lawyer.status !== 'متاح الآن' || !selectedMethod}
                          onClick={() => handleStartConsultation(lawyer.id, selectedMethod)}
                        >
                          {lawyer.status === 'متاح الآن' ? 'بدء الاستشارة' : 'غير متاح'}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card className="mt-6 border-red-200 bg-red-50">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-red-800 mb-2">حالة طارئة؟</h3>
                    <p className="text-sm text-red-600 mb-4">
                      للحالات القانونية العاجلة، اتصل بخط الطوارئ
                    </p>
                    <Button variant="destructive" size="lg">
                      <Phone className="h-5 w-5 ml-2" />
                      اتصال طوارئ
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstantConsultation;
