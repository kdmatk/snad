import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Upload, X, FileText, Shield, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CreateCaseDialogProps {
  onSuccess?: () => void;
}

const CreateCaseDialog = ({ onSuccess }: CreateCaseDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [caseNumber, setCaseNumber] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (files.length + selectedFiles.length > 6) {
      toast.error("يمكنك رفع 6 ملفات كحد أقصى");
      return;
    }

    // التحقق من حجم الملفات (20 ميجا لكل ملف)
    const invalidFiles = selectedFiles.filter(file => file.size > 20 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      toast.error("حجم الملف يجب أن لا يتجاوز 20 ميجابايت");
      return;
    }

    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

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

      // إنشاء القضية
      const { data: caseData, error: caseError } = await supabase
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
        }])
        .select()
        .single();

      if (caseError) throw caseError;

      setCaseNumber(caseData.case_number);

      // رفع الملفات إذا وجدت
      const uploadedFiles: string[] = [];
      if (files.length > 0) {
        for (const file of files) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${caseData.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('case-files')
            .upload(fileName, file);

          if (uploadError) {
            console.error('Upload error:', uploadError);
          } else {
            uploadedFiles.push(fileName);
          }
        }

        // تحديث القضية بمسارات الملفات
        if (uploadedFiles.length > 0) {
          await supabase
            .from('legal_cases')
            .update({ attachments: uploadedFiles })
            .eq('id', caseData.id);
        }
      }

      toast.success(formData.is_auction ? "تم إنشاء المزاد بنجاح" : "تم إنشاء القضية بنجاح");
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setOpen(false);
        setShowSuccess(false);
        setCaseNumber("");
        setFiles([]);
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
      }, 3000);
      
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

        {showSuccess ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold">تم الإنشاء بنجاح!</h3>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">رقم القضية</p>
              <p className="text-3xl font-bold text-primary">{caseNumber}</p>
            </div>
            <p className="text-muted-foreground">
              سيتم إغلاق هذه النافذة تلقائياً...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* رسالة الأمان */}
            <Alert className="border-green-200 bg-green-50">
              <Shield className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>خدمة آمنة ومعتمدة قانونياً</strong>
                <br />
                جميع بياناتك وملفاتك محمية ومشفرة. نضمن سرية المعلومات وفقاً للأنظمة القانونية.
              </AlertDescription>
            </Alert>

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

            {/* قسم رفع الملفات */}
            <div>
              <Label>المستندات والملفات (اختياري - حتى 6 ملفات)</Label>
              <div className="mt-2 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="flex-1 text-sm truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(0)} KB
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {files.length < 6 && (
                  <div>
                    <Input
                      type="file"
                      id="files"
                      multiple
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <Label
                      htmlFor="files"
                      className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors"
                    >
                      <Upload className="h-5 w-5 text-primary" />
                      <span>اضغط لرفع الملفات ({files.length}/6)</span>
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      الملفات المدعومة: PDF, Word, الصور (حد أقصى 20 ميجابايت لكل ملف)
                    </p>
                  </div>
                )}
              </div>
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateCaseDialog;
