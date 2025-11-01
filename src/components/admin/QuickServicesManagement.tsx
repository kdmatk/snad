import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Edit, Trash2, Clock, DollarSign, ToggleLeft, ToggleRight, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import QuickServiceDialog from "./QuickServiceDialog";

interface QuickService {
  id: string;
  title: string;
  description: string;
  duration_hours: number;
  price: number;
  rating: number;
  lawyer: string;
  category: string;
  icon: string;
  is_popular: boolean;
  is_active: boolean;
  order_index: number;
}

const QuickServicesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<QuickService[]>([]);
  const [selectedService, setSelectedService] = useState<QuickService | null>(null);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'create'>('view');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('quick_services')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "خطأ",
        description: "فشل تحميل الخدمات السريعة",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewService = (service: QuickService) => {
    setSelectedService(service);
    setDialogMode('view');
    setIsDialogOpen(true);
  };

  const handleEditService = (service: QuickService) => {
    setSelectedService(service);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleCreateService = () => {
    setSelectedService(null);
    setDialogMode('create');
    setIsDialogOpen(true);
  };

  const handleDeleteService = async (service: QuickService) => {
    if (confirm(`هل أنت متأكد من حذف الخدمة "${service.title}"؟`)) {
      try {
        const { error } = await supabase
          .from('quick_services')
          .delete()
          .eq('id', service.id);

        if (error) throw error;

        await fetchServices();
        toast({
          title: "تم الحذف بنجاح",
          description: `تم حذف الخدمة "${service.title}" بنجاح`
        });
      } catch (error) {
        console.error('Error deleting service:', error);
        toast({
          title: "خطأ",
          description: "فشل حذف الخدمة",
          variant: "destructive"
        });
      }
    }
  };

  const handleToggleStatus = async (service: QuickService) => {
    try {
      const { error } = await supabase
        .from('quick_services')
        .update({ is_active: !service.is_active })
        .eq('id', service.id);

      if (error) throw error;

      await fetchServices();
      toast({
        title: "تم تحديث الحالة",
        description: `تم ${service.is_active ? 'إلغاء تفعيل' : 'تفعيل'} الخدمة بنجاح`
      });
    } catch (error) {
      console.error('Error toggling status:', error);
      toast({
        title: "خطأ",
        description: "فشل تحديث حالة الخدمة",
        variant: "destructive"
      });
    }
  };

  const handleSaveService = async () => {
    await fetchServices();
    setIsDialogOpen(false);
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-600">إدارة الخدمات السريعة</h2>
          <p className="text-muted-foreground">إدارة الخدمات القانونية السريعة في المنصة</p>
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
            <Input
              placeholder="البحث في الخدمات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
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
              {services.filter(s => s.is_active).length}
            </div>
            <div className="text-sm text-muted-foreground">الخدمات النشطة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {services.filter(s => s.is_popular).length}
            </div>
            <div className="text-sm text-muted-foreground">الخدمات الشائعة</div>
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
          <CardTitle>قائمة الخدمات السريعة</CardTitle>
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
                  <TableHead className="text-right">التقييم</TableHead>
                  <TableHead className="text-right">شائعة</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="font-medium">{service.title}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50">{service.category}</Badge>
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
                        <span>{service.duration_hours} ساعة</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{service.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {service.is_popular ? (
                        <Badge className="bg-yellow-100 text-yellow-800">شائعة</Badge>
                      ) : (
                        <Badge variant="outline">عادية</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleToggleStatus(service)}
                      >
                        {service.is_active ? (
                          <>
                            <ToggleRight className="h-5 w-5 text-green-600" />
                            <Badge className="bg-green-100 text-green-800">نشطة</Badge>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="h-5 w-5 text-gray-400" />
                            <Badge variant="secondary">معطلة</Badge>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewService(service)}
                          title="عرض التفاصيل"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditService(service)}
                          title="تعديل"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteService(service)}
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <QuickServiceDialog
        service={selectedService}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveService}
        mode={dialogMode}
      />
    </div>
  );
};

export default QuickServicesManagement;
