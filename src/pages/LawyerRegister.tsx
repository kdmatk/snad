
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, MapPin, Award, FileText, Upload } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LawyerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    specialty: "",
    experience: "",
    licenseNumber: "",
    education: "",
    description: "",
    hourlyRate: "",
    languages: "",
    agreeToTerms: false
  });

  const specialties = [
    "القانون التجاري",
    "قانون الأسرة",
    "القانون الجنائي",
    "القانون العقاري",
    "قانون العمل",
    "القانون المالي",
    "القانون الإداري",
    "قانون الضرائب",
    "قانون الشركات",
    "القانون البحري"
  ];

  const countries = [
    "السعودية",
    "الإمارات",
    "مصر",
    "الكويت",
    "البحرين",
    "قطر",
    "عمان",
    "الأردن",
    "لبنان",
    "المغرب"
  ];

  const experienceYears = [
    "أقل من سنة",
    "1-3 سنوات",
    "3-5 سنوات",
    "5-10 سنوات",
    "10-15 سنة",
    "15-20 سنة",
    "أكثر من 20 سنة"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      alert("يرجى الموافقة على الشروط والأحكام");
      return;
    }

    console.log("Lawyer registration data:", formData);
    alert("تم تقديم طلب الانضمام بنجاح! سيتم مراجعة طلبك والرد خلال 48 ساعة");
    navigate('/login');
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">انضم كمحامي</h1>
              <p className="text-muted-foreground text-lg">
                انضم إلى منصة سند وابدأ في تقديم خدماتك القانونية لآلاف العملاء
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center">نموذج انضمام المحامين</CardTitle>
                <p className="text-muted-foreground text-center">
                  يرجى ملء جميع المعلومات المطلوبة بدقة
                </p>
              </CardHeader>

              <CardContent className="space-y-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      المعلومات الشخصية
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">الاسم الأول *</label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="الاسم الأول"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">الاسم الأخير *</label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="الاسم الأخير"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
                        <div className="relative">
                          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="البريد الإلكتروني"
                            className="pr-10"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">رقم الهاتف *</label>
                        <div className="relative">
                          <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="رقم الهاتف"
                            className="pr-10"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">البلد *</label>
                        <Select value={formData.country} onValueChange={(value) => handleSelectChange('country', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر البلد" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">المدينة *</label>
                        <div className="relative">
                          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="المدينة"
                            className="pr-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      المعلومات المهنية
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">التخصص الرئيسي *</label>
                        <Select value={formData.specialty} onValueChange={(value) => handleSelectChange('specialty', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر التخصص" />
                          </SelectTrigger>
                          <SelectContent>
                            {specialties.map((specialty) => (
                              <SelectItem key={specialty} value={specialty}>
                                {specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">سنوات الخبرة *</label>
                        <Select value={formData.experience} onValueChange={(value) => handleSelectChange('experience', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر سنوات الخبرة" />
                          </SelectTrigger>
                          <SelectContent>
                            {experienceYears.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">رقم الترخيص *</label>
                        <Input
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          placeholder="رقم ترخيص المحاماة"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">الأجر بالساعة (ريال) *</label>
                        <Input
                          name="hourlyRate"
                          type="number"
                          value={formData.hourlyRate}
                          onChange={handleInputChange}
                          placeholder="مثال: 500"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">المؤهلات العلمية *</label>
                      <Textarea
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        placeholder="اذكر المؤهلات العلمية والشهادات المحصلة..."
                        rows={3}
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">اللغات المتقنة</label>
                      <Input
                        name="languages"
                        value={formData.languages}
                        onChange={handleInputChange}
                        placeholder="مثال: العربية، الإنجليزية، الفرنسية"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">نبذة عنك *</label>
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="اكتب نبذة مختصرة عن خبرتك وتخصصاتك..."
                        rows={4}
                        required
                      />
                    </div>
                  </div>

                  {/* Documents Upload */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      الوثائق المطلوبة
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">ترخيص المحاماة</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, PDF حتى 5MB</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          رفع الملف
                        </Button>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">الشهادة الجامعية</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, PDF حتى 5MB</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          رفع الملف
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="rounded mt-1"
                      required
                    />
                    <label className="text-sm text-muted-foreground">
                      أوافق على{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        الشروط والأحكام
                      </Link>
                      {" "}و{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        سياسة الخصوصية
                      </Link>
                      {" "}وأقر بصحة جميع المعلومات المقدمة
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    تقديم طلب الانضمام
                  </Button>
                </form>

                <div className="text-center space-y-4 pt-6 border-t">
                  <p className="text-muted-foreground">
                    لديك حساب بالفعل؟{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      تسجيل الدخول
                    </Link>
                  </p>
                  
                  <p className="text-muted-foreground">
                    تريد التسجيل كعميل؟{" "}
                    <Link to="/register" className="text-secondary hover:underline font-medium">
                      إنشاء حساب عميل
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LawyerRegister;
