
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">س</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">سند</h3>
                <p className="text-sm opacity-80">منصة الخدمات القانونية</p>
              </div>
            </Link>
            <p className="opacity-90 mb-4 max-w-md">
              منصة إلكترونية شاملة تربط بين المحامين والعملاء في الوطن العربي، 
              نقدم خدمات قانونية موثوقة وسهلة الوصول.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 opacity-90">
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
            <ul className="space-y-2 opacity-90">
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

        <div className="border-t border-white/20 mt-8 pt-8 text-center opacity-80">
          <p>&copy; 2024 منصة سند للخدمات القانونية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
