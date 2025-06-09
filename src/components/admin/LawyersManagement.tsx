
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
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Check, 
  X,
  Star,
  Phone,
  Mail
} from "lucide-react";

const LawyersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const lawyers = [
    {
      id: 1,
      name: "د. أحمد العلي",
      email: "ahmed.ali@email.com",
      phone: "+966501234567",
      specialty: "القانون التجاري",
      license: "LC12345",
      status: "approved",
      rating: 4.8,
      cases: 45,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "د. فاطمة الزهراني",
      email: "fatima.z@email.com",
      phone: "+966502345678",
      specialty: "قانون الأسرة",
      license: "LC12346",
      status: "pending",
      rating: 4.6,
      cases: 32,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "د. محمد السعدي",
      email: "mohammed.s@email.com",
      phone: "+966503456789",
      specialty: "القانون الجنائي",
      license: "LC12347",
      status: "approved",
      rating: 4.9,
      cases: 67,
      avatar: "/placeholder.svg"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { label: "معتمد", variant: "default" as const },
      pending: { label: "قيد المراجعة", variant: "secondary" as const },
      rejected: { label: "مرفوض", variant: "destructive" as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة المحامين</h2>
          <p className="text-muted-foreground">عرض وإدارة المحامين المسجلين في المنصة</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          إضافة محامي جديد
        </Button>
      </div>

      {/* أدوات البحث والتصفية */}
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
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 ml-2" />
                تصفية
              </Button>
              <select 
                className="px-4 py-2 border rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">جميع الحالات</option>
                <option value="approved">معتمد</option>
                <option value="pending">قيد المراجعة</option>
                <option value="rejected">مرفوض</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* جدول المحامين */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المحامين ({lawyers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المحامي</TableHead>
                <TableHead>التخصص</TableHead>
                <TableHead>رقم الترخيص</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>القضايا</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lawyers.map((lawyer) => (
                <TableRow key={lawyer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={lawyer.avatar} />
                        <AvatarFallback>{lawyer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{lawyer.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {lawyer.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {lawyer.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{lawyer.specialty}</TableCell>
                  <TableCell>
                    <span className="font-mono">{lawyer.license}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(lawyer.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{lawyer.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{lawyer.cases}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {lawyer.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="icon" className="text-green-600">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default LawyersManagement;
