
import { useState } from 'react';
import Layout from "@/components/Layout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminStats from "@/components/admin/AdminStats";
import AdminCharts from "@/components/admin/AdminCharts";
import LawyersManagement from "@/components/admin/LawyersManagement";
import ClientsManagement from "@/components/admin/ClientsManagement";
import ServicesManagement from "@/components/admin/ServicesManagement";
import QuickServicesManagement from "@/components/admin/QuickServicesManagement";
import CasesManagement from "@/components/admin/CasesManagement";
import PaymentsManagement from "@/components/admin/PaymentsManagement";
import ArticlesManagement from "@/components/admin/ArticlesManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";
import AdminLogin from "@/components/admin/AdminLogin";
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { admin, loading, isAuthenticated } = useAdminAuth();

  // عرض شاشة التحميل
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <div>
              <p className="text-lg font-medium">جاري التحقق من الصلاحيات...</p>
              <p className="text-sm text-muted-foreground">الرجاء الانتظار</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // إذا لم يكن المستخدم مصدقاً، عرض صفحة تسجيل الدخول
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const renderContent = () => {
    try {
      switch (activeTab) {
        case "overview":
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-primary">لوحة تحكم المدير</h1>
                <p className="text-muted-foreground mt-2">إدارة شاملة لمنصة سند للخدمات القانونية</p>
                {admin && (
                  <p className="text-sm text-gray-600 mt-1">مرحباً {admin.name} - {admin.role}</p>
                )}
              </div>
              <AdminStats />
              <AdminCharts />
            </div>
          );
        case "lawyers":
          return <LawyersManagement />;
        case "clients":
          return <ClientsManagement />;
        case "services":
          return <ServicesManagement />;
        case "quick-services":
          return <QuickServicesManagement />;
        case "cases":
          return <CasesManagement />;
        case "payments":
          return <PaymentsManagement />;
        case "articles":
          return <ArticlesManagement />;
        case "settings":
          return <SettingsManagement />;
        default:
          return (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                القسم المطلوب غير متوفر. الرجاء اختيار قسم آخر من القائمة الجانبية.
              </AlertDescription>
            </Alert>
          );
      }
    } catch (error) {
      console.error('خطأ في عرض المحتوى:', error);
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            حدث خطأ في تحميل المحتوى. الرجاء إعادة تحميل الصفحة أو المحاولة لاحقاً.
          </AlertDescription>
        </Alert>
      );
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 w-full">
        <div className="flex w-full">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="flex-1 p-4 md:p-8 overflow-x-auto">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
