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
      
      // First try to login
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Check for email provider disabled error
      if (error && (error as any).code === "email_provider_disabled") {
        toast.error("⚠️ تسجيل الدخول عبر البريد الإلكتروني معطل! يرجى تفعيل Email Provider من إعدادات Supabase (راجع الإرشادات في الأسفل)", {
          duration: 10000,
          className: "bg-red-600 text-white font-bold"
        });
        return;
      }

      // If account doesn't exist, create it automatically
      if (error && error.message === "Invalid login credentials") {
        toast.info("جاري إنشاء الحساب التجريبي...", {
          duration: 2000,
        });

        // Create the demo account with auto-confirm
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: accountType === 'client' ? 'عميل تجريبي' : 'محامي تجريبي',
              user_type: accountType
            }
          }
        });

        if (signUpError) {
          if ((signUpError as any).code === "email_provider_disabled") {
            toast.error("⚠️ تسجيل الدخول عبر البريد الإلكتروني معطل! يرجى تفعيل Email Provider من إعدادات Supabase", {
              duration: 10000,
              className: "bg-red-600 text-white font-bold"
            });
            return;
          }
          throw signUpError;
        }

        // Check if email confirmation is required
        if (signUpData?.user && !signUpData.user.confirmed_at) {
          toast.error("يتطلب تأكيد البريد الإلكتروني. يرجى تعطيل 'Confirm email' من إعدادات Supabase لتشغيل النسخة التجريبية.", {
            duration: 8000,
            className: "bg-amber-600 text-white font-bold"
          });
          return;
        }

        // Now login with the newly created account
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) throw loginError;
        
        data = loginData;
      } else if (error && error.message === "Email not confirmed") {
        toast.error("يتطلب تأكيد البريد الإلكتروني. يرجى تعطيل 'Confirm email' من إعدادات Supabase.", {
          duration: 8000,
          className: "bg-amber-600 text-white font-bold"
        });
        return;
      } else if (error) {
        throw error;
      }

      toast.success("مرحباً! تم تسجيل الدخول بنجاح 🎉", {
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
      
      if (error?.code === "email_provider_disabled") {
        toast.error("⚠️ تسجيل الدخول عبر البريد الإلكتروني معطل! يرجى تفعيل Email Provider من إعدادات Supabase", {
          duration: 10000,
          className: "bg-red-600 text-white font-bold"
        });
      } else {
        toast.error("حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.", {
          duration: 4000,
          className: "bg-destructive text-destructive-foreground font-bold"
        });
      }
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
