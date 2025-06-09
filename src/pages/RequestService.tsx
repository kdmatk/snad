import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileText, Clock, DollarSign, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClientData } from "@/hooks/useClientData";
import { useToast } from "@/hooks/use-toast";

const RequestService = () => {
  const navigate = useNavigate();
  const { createServiceRequest } = useClientData();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    serviceType: "",
    specialty: "",
    urgency: "",
    budget: "",
    title: "",
    description: "",
    preferredLawyer: "",
    contactMethod: "",
    phone: "",
    email: ""
  });

  const serviceTypes = [
    "استشارة قانونية",
    "التمثيل القضائي",
    "صياغة عقود",
    "مراجعة وثائق",
    "التحكيم والوساطة",
    "خدمات قانونية أخرى"
  ];

  const specialties = [
    "القانون التجاري",
    "قانون الأسرة",
    "القانون الجنائي",
    "القانون العقاري",
    "قانون العمل",
    "القانون المالي",
    "القانون الإداري",
    "قانون الضرائب"
  ];

  const urgencyLevels = [
    { value: "urgent", label: "عاجل (خلال 24 ساعة)", extra: "+50% من التكلفة" },
    { value: "normal", label: "عادي (خلال 3-5 أيام)", extra: "التكلفة العادية" },
    { value: "flexible", label: "مرن (خلال أسبوع)", extra: "-10% من التكلفة" }
  ];

  const budgetRanges = [
    "أقل من 500 ريال",
    "500 - 1000 ريال",
    "1000 - 2000 ريال",
    "2000 - 5000 ريال",
    "أكثر من 5000 ريال",
    "مفتوح للتفاوض"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Service request:", formData);
      
      await createServiceRequest(formData);
      
      toast({
        title: "تم تقديم الطلب بنجاح!",
        description: "سيتم التواصل معك قريباً من قبل المحامين المتخصصين.",
      });
      
      navigate('/client-dashboard');
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "خطأ في تقديم الطلب",
        description: "حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">طلب خدمة قانونية</h1>
              <p className="text-muted-foreground text-lg">
                احصل على أفضل الخدمات القانونية من محامين متخصصين
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl">تفاصيل الطلب</CardTitle>
                <p className="text-muted-foreground">
                  يرجى ملء جميع المعلومات لضمان تقديم أفضل خدمة
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">نوع الخدمة المطلوبة *</label>
                    <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange('serviceType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Specialty */}
                  <div>
                    <label className="block text-sm font-medium mb-2">التخصص المطلوب *</label>
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

                  {/* Service Details */}
                  <div>
                    <label className="block text-sm font-medium mb-2">عنوان الطلب *</label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="عنوان مختصر للطلب"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">وصف تفصيلي للطلب *</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="اشرح تفاصيل الطلب والمساعدة المطلوبة..."
                      rows={5}
                      required
                    />
                  </div>

                  {/* Urgency Level */}
                  <div>
                    <label className="block text-sm font-medium mb-4">مستوى الأولوية *</label>
                    <RadioGroup value={formData.urgency} onValueChange={(value) => handleSelectChange('urgency', value)}>
                      {urgencyLevels.map((level) => (
                        <div key={level.value} className="flex items-start space-x-reverse space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value={level.value} id={level.value} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={level.value} className="font-medium cursor-pointer">
                              {level.label}
                            </Label>
                            <p className="text-sm text-muted-foreground">{level.extra}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium mb-2">الميزانية المقترحة *</label>
                    <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نطاق الميزانية" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-sm font-medium mb-4">طريقة التواصل المفضلة *</label>
                    <RadioGroup value={formData.contactMethod} onValueChange={(value) => handleSelectChange('contactMethod', value)}>
                      <div className="flex items-center space-x-reverse space-x-2">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone">هاتف</Label>
                      </div>
                      <div className="flex items-center space-x-reverse space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <Label htmlFor="email">بريد إلكتروني</Label>
                      </div>
                      <div className="flex items-center space-x-reverse space-x-2">
                        <RadioGroupItem value="whatsapp" id="whatsapp" />
                        <Label htmlFor="whatsapp">واتساب</Label>
                      </div>
                      <div className="flex items-center space-x-reverse space-x-2">
                        <RadioGroupItem value="platform" id="platform" />
                        <Label htmlFor="platform">من خلال المنصة</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">رقم الهاتف *</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="رقم الهاتف"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="البريد الإلكتروني"
                        required
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2">إرفاق ملفات (اختياري)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium">رفع المستندات ذات الصلة</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, JPG, PNG حتى 10MB</p>
                      <Button variant="outline" size="sm" className="mt-2" type="button">
                        اختيار الملفات
                      </Button>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <Card className="bg-primary/5">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        ملخص الطلب
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>نوع الخدمة:</span>
                          <span className="font-medium">{formData.serviceType || "لم يتم التحديد"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>التخصص:</span>
                          <span className="font-medium">{formData.specialty || "لم يتم التحديد"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الميزانية:</span>
                          <span className="font-medium">{formData.budget || "لم يتم التحديد"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الأولوية:</span>
                          <span className="font-medium">
                            {formData.urgency === 'urgent' ? 'عاجل' : 
                             formData.urgency === 'normal' ? 'عادي' : 
                             formData.urgency === 'flexible' ? 'مرن' : 'لم يتم التحديد'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'جاري التقديم...' : 'تقديم الطلب'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequestService;
