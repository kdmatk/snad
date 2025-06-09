
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, MessageCircle, Star, Clock, User, Phone, Plus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClientData } from "@/hooks/useClientData";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { profile, requests, consultations, loading } = useClientData();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; variant: any } } = {
      open: { label: 'مفتوحة', variant: 'default' },
      assigned: { label: 'معينة', variant: 'secondary' },
      in_progress: { label: 'قيد التنفيذ', variant: 'default' },
      completed: { label: 'مكتملة', variant: 'default' },
      cancelled: { label: 'ملغية', variant: 'destructive' }
    };
    
    const statusInfo = statusMap[status] || { label: status, variant: 'secondary' };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary">لوحة التحكم</h1>
            <Button onClick={() => navigate('/request-service')}>
              <Plus className="h-4 w-4 ml-2" />
              طلب خدمة جديدة
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{requests.length}</div>
                <div className="text-sm text-muted-foreground">إجمالي الطلبات</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold">{consultations.filter(c => c.status === 'pending').length}</div>
                <div className="text-sm text-muted-foreground">مواعيد قادمة</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{consultations.filter(c => c.status === 'completed').length}</div>
                <div className="text-sm text-muted-foreground">استشارات مكتملة</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{profile?.total_spent || 0}</div>
                <div className="text-sm text-muted-foreground">إجمالي الإنفاق (ريال)</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="requests">طلباتي</TabsTrigger>
              <TabsTrigger value="appointments">المواعيد</TabsTrigger>
              <TabsTrigger value="consultations">الاستشارات</TabsTrigger>
              <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>الطلبات الحديثة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        لا توجد طلبات حتى الآن
                      </p>
                    ) : (
                      requests.map((request) => (
                        <div key={request.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold">{request.title}</h3>
                            {getStatusBadge(request.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            الفئة: {request.category}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {new Date(request.created_at).toLocaleDateString('ar-SA')}
                            </span>
                            <span className="font-medium text-primary">
                              {request.budget_min}-{request.budget_max} ريال
                            </span>
                          </div>
                          {request.lawyer && (
                            <p className="text-sm text-green-600 mt-2">
                              المحامي المعين: {request.lawyer.name}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>المواعيد القادمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {consultations.filter(c => c.status === 'pending').length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        لا توجد مواعيد قادمة
                      </p>
                    ) : (
                      consultations
                        .filter(c => c.status === 'pending')
                        .map((consultation) => (
                          <div key={consultation.id} className="p-4 border rounded-lg">
                            <h3 className="font-bold mb-2">{consultation.legal_services?.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              المحامي: {consultation.lawyers?.name}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(consultation.created_at).toLocaleDateString('ar-SA')}</span>
                              </div>
                              <Badge variant="outline">{consultation.type}</Badge>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="consultations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>الاستشارات السابقة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {consultations.filter(c => c.status === 'completed').length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        لا توجد استشارات مكتملة حتى الآن
                      </p>
                    ) : (
                      consultations
                        .filter(c => c.status === 'completed')
                        .map((consultation) => (
                          <div key={consultation.id} className="p-4 border rounded-lg">
                            <h3 className="font-bold mb-2">{consultation.legal_services?.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              المحامي: {consultation.lawyers?.name}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <span>{new Date(consultation.created_at).toLocaleDateString('ar-SA')}</span>
                              {consultation.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  <span>{consultation.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>الملف الشخصي</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">{profile?.name || 'غير محدد'}</h3>
                        <p className="text-muted-foreground">
                          عميل منذ {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('ar-SA') : 'غير محدد'}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                        <p className="text-muted-foreground">{profile?.email || 'غير محدد'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                        <p className="text-muted-foreground">{profile?.phone || 'غير محدد'}</p>
                      </div>
                    </div>
                    <Button variant="outline">تعديل الملف الشخصي</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
