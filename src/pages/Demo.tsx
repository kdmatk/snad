import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Scale, 
  Lock, 
  Copy, 
  CheckCircle, 
  UserCheck, 
  Phone,
  Mail,
  Shield,
  Clock,
  Award,
  FileText,
  Video,
  MessageSquare,
  Gavel
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Demo = () => {
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("تم النسخ إلى الحافظة");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDemoLogin = async (email: string, password: string, accountType: string) => {
    try {
      setLoggingIn(accountType);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          toast.error("الحساب التجريبي غير موجود. يرجى إنشاء الحساب أولاً من صفحة التسجيل.", {
            duration: 5000,
            className: "bg-destructive text-destructive-foreground font-bold"
          });
          return;
        }
        throw error;
      }

      toast.success("تم تسجيل الدخول بنجاح! 🎉", {
        className: "bg-green-600 text-white font-bold"
      });
      
      // Redirect based on account type
      if (accountType === 'client') {
        navigate('/client-dashboard');
      } else if (accountType === 'lawyer') {
        navigate('/lawyer-dashboard');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.", {
        duration: 4000,
        className: "bg-destructive text-destructive-foreground font-bold"
      });
    } finally {
      setLoggingIn(null);
    }
  };

  const demoAccounts = [
    {
      type: "client",
      title: "حساب العميل التجريبي",
      icon: User,
      email: "demo@client.com",
      password: "Demo123!",
      color: "from-blue-500 to-blue-600",
      features: [
        "تصفح المحامين المعتمدين",
        "طلب استشارة قانونية فورية",
        "إنشاء قضية في المزاد",
        "متابعة الاستشارات والمدفوعات"
      ]
    },
    {
      type: "lawyer",
      title: "حساب المحامي التجريبي",
      icon: Scale,
      email: "demo@lawyer.com",
      password: "Demo123!",
      color: "from-amber-500 to-amber-600",
      features: [
        "إدارة الملف الشخصي والتخصصات",
        "استقبال طلبات الاستشارة",
        "المشاركة في مزادات القضايا",
        "متابعة الإحصائيات والأرباح"
      ]
    }
  ];

  const platformFeatures = [
    {
      icon: Video,
      title: "استشارات فورية",
      description: "استشارات نصية، صوتية ومرئية مع محامين معتمدين"
    },
    {
      icon: Gavel,
      title: "مزادات القضايا",
      description: "نظام مزادات مغلقة لاختيار أفضل محامي"
    },
    {
      icon: MessageSquare,
      title: "محادثة مباشرة",
      description: "تواصل فوري مع المحامين المتصلين"
    },
    {
      icon: FileText,
      title: "خدمات سريعة",
      description: "خدمات قانونية جاهزة بأسعار محددة"
    },
    {
      icon: Shield,
      title: "محامون معتمدون",
      description: "جميع المحامين مرخصين ومعتمدين"
    },
    {
      icon: Award,
      title: "نظام تقييمات",
      description: "تقييمات وشهادات من عملاء حقيقيين"
    }
  ];

  return (
    <Layout>
      <div className="py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 text-lg py-2 px-4">
              نسخة تجريبية - Demo Version
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              مرحباً بك في منصة سند التجريبية
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              جرب جميع مميزات المنصة القانونية الرائدة مع بيانات تجريبية واقعية
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {demoAccounts.map((account) => {
              const Icon = account.icon;
              return (
                <Card key={account.type} className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                  <div className={`h-2 bg-gradient-to-r ${account.color}`} />
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${account.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{account.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      استخدم هذا الحساب لتجربة المنصة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>البريد الإلكتروني</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-muted px-4 py-2 rounded-md font-mono text-sm">
                          {account.email}
                        </code>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(account.email, `${account.type}-email`)}
                        >
                          {copiedField === `${account.type}-email` ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        <span>كلمة المرور</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-muted px-4 py-2 rounded-md font-mono text-sm">
                          {account.password}
                        </code>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(account.password, `${account.type}-password`)}
                        >
                          {copiedField === `${account.type}-password` ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 pt-4 border-t">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        ماذا يمكنك تجربة:
                      </p>
                      <ul className="space-y-2">
                        {account.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Login Button */}
                    <Button 
                      className={`w-full bg-gradient-to-r ${account.color} text-white`}
                      size="lg"
                      onClick={() => handleDemoLogin(account.email, account.password, account.type)}
                      disabled={loggingIn === account.type}
                    >
                      <UserCheck className="ml-2 h-5 w-5" />
                      {loggingIn === account.type ? "جاري تسجيل الدخول..." : "تسجيل الدخول الآن"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Platform Features */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                مميزات المنصة
              </CardTitle>
              <CardDescription>
                اكتشف جميع الإمكانيات المتاحة في منصة سند
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platformFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 h-fit">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">جاهز للبدء؟</h2>
                  <p className="text-muted-foreground">
                    اختر حساباً من الأعلى وابدأ التجربة الآن
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg"
                    onClick={() => navigate('/lawyers')}
                  >
                    <Scale className="ml-2 h-5 w-5" />
                    تصفح المحامين
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate('/instant-consultation')}
                  >
                    <Phone className="ml-2 h-5 w-5" />
                    استشارة فورية
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate('/legal-auctions')}
                  >
                    <Gavel className="ml-2 h-5 w-5" />
                    مزادات القضايا
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Notes */}
          <div className="mt-8 space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-3 rounded-lg">
                <Clock className="h-4 w-4" />
                <span>جميع البيانات في هذه النسخة تجريبية ولا تمثل معاملات حقيقية</span>
              </div>
            </div>
            
            <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
              <CardContent className="pt-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-amber-500 rounded-lg">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-amber-900 dark:text-amber-100">
                      ملاحظة هامة: إنشاء الحسابات التجريبية
                    </h3>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      للدخول بالحسابات التجريبية، يجب عليك أولاً إنشاء هذه الحسابات من خلال:
                    </p>
                    <ol className="text-sm text-amber-800 dark:text-amber-200 list-decimal list-inside space-y-1 mr-2">
                      <li>انسخ البريد الإلكتروني وكلمة المرور من الأعلى</li>
                      <li>انتقل إلى صفحة التسجيل (للعميل) أو صفحة تسجيل المحامي</li>
                      <li>أنشئ الحساب باستخدام نفس البيانات</li>
                      <li>ارجع لهذه الصفحة وسجل الدخول</li>
                    </ol>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/register')}
                        className="bg-white dark:bg-amber-900 border-amber-300"
                      >
                        تسجيل عميل جديد
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/lawyer-register')}
                        className="bg-white dark:bg-amber-900 border-amber-300"
                      >
                        تسجيل محامي جديد
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
