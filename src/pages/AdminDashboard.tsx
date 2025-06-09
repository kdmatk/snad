
import Layout from "@/components/Layout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminStats from "@/components/admin/AdminStats";
import AdminCharts from "@/components/admin/AdminCharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LawyersManagement from "@/components/admin/LawyersManagement";
import ClientsManagement from "@/components/admin/ClientsManagement";
import ServicesManagement from "@/components/admin/ServicesManagement";
import CasesManagement from "@/components/admin/CasesManagement";
import PaymentsManagement from "@/components/admin/PaymentsManagement";
import ArticlesManagement from "@/components/admin/ArticlesManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* الشريط الجانبي */}
          <AdminSidebar />
          
          {/* المحتوى الرئيسي */}
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary">لوحة تحكم المدير</h1>
                <p className="text-muted-foreground mt-2">إدارة شاملة لمنصة سند للخدمات القانونية</p>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-8 mb-8">
                  <TabsTrigger value="overview">الرئيسية</TabsTrigger>
                  <TabsTrigger value="lawyers">المحامون</TabsTrigger>
                  <TabsTrigger value="clients">العملاء</TabsTrigger>
                  <TabsTrigger value="services">الخدمات</TabsTrigger>
                  <TabsTrigger value="cases">القضايا</TabsTrigger>
                  <TabsTrigger value="payments">المدفوعات</TabsTrigger>
                  <TabsTrigger value="articles">المقالات</TabsTrigger>
                  <TabsTrigger value="settings">الإعدادات</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <AdminStats />
                  <AdminCharts />
                </TabsContent>

                <TabsContent value="lawyers">
                  <LawyersManagement />
                </TabsContent>

                <TabsContent value="clients">
                  <ClientsManagement />
                </TabsContent>

                <TabsContent value="services">
                  <ServicesManagement />
                </TabsContent>

                <TabsContent value="cases">
                  <CasesManagement />
                </TabsContent>

                <TabsContent value="payments">
                  <PaymentsManagement />
                </TabsContent>

                <TabsContent value="articles">
                  <ArticlesManagement />
                </TabsContent>

                <TabsContent value="settings">
                  <SettingsManagement />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
