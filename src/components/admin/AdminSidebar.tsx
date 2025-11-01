
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdminAuth } from '@/hooks/useAdminAuth';
import {
  BarChart3,
  Users,
  UserCheck,
  Briefcase,
  Scale,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Shield
} from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const { admin, logoutAdmin } = useAdminAuth();

  const menuItems = [
    { id: "overview", label: "نظرة عامة", icon: BarChart3 },
    { id: "lawyers", label: "المحامين", icon: UserCheck, badge: "جديد" },
    { id: "clients", label: "العملاء", icon: Users },
    { id: "services", label: "الخدمات", icon: Briefcase },
    { id: "cases", label: "القضايا", icon: Scale },
    { id: "payments", label: "المدفوعات", icon: CreditCard },
    { id: "articles", label: "المقالات", icon: FileText },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } catch (error) {
      console.error('فشل في تسجيل الخروج:', error);
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r min-h-screen flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg truncate">لوحة التحكم</h2>
            <p className="text-sm text-gray-600 truncate">
              {admin?.name || 'مدير النظام'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start text-right h-12 ${
                isActive 
                  ? "bg-primary text-white" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="ml-3 h-5 w-5 flex-shrink-0" />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="mr-2 text-xs flex-shrink-0">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      <div className="p-4 border-t">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  {admin?.role || 'مدير'}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {admin?.email || 'غير محدد'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 flex-shrink-0"
                title="تسجيل الخروج"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSidebar;
