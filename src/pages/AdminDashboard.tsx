
import { useState } from 'react';
import Layout from "@/components/Layout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminStats from "@/components/admin/AdminStats";
import AdminCharts from "@/components/admin/AdminCharts";
import LawyersManagement from "@/components/admin/LawyersManagement";
import ClientsManagement from "@/components/admin/ClientsManagement";
import ServicesManagement from "@/components/admin/ServicesManagement";
import CasesManagement from "@/components/admin/CasesManagement";
import PaymentsManagement from "@/components/admin/PaymentsManagement";
import ArticlesManagement from "@/components/admin/ArticlesManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-primary">لوحة تحكم المدير</h1>
              <p className="text-muted-foreground mt-2">إدارة شاملة لمنصة سند للخدمات القانونية</p>
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
          <div className="space-y-6">
            <AdminStats />
            <AdminCharts />
          </div>
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
