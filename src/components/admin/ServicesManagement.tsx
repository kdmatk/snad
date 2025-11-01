import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Edit, Trash2, Clock, DollarSign, ToggleLeft, ToggleRight } from "lucide-react";
import ServiceDialog from "./ServiceDialog";
import { useToast } from "@/hooks/use-toast";
interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: number;
  isActive: boolean;
  bookings: number;
  description?: string;
}
const ServicesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<Service[]>([{
    id: 1,
    name: "استشارة قانونية عامة",
    category: "عام",
    price: 100,
    duration: 30,
    isActive: true,
    bookings: 145,
    description: "استشارة قانونية شاملة في جميع المجالات القانونية"
  }, {
    id: 2,
    name: "استشارة قانون الأسرة",
    category: "أسرة",
    price: 150,
    duration: 45,
    isActive: true,
    bookings: 89,
    description: "استشارات متخصصة في قضايا الأسرة والأحوال الشخصية"
  }, {
    id: 3,
    name: "استشارة قانون تجاري",
    category: "تجاري",
    price: 200,
    duration: 60,
    isActive: true,
    bookings: 67,
    description: "استشارات في القانون التجاري والشركات"
  }, {
    id: 4,
    name: "استشارة قانون عمل",
    category: "عمل",
    price: 120,
    duration: 30,
    isActive: false,
    bookings: 23,
    description: "استشارات في قانون العمل وحقوق العمال"
  }]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'create'>('view');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    toast
  } = useToast();
  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setDialogMode('view');
    setIsDialogOpen(true);
  };
  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };
  const handleCreateService = () => {
    setSelectedService(null);
    setDialogMode('create');
    setIsDialogOpen(true);
  };
  const handleDeleteService = (service: Service) => {
    if (confirm(`هل أنت متأكد من حذف الخدمة "${service.name}"؟`)) {
      setServices(prev => prev.filter(s => s.id !== service.id));
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف الخدمة "${service.name}" بنجاح`
      });
    }
  };
  const handleToggleStatus = (service: Service) => {
    setServices(prev => prev.map(s => s.id === service.id ? {
      ...s,
      isActive: !s.isActive
    } : s));
    toast({
      title: "تم تحديث الحالة",
      description: `تم ${service.isActive ? 'إلغاء تفعيل' : 'تفعيل'} الخدمة بنجاح`
    });
  };
  const handleSaveService = (serviceData: Service) => {
    if (dialogMode === 'create') {
      setServices(prev => [...prev, serviceData]);
      toast({
        title: "تم الإضافة بنجاح",
        description: "تم إضافة الخدمة الجديدة بنجاح"
      });
    } else if (dialogMode === 'edit') {
      setServices(prev => prev.map(s => s.id === serviceData.id ? serviceData : s));
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث بيانات الخدمة بنجاح"
      });
    }
  };
  const filteredServices = services.filter(service => service.name.toLowerCase().includes(searchTerm.toLowerCase()) || service.category.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-600">إدارة الخدمات</h2>
          <p className="text-muted-foreground">إدارة الخدمات القانونية المتاحة في المنصة</p>
        </div>
        <Button onClick={handleCreateService}>
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
            <div className="text-2xl font-bold text-yellow-600">
              {services.reduce((total, s) => total + s.bookings, 0)}
            </div>
            <div className="text-sm text-muted-foreground">إجمالي الحجوزات</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(services.reduce((total, s) => total + s.price, 0) / services.length)} ريال
            </div>
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم الخدمة</TableHead>
                  <TableHead className="text-right">الفئة</TableHead>
                  <TableHead className="text-right">السعر</TableHead>
                  <TableHead className="text-right">المدة</TableHead>
                  <TableHead className="text-right">الحجوزات</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map(service => <TableRow key={service.id}>
                    <TableCell>
                      <div className="font-medium">{service.name}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-800">{service.category}</Badge>
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
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggleStatus(service)}>
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
                        <Button variant="ghost" size="icon" onClick={() => handleViewService(service)} title="عرض التفاصيل">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditService(service)} title="تعديل">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteService(service)} title="حذف">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ServiceDialog service={selectedService} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSave={handleSaveService} mode={dialogMode} />
    </div>;
};
export default ServicesManagement;