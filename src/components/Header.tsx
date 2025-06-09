
import { Button } from "@/components/ui/button";
import { Bell, Menu, X, Shield, ChevronDown } from "lucide-react";
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
    <header className="relative bg-gradient-to-l from-primary via-blue-900 to-slate-900 shadow-2xl sticky top-0 z-50 backdrop-blur-xl border-b border-secondary/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-l from-primary/80 via-blue-900/90 to-slate-900/95"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-yellow-400 to-secondary"></div>
      
      <div className="relative container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo Design */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-secondary/30 to-yellow-400/30 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Main logo container */}
              <div className="relative w-14 h-14 bg-gradient-to-br from-secondary via-yellow-400 to-secondary/80 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-2 border-white/30">
                <Shield className="text-white h-7 w-7 drop-shadow-xl filter" />
                
                {/* Animated dots */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full border border-white animate-bounce delay-100"></div>
              </div>
            </div>
            
            <div className="text-white">
              <h1 className="text-3xl font-bold bg-gradient-to-l from-white via-secondary to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl tracking-wide">
                سند
              </h1>
              <p className="text-xs text-white/80 font-medium tracking-wider opacity-90">
                منصة الخدمات القانونية المتقدمة
              </p>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 shadow-xl">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 font-medium text-sm group rounded-xl hover:bg-white/15 backdrop-blur-sm"
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Animated underline */}
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-secondary to-yellow-400 rounded-full transition-all duration-300 group-hover:w-8 shadow-lg"></span>
                  
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-yellow-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                  
                  {index < navigationItems.length - 1 && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-px h-4 bg-white/20 ml-2"></div>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Enhanced User Actions */}
          <div className="flex items-center gap-4">
            {/* Enhanced Notifications */}
            <div className="relative group">
              <Button variant="ghost" size="icon" className="relative hover:bg-white/15 text-white border-2 border-white/30 hover:border-secondary/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 rounded-xl shadow-lg hover:shadow-xl">
                <Bell className="h-5 w-5" />
                
                {/* Notification badge with enhanced animation */}
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-xs flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">
                  <span className="animate-pulse">3</span>
                </span>
                
                {/* Ripple effect */}
                <div className="absolute -top-2 -right-2 h-5 w-5 bg-red-500/30 rounded-full animate-ping"></div>
              </Button>
            </div>
            
            {/* Enhanced Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-2 border-white/40 text-white hover:bg-white hover:text-primary font-medium px-6 py-2.5 backdrop-blur-sm transition-all duration-300 hover:scale-105 rounded-xl shadow-lg hover:shadow-xl hover:border-white/80"
              >
                تسجيل الدخول
              </Button>
              
              <Button 
                className="bg-gradient-to-l from-secondary via-yellow-400 to-secondary/90 text-white hover:from-secondary/90 hover:via-yellow-300 hover:to-secondary/80 font-medium px-6 py-2.5 shadow-xl border-2 border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-xl relative overflow-hidden group"
                onClick={() => navigate('/lawyer-register')}
              >
                <span className="relative z-10">انضم كمحامي</span>
                
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 to-secondary/30 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </Button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-white/15 text-white border-2 border-white/30 hover:border-secondary/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 rounded-xl shadow-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X className="h-5 w-5 rotate-180 transition-transform duration-300" />
                ) : (
                  <Menu className="h-5 w-5 transition-transform duration-300" />
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-white/20 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
            
            <nav className="flex flex-col gap-3 mt-6">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium py-3 px-4 rounded-xl backdrop-blur-sm border border-transparent hover:border-white/20 group relative overflow-hidden"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Slide-in background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-yellow-400/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300 rounded-xl"></div>
                </Link>
              ))}
              
              <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-white/20">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-white/40 text-white hover:bg-white hover:text-primary font-medium backdrop-blur-sm transition-all duration-300 py-3 rounded-xl hover:border-white/80" 
                  onClick={() => navigate('/login')}
                >
                  تسجيل الدخول
                </Button>
                
                <Button 
                  className="w-full bg-gradient-to-l from-secondary via-yellow-400 to-secondary/90 text-white hover:from-secondary/90 hover:via-yellow-300 hover:to-secondary/80 font-medium shadow-xl border-2 border-white/30 transition-all duration-300 py-3 rounded-xl relative overflow-hidden group"
                  onClick={() => navigate('/lawyer-register')}
                >
                  <span className="relative z-10">انضم كمحامي</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 to-secondary/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
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
