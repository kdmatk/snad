import { Link } from "react-router-dom";
import { Scale } from "lucide-react";
const Footer = () => {
  return <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 text-white py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-slate-800/60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-lg">
                <Scale className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-right">سند</h3>
                <p className="text-sm text-slate-300 text-right">منصة الخدمات القانونية</p>
              </div>
            </Link>
            <p className="text-slate-300 mb-4 max-w-md">
              منصة إلكترونية شاملة تربط بين المحامين والعملاء في الوطن العربي، 
              نقدم خدمات قانونية موثوقة وسهلة الوصول.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/about" className="hover:text-secondary transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/lawyers" className="hover:text-secondary transition-colors">
                  المحامين
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-secondary transition-colors">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-secondary transition-colors">
                  مركز المساعدة
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">قانوني</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/terms" className="hover:text-secondary transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-secondary transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/legal-library" className="hover:text-secondary transition-colors">
                  المكتبة القانونية
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-slate-300">
          <p>منصة سند للخدمات القانونية. جميع الحقوق محفوظة © 2025 </p>
        </div>
      </div>
    </footer>;
};
export default Footer;