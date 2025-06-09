
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, Award, Clock, Scale, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Shield,
      title: "الثقة والأمان",
      description: "نضمن سرية المعلومات والحماية القانونية لجميع عملائنا",
      gradient: "from-secondary to-yellow-400"
    },
    {
      icon: Scale,
      title: "العدالة والمهنية",
      description: "نلتزم بأعلى معايير المهنية والعدالة في تقديم خدماتنا",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      icon: Users,
      title: "خدمة العملاء",
      description: "نضع العميل في المقدمة ونسعى لتحقيق أفضل النتائج",
      gradient: "from-green-500 to-green-700"
    },
    {
      icon: Award,
      title: "التميز والجودة",
      description: "نقدم خدمات قانونية متميزة بأعلى معايير الجودة",
      gradient: "from-purple-500 to-purple-700"
    }
  ];

  const team = [
    {
      name: "د. محمد أحمد السعدي",
      role: "المؤسس والرئيس التنفيذي",
      experience: "25 سنة في المحاماة",
      specialty: "القانون التجاري والشركات"
    },
    {
      name: "د. فاطمة علي الزهراني",
      role: "مديرة العمليات القانونية",
      experience: "18 سنة في القانون",
      specialty: "قانون الأسرة والأحوال الشخصية"
    },
    {
      name: "د. خالد محمد البكري",
      role: "مدير التطوير التقني",
      experience: "12 سنة في التقنية القانونية",
      specialty: "تطوير المنصات القانونية"
    }
  ];

  const stats = [
    { number: "2,500+", label: "محامي معتمد", gradient: "from-secondary to-yellow-400" },
    { number: "15,000+", label: "قضية ناجحة", gradient: "from-blue-500 to-blue-700" },
    { number: "50,000+", label: "عميل راضي", gradient: "from-green-500 to-green-700" },
    { number: "98%", label: "نسبة النجاح", gradient: "from-purple-500 to-purple-700" }
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-l from-primary/5 via-blue-50 to-slate-50 rounded-3xl -m-8"></div>
            <div className="relative py-16">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-l from-primary via-blue-900 to-slate-900 bg-clip-text text-transparent mb-6">من نحن</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                منصة سند هي أول منصة إلكترونية شاملة للخدمات القانونية في الوطن العربي، 
                نربط بين المحامين المعتمدين والعملاء الباحثين عن خدمات قانونية موثوقة ومهنية
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-primary via-blue-900 to-slate-900 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-secondary/20 to-yellow-400/20 rounded-full blur-2xl"></div>
                <div className="relative">
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-l from-white via-secondary to-yellow-200 bg-clip-text text-transparent">رؤيتنا</h2>
                  <p className="leading-relaxed opacity-90">
                    أن نكون المنصة الرائدة والموثوقة للخدمات القانونية في الوطن العربي، 
                    نسهل الوصول إلى العدالة ونرفع مستوى الخدمات القانونية من خلال التقنية الحديثة
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary via-yellow-400 to-secondary/90 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 relative overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-white/20 to-yellow-200/20 rounded-full blur-2xl"></div>
                <div className="relative">
                  <h2 className="text-2xl font-bold mb-4">رسالتنا</h2>
                  <p className="leading-relaxed opacity-90">
                    تمكين الأفراد والشركات من الحصول على خدمات قانونية عالية الجودة 
                    بطريقة سهلة وآمنة وفعالة من خلال ربطهم بأفضل المحامين المتخصصين
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-l from-primary via-blue-900 to-slate-900 bg-clip-text text-transparent mb-8">قيمنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-50 opacity-50"></div>
                      <div className="relative">
                        <div className={`mx-auto mb-4 w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-primary">{value.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-l from-primary/10 via-blue-50 to-slate-50 rounded-3xl p-8 mb-16 shadow-xl">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-l from-primary via-blue-900 to-slate-900 bg-clip-text text-transparent mb-8">منصة سند بالأرقام</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4">
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-l from-primary via-blue-900 to-slate-900 bg-clip-text text-transparent mb-8">فريق القيادة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-50 opacity-50"></div>
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary via-blue-900 to-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
                        <Users className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-1 text-primary">{member.name}</h3>
                      <p className="text-secondary font-semibold mb-2">{member.role}</p>
                      <Badge variant="outline" className="mb-2 border-primary/20">{member.experience}</Badge>
                      <p className="text-sm text-muted-foreground">{member.specialty}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="bg-gradient-to-l from-white via-blue-50/50 to-slate-50/50 rounded-3xl shadow-xl border border-primary/10 p-8 mb-16">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-l from-primary via-blue-900 to-slate-900 bg-clip-text text-transparent mb-8">قصتنا</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
              <p>
                بدأت فكرة منصة سند من إدراكنا للتحديات التي يواجهها الأفراد والشركات في الوصول 
                إلى الخدمات القانونية الموثوقة والمهنية في الوطن العربي. كان الهدف هو إنشاء جسر 
                تقني يربط بين المحامين المتميزين والعملاء الباحثين عن حلول قانونية فعالة.
              </p>
              <p>
                منذ إطلاقنا في عام 2023، نجحنا في بناء شبكة واسعة من المحامين المعتمدين 
                في جميع أنحاء الوطن العربي، وخدمنا آلاف العملاء بنجاح في مختلف المجالات القانونية.
              </p>
              <p>
                نواصل العمل على تطوير منصتنا وإضافة خدمات جديدة تلبي احتياجات عملائنا المتزايدة، 
                مع الحفاظ على أعلى معايير الجودة والمهنية في جميع خدماتنا.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center relative">
            <div className="absolute inset-0 bg-gradient-to-l from-primary/5 via-blue-50 to-slate-50 rounded-3xl -m-8"></div>
            <div className="relative py-16">
              <h2 className="text-2xl font-bold bg-gradient-to-l from-primary via-blue-900 to-slate-900 bg-clip-text text-transparent mb-4">انضم إلى منصة سند اليوم</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                سواء كنت محامياً تبحث عن توسيع نطاق عملك أو عميلاً يحتاج خدمات قانونية، 
                منصة سند هي المكان المناسب لك
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-l from-secondary via-yellow-400 to-secondary text-white hover:from-secondary/90 hover:via-yellow-300 hover:to-secondary/80 font-medium px-8 py-3 shadow-xl border-2 border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-xl"
                  onClick={() => navigate('/lawyer-register')}
                >
                  انضم كمحامي
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-white font-medium px-8 py-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 rounded-xl"
                  onClick={() => navigate('/register')}
                >
                  سجل كعميل
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
