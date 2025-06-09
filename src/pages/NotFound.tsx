
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, Search, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">الصفحة غير موجودة</h2>
              <p className="text-muted-foreground text-lg mb-8">
                عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white p-6 h-auto flex flex-col gap-2"
                onClick={() => navigate('/')}
              >
                <Home className="h-8 w-8" />
                <span>العودة للرئيسية</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white p-6 h-auto flex flex-col gap-2"
                onClick={() => navigate('/lawyers')}
              >
                <Search className="h-8 w-8" />
                <span>البحث عن محامين</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white p-6 h-auto flex flex-col gap-2"
                onClick={() => navigate('/contact')}
              >
                <Phone className="h-8 w-8" />
                <span>اتصل بنا</span>
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">أو جرب هذه الصفحات:</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="link" onClick={() => navigate('/services')}>
                  الخدمات
                </Button>
                <Button variant="link" onClick={() => navigate('/about')}>
                  من نحن
                </Button>
                <Button variant="link" onClick={() => navigate('/faq')}>
                  الأسئلة الشائعة
                </Button>
                <Button variant="link" onClick={() => navigate('/instant-consultation')}>
                  استشارة فورية
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
