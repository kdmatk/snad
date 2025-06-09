
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSupabaseLawyers } from '@/hooks/useSupabaseLawyers';
import { Loader2 } from "lucide-react";

interface AddLawyerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddLawyerDialog = ({ isOpen, onClose, onSuccess }: AddLawyerDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    license_number: '',
    bio: '',
    experience_years: '',
    hourly_rate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addLawyer } = useSupabaseLawyers();

  const specialties = [
    'قانون مدني',
    'قانون جنائي',
    'قانون تجاري',
    'قانون عمل',
    'قانون عقاري',
    'قانون أسرة',
    'قانون إداري',
    'قانون دولي'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.specialty || !formData.license_number) {
      return;
    }

    setIsSubmitting(true);
    try {
      await addLawyer({
        ...formData,
        experience_years: formData.experience_years ? parseInt(formData.experience_years) : undefined,
        hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : undefined
      });
      
      // إعادة تعيين النموذج
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        license_number: '',
        bio: '',
        experience_years: '',
        hourly_rate: ''
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('خطأ في إضافة المحامي:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة محامي جديد</DialogTitle>
          <DialogDescription>
            أدخل بيانات المحامي الجديد لإضافته إلى المنصة
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="أدخل الاسم الكامل"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+966xxxxxxxxx"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license_number">رقم الترخيص *</Label>
              <Input
                id="license_number"
                value={formData.license_number}
                onChange={(e) => handleInputChange('license_number', e.target.value)}
                placeholder="رقم ترخيص مزاولة المهنة"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialty">التخصص *</Label>
            <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
              <SelectTrigger>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience_years">سنوات الخبرة</Label>
              <Input
                id="experience_years"
                type="number"
                min="0"
                max="50"
                value={formData.experience_years}
                onChange={(e) => handleInputChange('experience_years', e.target.value)}
                placeholder="عدد سنوات الخبرة"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourly_rate">السعر بالساعة (ريال)</Label>
              <Input
                id="hourly_rate"
                type="number"
                min="0"
                step="0.01"
                value={formData.hourly_rate}
                onChange={(e) => handleInputChange('hourly_rate', e.target.value)}
                placeholder="السعر بالساعة"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">النبذة الشخصية</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="نبذة مختصرة عن المحامي وخبراته"
              rows={3}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.name || !formData.email || !formData.specialty || !formData.license_number}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الإضافة...
                </>
              ) : (
                'إضافة المحامي'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLawyerDialog;
