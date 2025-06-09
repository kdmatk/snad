
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Ban, 
  CheckCircle,
  Phone,
  Mail,
  Calendar
} from "lucide-react";

const ClientsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 1,
      name: "أحمد محمد الأحمد",
      email: "ahmed.m@email.com",
      phone: "+966501234567",
      joinDate: "2024-01-15",
      consultations: 8,
      totalSpent: 2400,
      status: "active",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "فاطمة علي السعد",
      email: "fatima.a@email.com",
      phone: "+966502345678",
      joinDate: "2024-02-20",
      consultations: 5,
      totalSpent: 1200,
      status: "active",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "خالد سعد العتيبي",
      email: "khalid.s@email.com",
      phone: "+966503456789",
      joinDate: "2024-01-08",
      consultations: 12,
      totalSpent: 3600,
      status: "blocked",
      avatar: "/placeholder.svg"
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
    } else if (status === 'blocked') {
      return <Badge variant="destructive">محظور</Badge>;
    }
    return <Badge variant="secondary">غير محدد</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة العملاء</h2>
          <p className="text-muted-foreground">عرض وإدارة العملاء المسجلين في المنصة</p>
        </div>
      </div>

      {/* أدوات البحث */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث بالاسم أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              تصفية
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">1,205</div>
            <div className="text-sm text-muted-foreground">إجمالي العملاء</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">1,180</div>
            <div className="text-sm text-muted-foreground">العملاء النشطين</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">25</div>
            <div className="text-sm text-muted-foreground">العملاء المحظورين</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-muted-foreground">عملاء جدد هذا الشهر</div>
          </CardContent>
        </Card>
      </div>

      {/* جدول العملاء */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة العملاء ({clients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العميل</TableHead>
                <TableHead>تاريخ التسجيل</TableHead>
                <TableHead>الاستشارات</TableHead>
                <TableHead>إجمالي الإنفاق</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={client.avatar} />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {client.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {client.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(client.joinDate).toLocaleDateString('ar-SA')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{client.consultations}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">{client.totalSpent} ريال</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {client.status === 'active' ? (
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Ban className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="text-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsManagement;
