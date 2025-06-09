
import { Button } from "@/components/ui/button";
import { Search, User, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-primary/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-reverse space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">س</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">سند</h1>
              <p className="text-xs text-muted-foreground">منصة الخدمات القانونية</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">الرئيسية</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">المحامين</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">الخدمات</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">من نحن</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">اتصل بنا</a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-reverse space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline">تسجيل الدخول</Button>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              انضم كمحامي
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
