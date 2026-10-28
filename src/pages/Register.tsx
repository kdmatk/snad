import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const lawyerReturn = params.get("redirect") === "/lawyer-register";
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

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
    "المغرب",
    "تونس",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "خطأ",
        description: "يرجى الموافقة على الشروط والأحكام",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // تسجيل المستخدم في Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            country: formData.country,
            city: formData.city,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user && lawyerReturn) {
        toast({
          title: data.session ? "تم إنشاء الحساب" : "تحقق من بريدك الإلكتروني",
          description: data.session
            ? "يمكنك الآن استكمال طلب المحامي."
            : "فعّل حسابك من البريد ثم سجّل الدخول لاستكمال طلب المحامي.",
        });
        navigate(
          data.session
            ? "/lawyer-register"
            : "/login?redirect=/lawyer-register",
        );
        return;
      }
      if (data.user) {
        // إنشاء ملف العميل في جدول العملاء
        const { error: profileError } = await supabase.from("clients").insert({
          id: data.user.id,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
        });

        if (profileError) {
          console.error("Profile creation error:", profileError);
          // المتابعة حتى لو فشل إنشاء الملف الشخصي
        }

        toast({
          title: "تم إنشاء الحساب بنجاح!",
          description: "مرحباً بك في منصة سند القانونية",
        });

        navigate("/client-dashboard");
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      toast({
        title: "خطأ في التسجيل",
        description: error instanceof Error ? error.message : "فشل في إنشاء الحساب",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">س</span>
                </div>
                <CardTitle className="text-2xl text-primary">
                  إنشاء حساب جديد
                </CardTitle>
                <p className="text-muted-foreground">
                  انضم إلى منصة سند واحصل على خدمات قانونية متميزة
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        الاسم الأول *
                      </label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="الاسم الأول"
                          className="pr-10"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        الاسم الأخير *
                      </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="الاسم الأخير"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        البريد الإلكتروني *
                      </label>
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
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        رقم الهاتف *
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="رقم الهاتف"
                          className="pr-10"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        البلد *
                      </label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          handleSelectChange("country", value)
                        }
                        disabled={loading}
                      >
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
                      <label className="block text-sm font-medium mb-2">
                        المدينة *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="المدينة"
                          className="pr-10"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        كلمة المرور *
                      </label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="كلمة المرور"
                          className="pr-10 pl-10"
                          required
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          disabled={loading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        تأكيد كلمة المرور *
                      </label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="تأكيد كلمة المرور"
                          className="pr-10 pl-10"
                          required
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          disabled={loading}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
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
                      disabled={loading}
                    />
                    <label className="text-sm text-muted-foreground">
                      أوافق على{" "}
                      <Link
                        to="/terms"
                        className="text-primary hover:underline"
                      >
                        الشروط والأحكام
                      </Link>{" "}
                      و{" "}
                      <Link
                        to="/privacy"
                        className="text-primary hover:underline"
                      >
                        سياسة الخصوصية
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري إنشاء الحساب...
                      </>
                    ) : (
                      "إنشاء الحساب"
                    )}
                  </Button>
                </form>

                <Separator />

                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    لديك حساب بالفعل؟{" "}
                    <Link
                      to={
                        lawyerReturn
                          ? "/login?redirect=/lawyer-register"
                          : "/login"
                      }
                      className="text-primary hover:underline font-medium"
                    >
                      تسجيل الدخول
                    </Link>
                  </p>

                  <p className="text-muted-foreground">
                    هل أنت محامي؟{" "}
                    <Link
                      to="/lawyer-register"
                      className="text-secondary hover:underline font-medium"
                    >
                      انضم كمحامي
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

export default Register;
