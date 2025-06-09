
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, MessageCircle, Star, Clock, User, Phone, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const navigate = useNavigate();

  const recentRequests = [
    {
      id: 1,
      title: "استشارة حول عقد إيجار",
      lawyer: "د. أحمد العلي",
      status: "مكتملة",
      date: "2024-01-15",
      price: "300 ريال"
    },
    {
      id: 2,
      title: "مراجعة عقد عمل",
      lawyer: "د. فاطمة الزهراني",
      status: "قيد المراجعة",
      date: "2024-01-10",
      price: "400 ريال"
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      title: "استشارة قانونية تجارية",
      lawyer: "د. محمود الخطيب",
      date: "2024-01-20",
      time: "14:00",
      type: "فيديو"
    }
  ];

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
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">إجمالي الطلبات</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">مواعيد قادمة</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">استشارات مكتملة</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-muted-foreground">متوسط التقييم</div>
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
                    {recentRequests.map((request) => (
                      <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{request.title}</h3>
                          <Badge variant={request.status === 'مكتملة' ? 'default' : 'secondary'}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">المحامي: {request.lawyer}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{request.date}</span>
                          <span className="font-medium text-primary">{request.price}</span>
                        </div>
                      </div>
                    ))}
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
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 border rounded-lg">
                        <h3 className="font-bold mb-2">{appointment.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">المحامي: {appointment.lawyer}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </div>
                      </div>
                    ))}
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
                  <p className="text-muted-foreground text-center py-8">
                    لا توجد استشارات مكتملة حتى الآن
                  </p>
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
                        <h3 className="font-bold">محمد أحمد السعيد</h3>
                        <p className="text-muted-foreground">عميل منذ يناير 2024</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                        <p className="text-muted-foreground">mohamed@example.com</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                        <p className="text-muted-foreground">+966501234567</p>
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
