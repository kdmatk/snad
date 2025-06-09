import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Edit, Trash2, Clock, DollarSign, ToggleLeft, ToggleRight } from "lucide-react";
const ServicesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const services = [{
    id: 1,
    name: "استشارة قانونية عامة",
    category: "عام",
    price: 100,
    duration: 30,
    isActive: true,
    bookings: 145
  }, {
    id: 2,
    name: "استشارة قانون الأسرة",
    category: "أسرة",
    price: 150,
    duration: 45,
    isActive: true,
    bookings: 89
  }, {
    id: 3,
    name: "استشارة قانون تجاري",
    category: "تجاري",
    price: 200,
    duration: 60,
    isActive: true,
    bookings: 67
  }, {
    id: 4,
    name: "استشارة قانون عمل",
    category: "عمل",
    price: 120,
    duration: 30,
    isActive: false,
    bookings: 23
  }];
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-600">إدارة الخدمات</h2>
          <p className="text-muted-foreground">إدارة الخدمات القانونية المتاحة في المنصة</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          إضافة خدمة جديدة
        </Button>
      </div>

      {/* أدوات البحث */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="البحث في الخدمات..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pr-10" />
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات الخدمات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{services.length}</div>
            <div className="text-sm text-muted-foreground">إجمالي الخدمات</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {services.filter(s => s.isActive).length}
            </div>
            <div className="text-sm text-muted-foreground">الخدمات النشطة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">324</div>
            <div className="text-sm text-muted-foreground">إجمالي الحجوزات</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">142 ريال</div>
            <div className="text-sm text-muted-foreground">متوسط سعر الخدمة</div>
          </CardContent>
        </Card>
      </div>

      {/* جدول الخدمات */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الخدمات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الخدمة</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>المدة</TableHead>
                <TableHead>الحجوزات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map(service => <TableRow key={service.id}>
                  <TableCell>
                    <div className="font-medium">{service.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{service.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{service.price} ريال</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{service.duration} دقيقة</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{service.bookings}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {service.isActive ? <>
                          <ToggleRight className="h-5 w-5 text-green-600" />
                          <Badge className="bg-green-100 text-green-800">نشطة</Badge>
                        </> : <>
                          <ToggleLeft className="h-5 w-5 text-gray-400" />
                          <Badge variant="secondary">معطلة</Badge>
                        </>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
};
export default ServicesManagement;