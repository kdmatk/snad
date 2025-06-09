
import { useState } from 'react';
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
import { SupabaseLawyer } from '@/hooks/useSupabaseLawyers';

interface AddLawyerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lawyerData: Partial<SupabaseLawyer>) => Promise<void>;
}

const AddLawyerDialog = ({ 
  isOpen, 
  onClose, 
  onSave 
}: AddLawyerDialogProps) => {
  const [formData, setFormData] = useState<Partial<SupabaseLawyer>>({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    license_number: '',
    bio: '',
    experience_years: 0,
    hourly_rate: 0
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.specialty || !formData.license_number) {
      return;
    }

    try {
      setLoading(true);
      await onSave(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        license_number: '',
        bio: '',
        experience_years: 0,
        hourly_rate: 0
      });
      onClose();
    } catch (error) {
      console.error('Error saving lawyer:', error);
    } finally {
      setLoading(false);
    }
  };

  const specialties = [
    'القانون التجاري',
    'قانون الأسرة',
    'القانون الجنائي',
    'القانون العقاري',
    'قانون العمل',
    'القانون المالي',
    'القانون الإداري',
    'قانون الضرائب'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة محامي جديد</DialogTitle>
          <DialogDescription>
            أدخل بيانات المحامي الجديد
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              الاسم *
            </Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="col-span-3"
              placeholder="أدخل اسم المحامي"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              البريد الإلكتروني *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="col-span-3"
              placeholder="أدخل البريد الإلكتروني"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              رقم الهاتف
            </Label>
            <Input
              id="phone"
              value={formData.phone || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="col-span-3"
              placeholder="أدخل رقم الهاتف"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="specialty" className="text-right">
              التخصص *
            </Label>
            <Select 
              value={formData.specialty || ''} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, specialty: value }))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر التخصص" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="license_number" className="text-right">
              رقم الترخيص *
            </Label>
            <Input
              id="license_number"
              value={formData.license_number || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, license_number: e.target.value }))}
              className="col-span-3"
              placeholder="أدخل رقم الترخيص"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="experience_years" className="text-right">
              سنوات الخبرة
            </Label>
            <Input
              id="experience_years"
              type="number"
              value={formData.experience_years || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, experience_years: Number(e.target.value) }))}
              className="col-span-3"
              placeholder="أدخل سنوات الخبرة"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hourly_rate" className="text-right">
              الأجر بالساعة (ريال)
            </Label>
            <Input
              id="hourly_rate"
              type="number"
              value={formData.hourly_rate || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: Number(e.target.value) }))}
              className="col-span-3"
              placeholder="أدخل الأجر بالساعة"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              نبذة تعريفية
            </Label>
            <Textarea
              id="bio"
              value={formData.bio || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="col-span-3"
              placeholder="أدخل نبذة تعريفية عن المحامي"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            إلغاء
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'جاري الحفظ...' : 'إضافة المحامي'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLawyerDialog;
