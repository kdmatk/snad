import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const contactInfo = [{
    icon: Phone,
    title: "الهاتف",
    details: ["+966 11 234 5678", "+971 4 567 8901"],
    description: "متاح 24/7 للدعم الفوري"
  }, {
    icon: Mail,
    title: "البريد الإلكتروني",
    details: ["info@sanad-legal.com", "support@sanad-legal.com"],
    description: "نرد خلال 24 ساعة"
  }, {
    icon: MapPin,
    title: "المكاتب",
    details: ["الرياض، السعودية", "دبي، الإمارات"],
    description: "مكاتب رئيسية في المنطقة"
  }, {
    icon: Clock,
    title: "ساعات العمل",
    details: ["الأحد - الخميس: 8ص - 6م", "الجمعة - السبت: 10ص - 4م"],
    description: "دعم فني متواصل"
  }];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };
  const offices = [{
    city: "الرياض",
    country: "السعودية",
    address: "حي الملك فهد، شارع الملك عبدالعزيز، مبنى سند للخدمات القانونية",
    phone: "+966 11 234 5678",
    email: "riyadh@sanad-legal.com"
  }, {
    city: "دبي",
    country: "الإمارات",
    address: "منطقة دبي المالية العالمية، برج الإمارات، الطابق 25",
    phone: "+971 4 567 8901",
    email: "dubai@sanad-legal.com"
  }];
  return <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">اتصل بنا</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              نحن هنا لمساعدتك في جميع احتياجاتك القانونية. تواصل معنا عبر أي من الطرق التالية
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">أرسل لنا رسالة</CardTitle>
                  <p className="text-muted-foreground">
                    املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
                        <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="أدخل اسمك الكامل" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">رقم الهاتف *</label>
                        <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="أدخل رقم هاتفك" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="أدخل بريدك الإلكتروني" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">الموضوع *</label>
                      <Input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="موضوع الرسالة" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">الرسالة *</label>
                      <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="اكتب رسالتك هنا..." rows={6} required />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="h-5 w-5 ml-2" />
                      إرسال الرسالة
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                          {info.details.map((detail, idx) => <p key={idx} className="text-muted-foreground mb-1">{detail}</p>)}
                          <p className="text-sm text-primary font-medium">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>;
            })}

              {/* Quick Contact */}
              <Card className="bg-gradient-to-br from-primary to-primary/90 text-white">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">استشارة فورية</h3>
                  <p className="mb-4 opacity-90">
                    هل تحتاج مساعدة قانونية عاجلة؟
                  </p>
                  <Button variant="secondary" size="lg" className="w-full">
                    تحدث مع محامي الآن
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Office Locations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">مكاتبنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offices.map((office, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-2">{office.city}، {office.country}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {office.address}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <span className="text-sm">{office.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            <span className="text-sm">{office.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              الأسئلة الشائعة حول التواصل
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2 text-blue-600">كم المدة المتوقعة للرد؟</h3>
                <p className="text-muted-foreground text-sm">
                  نرد على جميع الاستفسارات خلال 24 ساعة في أيام العمل، وخلال 48 ساعة في العطل.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-600">هل يمكنني طلب استشارة عاجلة؟</h3>
                <p className="text-muted-foreground text-sm">
                  نعم، نوفر خدمة الاستشارات العاجلة على مدار الساعة للحالات الطارئة.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-600">ما هي طرق الدفع المتاحة؟</h3>
                <p className="text-muted-foreground text-sm">
                  نقبل جميع طرق الدفع الإلكترونية والتحويلات البنكية في جميع البلدان العربية.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-600">هل المعلومات آمنة؟</h3>
                <p className="text-muted-foreground text-sm">
                  نعم، جميع المعلومات محمية بأعلى معايير الأمان والسرية القانونية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Contact;