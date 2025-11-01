import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CreateCaseDialogProps {
  onSuccess?: () => void;
}

const CreateCaseDialog = ({ onSuccess }: CreateCaseDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget_min: "",
    budget_max: "",
    urgency: "normal",
    is_auction: true,
  });

  const categories = [
    "تجاري",
    "عقاري",
    "عمالي",
    "جنائي",
    "أسرة",
    "استشارات",
    "تحكيم"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // الحصول على المستخدم الحالي
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("يجب تسجيل الدخول أولاً");
        return;
      }

      const { error } = await supabase
        .from("legal_cases")
        .insert([{
          client_id: user.id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          budget_min: parseFloat(formData.budget_min) || null,
          budget_max: parseFloat(formData.budget_max) || null,
          urgency: formData.urgency,
          is_auction: formData.is_auction,
          status: 'open'
        }]);

      if (error) throw error;

      toast.success(formData.is_auction ? "تم إنشاء المزاد بنجاح" : "تم إنشاء القضية بنجاح");
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        budget_min: "",
        budget_max: "",
        urgency: "normal",
        is_auction: true,
      });
      
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء الإنشاء");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          إنشاء قضية/مزاد جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إنشاء قضية أو مزاد جديد</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">عنوان القضية *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="مثال: نزاع عقاري حول ملكية أرض"
            />
          </div>

          <div>
            <Label htmlFor="category">التصنيف *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر التصنيف" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">وصف القضية *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              placeholder="اشرح تفاصيل القضية بشكل دقيق..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget_min">الحد الأدنى للميزانية (ر.س)</Label>
              <Input
                id="budget_min"
                type="number"
                value={formData.budget_min}
                onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                placeholder="3000"
              />
            </div>
            <div>
              <Label htmlFor="budget_max">الحد الأقصى للميزانية (ر.س)</Label>
              <Input
                id="budget_max"
                type="number"
                value={formData.budget_max}
                onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                placeholder="7000"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="urgency">درجة الاستعجال</Label>
            <Select 
              value={formData.urgency} 
              onValueChange={(value) => setFormData({ ...formData, urgency: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">عاجل</SelectItem>
                <SelectItem value="normal">عادي</SelectItem>
                <SelectItem value="low">غير عاجل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <Label htmlFor="is_auction" className="text-base">فتح مزاد للقضية</Label>
              <p className="text-sm text-muted-foreground">السماح للمحامين بتقديم عروضهم</p>
            </div>
            <Switch
              id="is_auction"
              checked={formData.is_auction}
              onCheckedChange={(checked) => setFormData({ ...formData, is_auction: checked })}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "جاري الإنشاء..." : "إنشاء"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCaseDialog;
