
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  UserCheck, 
  Briefcase, 
  Scale, 
  CreditCard, 
  FileText, 
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: "الرئيسية", value: "overview", badge: null },
    { icon: UserCheck, label: "المحامون", value: "lawyers", badge: "12" },
    { icon: Users, label: "العملاء", value: "clients", badge: null },
    { icon: Briefcase, label: "الخدمات", value: "services", badge: null },
    { icon: Scale, label: "القضايا", value: "cases", badge: "5" },
    { icon: CreditCard, label: "المدفوعات", value: "payments", badge: "3" },
    { icon: FileText, label: "المقالات", value: "articles", badge: null },
    { icon: Settings, label: "الإعدادات", value: "settings", badge: null },
  ];

  return (
    <div className={`bg-white border-l border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold text-primary">سند</h2>
              <p className="text-sm text-muted-foreground">لوحة التحكم</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.value}
                variant="ghost"
                className={`w-full justify-start h-12 ${isCollapsed ? 'px-2' : 'px-4'}`}
              >
                <IconComponent className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'ml-3'}`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-right">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="mr-2">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t">
          <Button
            variant="ghost"
            className={`w-full justify-start h-12 text-red-600 hover:text-red-700 hover:bg-red-50 ${isCollapsed ? 'px-2' : 'px-4'}`}
          >
            <LogOut className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'ml-3'}`} />
            {!isCollapsed && <span className="flex-1 text-right">تسجيل الخروج</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
