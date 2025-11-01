import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, MessageCircle, Star, Clock, User, Phone, Plus, Loader2, Mail, MapPin, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClientData } from "@/hooks/useClientData";
import { useUserProfile } from "@/hooks/useUserProfile";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { requests, consultations, loading: dataLoading } = useClientData();
  const { profile, loading: profileLoading } = useUserProfile();

  const loading = dataLoading || profileLoading;

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
            <div className="flex gap-2">
              <Button onClick={() => navigate('/legal-auctions')} variant="outline">
                <Gavel className="h-4 w-4 ml-2" />
                المزادات القانونية
              </Button>
              <Button onClick={() => navigate('/request-service')}>
                <Plus className="h-4 w-4 ml-2" />
                طلب خدمة جديدة
              </Button>
            </div>
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
                <div className="text-2xl font-bold">{consultations.filter(c => c.rating).length}</div>
                <div className="text-sm text-muted-foreground">تقييمات مكتملة</div>
              </CardContent>
            </Card>
          </div>

          {/* المزادات القانونية - بطاقة إعلانية */}
          <Card className="mb-8 bg-gradient-to-l from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Gavel className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">نظام المزادات القانونية الذكي</h3>
                  <p className="text-muted-foreground mb-4">
                    احصل على أفضل العروض من المحامين! يتم ترتيب العروض تلقائياً حسب نظام التقييم الذكي (السعر 40% + التقييم 35% + السرعة 15% + الخبرة 10%)
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={() => navigate('/legal-auctions')} className="bg-primary">
                      تصفح المزادات
                    </Button>
                    <Button onClick={() => navigate('/request-service')} variant="outline">
                      إنشاء مزاد جديد
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  <div className="space-y-6">
                    {/* Profile Card */}
                    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-lg">
                            {profile?.avatar_url ? (
                              <img 
                                src={profile.avatar_url} 
                                alt={profile.full_name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <User className="h-12 w-12 text-primary" />
                            )}
                          </div>
                          <div className="flex-1 space-y-4">
                            <div>
                              <h3 className="text-2xl font-bold text-primary mb-1">
                                {profile?.full_name || 'غير محدد'}
                              </h3>
                              <p className="text-muted-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                عميل منذ {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long' }) : 'غير محدد'}
                              </p>
                            </div>
                            
                            {profile?.bio && (
                              <p className="text-muted-foreground bg-white/50 p-3 rounded-lg">
                                {profile.bio}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">معلومات الاتصال</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-muted-foreground mb-1">البريد الإلكتروني</label>
                              <p className="font-medium">{profile?.user_id || 'غير محدد'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                              <Phone className="h-5 w-5 text-secondary" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-muted-foreground mb-1">رقم الهاتف</label>
                              <p className="font-medium">{profile?.phone || 'غير محدد'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                            <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                              <MapPin className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-muted-foreground mb-1">المدينة</label>
                              <p className="font-medium">{profile?.city || 'غير محدد'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-muted-foreground mb-1">نوع الحساب</label>
                              <p className="font-medium">
                                <Badge variant="outline">{profile?.user_type === 'client' ? 'عميل' : 'محامي'}</Badge>
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Statistics */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">الإحصائيات</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-primary/5 rounded-lg">
                            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                            <div className="text-2xl font-bold">{requests.length}</div>
                            <div className="text-sm text-muted-foreground">إجمالي الطلبات</div>
                          </div>
                          <div className="text-center p-4 bg-secondary/5 rounded-lg">
                            <MessageCircle className="h-8 w-8 text-secondary mx-auto mb-2" />
                            <div className="text-2xl font-bold">{consultations.length}</div>
                            <div className="text-sm text-muted-foreground">الاستشارات</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold">{consultations.filter(c => c.status === 'completed').length}</div>
                            <div className="text-sm text-muted-foreground">مكتملة</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex gap-3">
                      <Button className="flex-1">تعديل الملف الشخصي</Button>
                      <Button variant="outline" className="flex-1">تغيير كلمة المرور</Button>
                    </div>
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
