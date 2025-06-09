
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, CheckCircle, XCircle, Clock, Users, FileText, CreditCard } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalLawyers: 0,
    pendingLawyers: 0,
    totalClients: 0,
    totalCases: 0,
    totalRevenue: 0
  });
  const [recentCases, setRecentCases] = useState<any[]>([]);
  const [pendingLawyers, setPendingLawyers] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // جلب إحصائيات المحامين
      const { data: lawyersData } = await supabase
        .from('lawyers')
        .select('registration_status');

      // جلب إحصائيات العملاء
      const { data: clientsData } = await supabase
        .from('clients')
        .select('id');

      // جلب إحصائيات القضايا
      const { data: casesData } = await supabase
        .from('legal_cases')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // جلب المحامين بانتظار الموافقة
      const { data: pendingLawyersData } = await supabase
        .from('lawyers')
        .select('*')
        .eq('registration_status', 'pending')
        .limit(5);

      if (lawyersData) {
        setStats(prev => ({
          ...prev,
          totalLawyers: lawyersData.length,
          pendingLawyers: lawyersData.filter(l => l.registration_status === 'pending').length
        }));
      }

      if (clientsData) {
        setStats(prev => ({
          ...prev,
          totalClients: clientsData.length
        }));
      }

      if (casesData) {
        setStats(prev => ({
          ...prev,
          totalCases: casesData.length
        }));
        setRecentCases(casesData);
      }

      if (pendingLawyersData) {
        setPendingLawyers(pendingLawyersData);
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const approveLawyer = async (lawyerId: string) => {
    try {
      const { error } = await supabase
        .from('lawyers')
        .update({ 
          registration_status: 'approved',
          license_verified: true
        })
        .eq('id', lawyerId);

      if (error) throw error;

      // تحديث البيانات
      loadDashboardData();
    } catch (error) {
      console.error('Error approving lawyer:', error);
    }
  };

  const rejectLawyer = async (lawyerId: string) => {
    try {
      const { error } = await supabase
        .from('lawyers')
        .update({ registration_status: 'rejected' })
        .eq('id', lawyerId);

      if (error) throw error;

      // تحديث البيانات
      loadDashboardData();
    } catch (error) {
      console.error('Error rejecting lawyer:', error);
    }
  };

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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">لوحة التحكم الرئيسية</h2>
        <p className="text-muted-foreground">نظرة عامة على أداء المنصة</p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalLawyers}</div>
            <div className="text-sm text-muted-foreground">إجمالي المحامين</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.pendingLawyers}</div>
            <div className="text-sm text-muted-foreground">طلبات بانتظار الموافقة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <div className="text-sm text-muted-foreground">إجمالي العملاء</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalCases}</div>
            <div className="text-sm text-muted-foreground">إجمالي القضايا</div>
          </CardContent>
        </Card>
      </div>

      {/* طلبات المحامين بانتظار الموافقة */}
      <Card>
        <CardHeader>
          <CardTitle>طلبات المحامين بانتظار الموافقة</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingLawyers.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              لا توجد طلبات بانتظار الموافقة
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>التخصص</TableHead>
                  <TableHead>رقم الترخيص</TableHead>
                  <TableHead>تاريخ التسجيل</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingLawyers.map((lawyer) => (
                  <TableRow key={lawyer.id}>
                    <TableCell className="font-medium">{lawyer.name}</TableCell>
                    <TableCell>{lawyer.specialty}</TableCell>
                    <TableCell>{lawyer.license_number}</TableCell>
                    <TableCell>
                      {new Date(lawyer.created_at).toLocaleDateString('ar-SA')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => approveLawyer(lawyer.id)}
                          className="text-green-600"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => rejectLawyer(lawyer.id)}
                          className="text-red-600"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* القضايا الحديثة */}
      <Card>
        <CardHeader>
          <CardTitle>القضايا الحديثة</CardTitle>
        </CardHeader>
        <CardContent>
          {recentCases.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              لا توجد قضايا حديثة
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العنوان</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الميزانية</TableHead>
                  <TableHead>التاريخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCases.map((case_) => (
                  <TableRow key={case_.id}>
                    <TableCell className="font-medium">{case_.title}</TableCell>
                    <TableCell>{case_.category}</TableCell>
                    <TableCell>{getStatusBadge(case_.status)}</TableCell>
                    <TableCell>
                      {case_.budget_min}-{case_.budget_max} ريال
                    </TableCell>
                    <TableCell>
                      {new Date(case_.created_at).toLocaleDateString('ar-SA')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
