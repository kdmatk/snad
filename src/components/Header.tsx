
import { Button } from "@/components/ui/button";
import { Bell, Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { label: "الرئيسية", href: "/" },
    { label: "المحامين", href: "/lawyers" },
    { label: "الخدمات", href: "/services" },
    { label: "الخدمات السريعة", href: "/quick-services" },
    { label: "من نحن", href: "/about" },
    { label: "اتصل بنا", href: "/contact" }
  ];

  return (
    <header className="bg-gradient-to-l from-primary via-primary/95 to-primary/90 shadow-xl border-b border-primary/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo with enhanced design */}
          <Link to="/" className="flex items-center space-x-reverse space-x-4 group">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300 border-2 border-white/20">
                <Shield className="text-white h-8 w-8" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold bg-gradient-to-l from-white to-secondary/20 bg-clip-text text-transparent">سند</h1>
              <p className="text-sm text-white/80 font-medium">منصة الخدمات القانونية الرائدة</p>
            </div>
          </Link>

          {/* Desktop Navigation with enhanced styling */}
          <nav className="hidden lg:flex items-center space-x-reverse space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="relative px-6 py-3 text-white/90 hover:text-white transition-all duration-300 font-semibold text-lg group rounded-xl hover:bg-white/10 backdrop-blur-sm"
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-secondary rounded-full transition-all duration-300 group-hover:w-8"></span>
              </Link>
            ))}
          </nav>

          {/* User Actions with enhanced design */}
          <div className="flex items-center space-x-reverse space-x-4">
            {/* Notifications with enhanced styling */}
            <Button variant="ghost" size="icon" className="relative hover:bg-white/10 text-white border border-white/20 backdrop-blur-sm">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary rounded-full text-xs flex items-center justify-center text-white font-bold border-2 border-white">3</span>
            </Button>
            
            {/* Enhanced action buttons */}
            <div className="hidden md:flex items-center space-x-reverse space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-2 border-white/30 text-white hover:bg-white hover:text-primary font-semibold px-6 py-2 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                تسجيل الدخول
              </Button>
              <Button 
                className="bg-gradient-to-l from-secondary via-secondary/90 to-secondary/80 text-white hover:from-secondary/90 hover:to-secondary/70 font-bold px-6 py-2 shadow-xl border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => navigate('/lawyer-register')}
              >
                انضم كمحامي
              </Button>
            </div>

            {/* Enhanced mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-white/10 text-white border border-white/20 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-white/20 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2 mt-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-semibold py-3 px-4 rounded-xl backdrop-blur-sm border border-transparent hover:border-white/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 mt-6 pt-4 border-t border-white/20">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-white/30 text-white hover:bg-white hover:text-primary font-semibold backdrop-blur-sm transition-all duration-300" 
                  onClick={() => navigate('/login')}
                >
                  تسجيل الدخول
                </Button>
                <Button 
                  className="w-full bg-gradient-to-l from-secondary via-secondary/90 to-secondary/80 text-white hover:from-secondary/90 hover:to-secondary/70 font-bold shadow-xl border border-white/20 transition-all duration-300"
                  onClick={() => navigate('/lawyer-register')}
                >
                  انضم كمحامي
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
