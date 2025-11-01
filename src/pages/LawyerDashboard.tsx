import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, Calendar, Star, TrendingUp, MessageCircle, FileText, Settings } from "lucide-react";
const LawyerDashboard = () => {
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
  return <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary">لوحة تحكم المحامي</h1>
              <p className="text-muted-foreground">مرحباً د. أحمد العلي</p>
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
            return <Card key={index}>
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
                </Card>;
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">الاسم</label>
                        <p className="text-muted-foreground">د. أحمد محمد العلي</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">التخصص</label>
                        <p className="text-muted-foreground">القانون التجاري</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                        <p className="text-muted-foreground">ahmed.ali@example.com</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                        <p className="text-muted-foreground">+966501234567</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button>تعديل المعلومات</Button>
                      <Button variant="outline">تغيير كلمة المرور</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>;
};
export default LawyerDashboard;