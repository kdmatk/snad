import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface CaseData {
  id: number;
  title: string;
  client: string;
  category: string;
  budget: string;
  status: string;
  urgency: string;
  bids: number;
  createdAt: string;
}

interface CaseEditDialogProps {
  case_: CaseData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedCase: CaseData) => void;
}

const CaseEditDialog = ({ case_, open, onOpenChange, onSave }: CaseEditDialogProps) => {
  const [formData, setFormData] = useState<CaseData | null>(case_);

  useEffect(() => {
    if (case_) {
      setFormData(case_);
    }
  }, [case_]);

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      toast.success("تم تحديث القضية بنجاح");
      onOpenChange(false);
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>تعديل القضية</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">عنوان القضية</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="client">اسم العميل</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">الفئة</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="تجاري">تجاري</SelectItem>
                  <SelectItem value="أسرة">أسرة</SelectItem>
                  <SelectItem value="عقاري">عقاري</SelectItem>
                  <SelectItem value="جنائي">جنائي</SelectItem>
                  <SelectItem value="عمالي">عمالي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budget">الميزانية</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">الحالة</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">مفتوحة</SelectItem>
                  <SelectItem value="assigned">مُسندة</SelectItem>
                  <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                  <SelectItem value="completed">مكتملة</SelectItem>
                  <SelectItem value="cancelled">ملغية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="urgency">الأولوية</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => setFormData({ ...formData, urgency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">منخفضة</SelectItem>
                  <SelectItem value="normal">عادية</SelectItem>
                  <SelectItem value="high">عالية</SelectItem>
                  <SelectItem value="urgent">عاجلة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>حفظ التغييرات</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CaseEditDialog;
