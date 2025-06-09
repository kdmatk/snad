
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

interface ServiceDialogProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service) => void;
  mode: 'view' | 'edit' | 'create';
}

const ServiceDialog = ({ 
  service, 
  isOpen, 
  onClose, 
  onSave, 
  mode 
}: ServiceDialogProps) => {
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    category: '',
    price: 0,
    duration: 30,
    isActive: true,
    bookings: 0,
    description: ''
  });

  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({
        name: '',
        category: '',
        price: 0,
        duration: 30,
        isActive: true,
        bookings: 0,
        description: ''
      });
    }
  }, [service, isOpen]);

  const handleSave = () => {
    if (formData.name && formData.category && formData.price) {
      const serviceData = {
        ...formData,
        id: service?.id || Date.now()
      } as Service;
      onSave(serviceData);
      onClose();
    }
  };

  const categories = [
    'عام',
    'أسرة',
    'تجاري',
    'عمل',
    'جنائي',
    'عقاري',
    'مدني'
  ];

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'إضافة خدمة جديدة' : 
             mode === 'edit' ? 'تعديل الخدمة' : 'عرض تفاصيل الخدمة'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' ? 'أدخل بيانات الخدمة الجديدة' :
             mode === 'edit' ? 'قم بتعديل بيانات الخدمة' : 'تفاصيل الخدمة'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              اسم الخدمة
            </Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="col-span-3"
              readOnly={isReadOnly}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              الفئة
            </Label>
            <Select 
              value={formData.category || ''} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              disabled={isReadOnly}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              السعر (ريال)
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
              className="col-span-3"
              readOnly={isReadOnly}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              المدة (دقيقة)
            </Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
              className="col-span-3"
              readOnly={isReadOnly}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              الوصف
            </Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="col-span-3"
              readOnly={isReadOnly}
            />
          </div>

          {mode === 'view' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">عدد الحجوزات</Label>
              <div className="col-span-3 p-2 bg-gray-50 rounded">
                {formData.bookings || 0}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          {mode !== 'view' && (
            <Button onClick={handleSave}>
              {mode === 'create' ? 'إضافة' : 'حفظ التغييرات'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
