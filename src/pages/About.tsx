import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, Award, Clock, Scale, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  const values = [{
    icon: Shield,
    title: "الثقة والأمان",
    description: "نضمن سرية المعلومات والحماية القانونية لجميع عملائنا"
  }, {
    icon: Scale,
    title: "العدالة والمهنية",
    description: "نلتزم بأعلى معايير المهنية والعدالة في تقديم خدماتنا"
  }, {
    icon: Users,
    title: "خدمة العملاء",
    description: "نضع العميل في المقدمة ونسعى لتحقيق أفضل النتائج"
  }, {
    icon: Award,
    title: "التميز والجودة",
    description: "نقدم خدمات قانونية متميزة بأعلى معايير الجودة"
  }];
  const team = [{
    name: "د. محمد أحمد السعدي",
    role: "المؤسس والرئيس التنفيذي",
    experience: "25 سنة في المحاماة",
    specialty: "القانون التجاري والشركات"
  }, {
    name: "د. فاطمة علي الزهراني",
    role: "مديرة العمليات القانونية",
    experience: "18 سنة في القانون",
    specialty: "قانون الأسرة والأحوال الشخصية"
  }, {
    name: "د. خالد محمد البكري",
    role: "مدير التطوير التقني",
    experience: "12 سنة في التقنية القانونية",
    specialty: "تطوير المنصات القانونية"
  }];
  const stats = [{
    number: "2,500+",
    label: "محامي معتمد"
  }, {
    number: "15,000+",
    label: "قضية ناجحة"
  }, {
    number: "50,000+",
    label: "عميل راضي"
  }, {
    number: "98%",
    label: "نسبة النجاح"
  }];
  return <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">من نحن</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              منصة سند هي أول منصة إلكترونية شاملة للخدمات القانونية في الوطن العربي، 
              نربط بين المحامين المعتمدين والعملاء الباحثين عن خدمات قانونية موثوقة ومهنية
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-primary to-primary/90 text-white border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">رؤيتنا</h2>
                <p className="leading-relaxed">
                  أن نكون المنصة الرائدة والموثوقة للخدمات القانونية في الوطن العربي، 
                  نسهل الوصول إلى العدالة ونرفع مستوى الخدمات القانونية من خلال التقنية الحديثة
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary to-secondary/90 text-white border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">رسالتنا</h2>
                <p className="leading-relaxed">
                  تمكين الأفراد والشركات من الحصول على خدمات قانونية عالية الجودة 
                  بطريقة سهلة وآمنة وفعالة من خلال ربطهم بأفضل المحامين المتخصصين
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">قيمنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
              const IconComponent = value.icon;
              return <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>;
            })}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-primary/5 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">منصة سند بالأرقام</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>)}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">فريق القيادة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary font-semibold mb-2">{member.role}</p>
                    <Badge variant="outline" className="mb-2 bg-blue-800">{member.experience}</Badge>
                    <p className="text-sm text-muted-foreground">{member.specialty}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>

          {/* Story */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">قصتنا</h2>
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
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">انضم إلى منصة سند اليوم</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              سواء كنت محامياً تبحث عن توسيع نطاق عملك أو عميلاً يحتاج خدمات قانونية، 
              منصة سند هي المكان المناسب لك
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/lawyer-register')}>
                انضم كمحامي
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/register')}>
                سجل كعميل
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default About;