
import { Button } from "@/components/ui/button";
import { Bell, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: "الرئيسية", href: "#home" },
    { label: "المحامين", href: "#lawyers" },
    { label: "الخدمات", href: "#services" },
    { label: "من نحن", href: "#about" },
    { label: "اتصل بنا", href: "#contact" }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-primary/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-reverse space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">س</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">سند</h1>
              <p className="text-xs text-muted-foreground">منصة الخدمات القانونية</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-reverse space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-secondary rounded-full text-xs"></span>
            </Button>
            
            <div className="hidden md:flex items-center space-x-reverse space-x-3">
              <Button variant="outline">تسجيل الدخول</Button>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                انضم كمحامي
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 mt-4">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 mt-4">
                <Button variant="outline" className="w-full">تسجيل الدخول</Button>
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
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
