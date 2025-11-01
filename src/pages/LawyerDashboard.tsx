import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, Calendar, Star, TrendingUp, MessageCircle, FileText, Settings, User, Phone, Mail, MapPin, Loader2, Briefcase } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

const LawyerDashboard = () => {
  const { profile, loading } = useUserProfile();
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }
  
  const stats = [{
    title: "الإيرادات الشهرية",
    value: "12,500 ريال",
    icon: DollarSign,
    change: "+15%"
  }, {
    title: "عدد العملاء",
    value: "48",
    icon: Users,
    change: "+8%"
  }, {
    title: "الاستشارات المكتملة",
    value: "156",
    icon: MessageCircle,
    change: "+12%"
  }, {
    title: "متوسط التقييم",
    value: "4.9",
    icon: Star,
    change: "+0.2"
  }];
  
  const recentRequests = [{
    id: 1,
    title: "استشارة حول قانون الشركات",
    client: "أحمد محمد",
    type: "استشارة فورية",
    price: "500 ريال",
    status: "جديد",
    date: "منذ ساعتين"
  }, {
    id: 2,
    title: "مراجعة عقد إيجار",
    client: "فاطمة علي",
    type: "مراجعة وثائق",
    price: "300 ريال",
    status: "قيد المراجعة",
    date: "أمس"
  }];
  
  const upcomingAppointments = [{
    id: 1,
    title: "استشارة قانونية",
    client: "خالد الأحمد",
    time: "14:00",
    date: "اليوم",
    type: "فيديو"
  }, {
    id: 2,
    title: "جلسة تحكيم",
    client: "شركة النور",
    time: "10:00",
    date: "غداً",
    type: "حضوري"
  }];
  
  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary">لوحة تحكم المحامي</h1>
              <p className="text-muted-foreground">مرحباً {profile?.full_name || 'محامي'}</p>
            </div>
            <Button>
              <Settings className="h-4 w-4 ml-2" />
              إعدادات الملف الشخصي
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <TrendingUp className="h-3 w-3" />
                          <span>{stat.change}</span>
                        </div>
                      </div>
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="requests">الطلبات</TabsTrigger>
              <TabsTrigger value="appointments">المواعيد</TabsTrigger>
              <TabsTrigger value="clients">العملاء</TabsTrigger>
              <TabsTrigger value="earnings">الأرباح</TabsTrigger>
              <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>الطلبات الجديدة</CardTitle>
                  <Badge variant="secondary">{recentRequests.length} طلب جديد</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRequests.map(request => <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{request.title}</h3>
                          <Badge variant={request.status === 'جديد' ? 'default' : 'secondary'}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">العميل: {request.client}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{request.type}</span>
                            <span>{request.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-primary">{request.price}</span>
                            <Button size="sm">قبول</Button>
                          </div>
                        </div>
                      </div>)}
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
                    {upcomingAppointments.map(appointment => <div key={appointment.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{appointment.title}</h3>
                          <Badge variant="outline" className="bg-blue-800">{appointment.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">العميل: {appointment.client}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{appointment.date}</span>
                            </div>
                            <span>{appointment.time}</span>
                          </div>
                          <Button size="sm" variant="outline">تفاصيل</Button>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>العملاء</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    قائمة العملاء ستظهر هنا
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>الأرباح والإحصائيات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">12,500 ريال</div>
                      <div className="text-sm text-muted-foreground">الإيرادات الشهرية</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/5 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">3,200 ريال</div>
                      <div className="text-sm text-muted-foreground">الأرباح الأسبوعية</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">48</div>
                      <div className="text-sm text-muted-foreground">عدد العملاء</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الملف الشخصي</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Profile Card */}
                    <Card className="bg-gradient-to-br from-secondary/5 to-primary/5 border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-lg">
                            {profile?.avatar_url ? (
                              <img 
                                src={profile.avatar_url} 
                                alt={profile.full_name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <Briefcase className="h-12 w-12 text-secondary" />
                            )}
                          </div>
                          <div className="flex-1 space-y-4">
                            <div>
                              <h3 className="text-2xl font-bold text-secondary mb-1">
                                {profile?.full_name || 'غير محدد'}
                              </h3>
                              <Badge variant="secondary" className="mb-2">محامي معتمد</Badge>
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
                              <p className="font-medium text-sm break-all">{profile?.user_id || 'غير محدد'}</p>
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
                                <Badge variant="outline">{profile?.user_type === 'lawyer' ? 'محامي' : 'عميل'}</Badge>
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Professional Stats */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">الإحصائيات المهنية</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-primary/5 rounded-lg">
                            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                            <div className="text-2xl font-bold">48</div>
                            <div className="text-sm text-muted-foreground">عدد العملاء</div>
                          </div>
                          <div className="text-center p-4 bg-secondary/5 rounded-lg">
                            <MessageCircle className="h-8 w-8 text-secondary mx-auto mb-2" />
                            <div className="text-2xl font-bold">156</div>
                            <div className="text-sm text-muted-foreground">الاستشارات</div>
                          </div>
                          <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold">4.9</div>
                            <div className="text-sm text-muted-foreground">التقييم</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex gap-3">
                      <Button className="flex-1">تعديل المعلومات</Button>
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

export default LawyerDashboard;
