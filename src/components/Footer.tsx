
const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">س</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">سند</h3>
                <p className="text-sm opacity-80">منصة الخدمات القانونية</p>
              </div>
            </div>
            <p className="opacity-90 mb-4 max-w-md">
              منصة إلكترونية شاملة تربط بين المحامين والعملاء في الوطن العربي، 
              نقدم خدمات قانونية موثوقة وسهلة الوصول.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 opacity-90">
              <li><a href="#" className="hover:text-secondary transition-colors">من نحن</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">المحامين</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">الخدمات</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">مركز المساعدة</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">قانوني</h4>
            <ul className="space-y-2 opacity-90">
              <li><a href="#" className="hover:text-secondary transition-colors">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">اتفاقية الاستخدام</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">اتصل بنا</a></li>
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
