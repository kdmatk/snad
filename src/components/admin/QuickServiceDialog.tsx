import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

interface QuickServiceDialogProps {
  service: QuickService | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  mode: 'view' | 'edit' | 'create';
}

const QuickServiceDialog = ({ service, isOpen, onClose, onSave, mode }: QuickServiceDialogProps) => {
  const [formData, setFormData] = useState<Partial<QuickService>>({
    title: '',
    description: '',
    duration_hours: 0,
    price: 0,
    rating: 0,
    lawyer: 'محامي معتمد',
    category: '',
    icon: 'FileText',
    is_popular: false,
    is_active: true,
    order_index: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({
        title: '',
        description: '',
        duration_hours: 0,
        price: 0,
        rating: 0,
        lawyer: 'محامي معتمد',
        category: '',
        icon: 'FileText',
        is_popular: false,
        is_active: true,
        order_index: 0
      });
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === 'create') {
        const dataToInsert = {
          title: formData.title!,
          description: formData.description || '',
          duration_hours: formData.duration_hours!,
          price: formData.price!,
          rating: formData.rating || 0,
          lawyer: formData.lawyer || 'محامي معتمد',
          category: formData.category!,
          icon: formData.icon || 'FileText',
          is_popular: formData.is_popular || false,
          is_active: formData.is_active !== false,
          order_index: formData.order_index || 0
        };

        const { error } = await supabase
          .from('quick_services')
          .insert([dataToInsert]);

        if (error) throw error;

        toast({
          title: "تم الإضافة بنجاح",
          description: "تم إضافة الخدمة الجديدة بنجاح"
        });
      } else if (mode === 'edit') {
        const { error } = await supabase
          .from('quick_services')
          .update(formData)
          .eq('id', service?.id);

        if (error) throw error;

        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات الخدمة بنجاح"
        });
      }

      onSave();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "خطأ",
        description: "فشل حفظ الخدمة",
        variant: "destructive"
      });
    }
  };

  const categories = [
    'استشارات',
    'مراجعة عقود',
    'صياغة قانونية',
    'شكاوى',
    'توجيه قانوني سريع'
  ];

  const icons = [
    'FileText',
    'MessageCircle',
    'Scale',
    'Edit',
    'Users',
    'Clock'
  ];

  const isViewMode = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'view' ? 'عرض الخدمة' : mode === 'edit' ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">اسم الخدمة</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={isViewMode}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">الفئة</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                disabled={isViewMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isViewMode}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">السعر (ريال)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                disabled={isViewMode}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_hours">المدة (ساعة)</Label>
              <Input
                id="duration_hours"
                type="number"
                value={formData.duration_hours}
                onChange={(e) => setFormData({ ...formData, duration_hours: parseInt(e.target.value) })}
                disabled={isViewMode}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">التقييم</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                disabled={isViewMode}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">الأيقونة</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => setFormData({ ...formData, icon: value })}
                disabled={isViewMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الأيقونة" />
                </SelectTrigger>
                <SelectContent>
                  {icons.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_index">ترتيب العرض</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                disabled={isViewMode}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="is_popular"
                checked={formData.is_popular}
                onCheckedChange={(checked) => setFormData({ ...formData, is_popular: checked })}
                disabled={isViewMode}
              />
              <Label htmlFor="is_popular" className="cursor-pointer">
                خدمة شائعة
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                disabled={isViewMode}
              />
              <Label htmlFor="is_active" className="cursor-pointer">
                نشطة
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {isViewMode ? 'إغلاق' : 'إلغاء'}
            </Button>
            {!isViewMode && (
              <Button type="submit">
                {mode === 'create' ? 'إضافة' : 'حفظ التعديلات'}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuickServiceDialog;
