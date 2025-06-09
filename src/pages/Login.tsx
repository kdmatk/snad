
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically authenticate with your backend
    console.log("Login attempt:", formData);
    alert("تم تسجيل الدخول بنجاح!");
    navigate('/client-dashboard');
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">س</span>
                </div>
                <CardTitle className="text-2xl text-primary">تسجيل الدخول</CardTitle>
                <p className="text-muted-foreground">مرحباً بك في منصة سند القانونية</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="أدخل بريدك الإلكتروني"
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">كلمة المرور</label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="أدخل كلمة المرور"
                        className="pr-10 pl-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>تذكرني</span>
                    </label>
                    <Link to="/forgot-password" className="text-primary hover:underline">
                      نسيت كلمة المرور؟
                    </Link>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    تسجيل الدخول
                  </Button>
                </form>

                <Separator />

                <div className="text-center">
                  <p className="text-muted-foreground mb-4">أو سجل الدخول باستخدام</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" size="lg">
                      Google
                    </Button>
                    <Button variant="outline" size="lg">
                      Apple
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    ليس لديك حساب؟{" "}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      إنشاء حساب جديد
                    </Link>
                  </p>
                  
                  <p className="text-muted-foreground">
                    هل أنت محامي؟{" "}
                    <Link to="/lawyer-register" className="text-secondary hover:underline font-medium">
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

export default Login;
