
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
    <header className="bg-gradient-to-l from-primary via-primary/95 to-primary/90 shadow-2xl border-b-2 border-secondary/30 sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo with enhanced design */}
          <Link to="/" className="flex items-center space-x-reverse space-x-4 group">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500 border-3 border-white/30 group-hover:border-white/50">
                <Shield className="text-white h-9 w-9 drop-shadow-lg" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-3 border-white animate-pulse shadow-lg"></div>
            </div>
            <div className="text-white">
              <h1 className="text-4xl font-bold bg-gradient-to-l from-white via-secondary/30 to-white bg-clip-text text-transparent drop-shadow-lg">سند</h1>
              <p className="text-sm text-white/90 font-semibold tracking-wide">منصة الخدمات القانونية الرائدة</p>
            </div>
          </Link>

          {/* Desktop Navigation with enhanced styling */}
          <nav className="hidden lg:flex items-center space-x-reverse space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="relative px-6 py-4 text-white/90 hover:text-white transition-all duration-500 font-bold text-lg group rounded-2xl hover:bg-white/15 backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                {item.label}
                <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-secondary rounded-full transition-all duration-500 group-hover:w-10 shadow-lg"></span>
              </Link>
            ))}
          </nav>

          {/* User Actions with enhanced design */}
          <div className="flex items-center space-x-reverse space-x-4">
            {/* Notifications with enhanced styling */}
            <Button variant="ghost" size="icon" className="relative hover:bg-white/15 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 rounded-xl">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-to-r from-secondary to-secondary/80 rounded-full text-xs flex items-center justify-center text-white font-bold border-2 border-white shadow-lg animate-bounce">3</span>
            </Button>
            
            {/* Enhanced action buttons */}
            <div className="hidden md:flex items-center space-x-reverse space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-3 border-white/40 text-white hover:bg-white hover:text-primary font-bold px-8 py-3 backdrop-blur-sm transition-all duration-500 hover:scale-110 rounded-xl shadow-lg hover:shadow-xl"
              >
                تسجيل الدخول
              </Button>
              <Button 
                className="bg-gradient-to-l from-secondary via-secondary/90 to-secondary/80 text-white hover:from-secondary/90 hover:to-secondary/70 font-bold px-8 py-3 shadow-2xl border-2 border-white/30 transition-all duration-500 hover:scale-110 hover:shadow-3xl rounded-xl"
                onClick={() => navigate('/lawyer-register')}
              >
                انضم كمحامي
              </Button>
            </div>

            {/* Enhanced mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-white/15 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-8 pb-8 border-t-2 border-white/30 backdrop-blur-lg">
            <nav className="flex flex-col space-y-3 mt-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-white/90 hover:text-white hover:bg-white/15 transition-all duration-500 font-bold py-4 px-6 rounded-2xl backdrop-blur-sm border-2 border-transparent hover:border-white/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-4 mt-8 pt-6 border-t-2 border-white/30">
                <Button 
                  variant="outline" 
                  className="w-full border-3 border-white/40 text-white hover:bg-white hover:text-primary font-bold backdrop-blur-sm transition-all duration-500 py-4 rounded-xl" 
                  onClick={() => navigate('/login')}
                >
                  تسجيل الدخول
                </Button>
                <Button 
                  className="w-full bg-gradient-to-l from-secondary via-secondary/90 to-secondary/80 text-white hover:from-secondary/90 hover:to-secondary/70 font-bold shadow-2xl border-2 border-white/30 transition-all duration-500 py-4 rounded-xl"
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
