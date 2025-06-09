
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Phone, MessageCircle, CreditCard, Smartphone } from "lucide-react";

interface QuickOrderFormProps {
  service: any;
  onClose: () => void;
}

const QuickOrderForm = ({ service, onClose }: QuickOrderFormProps) => {
  const [formData, setFormData] = useState({
    additionalDescription: "",
    contactMethod: "",
    paymentMethod: "",
    file: null as File | null
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = () => {
    console.log("طلب جديد:", { service: service.title, ...formData });
    onClose();
  };

  if (!service) return null;

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <CardHeader className="text-center border-b">
        <CardTitle className="text-2xl text-primary">
          طلب خدمة: {service.title}
        </CardTitle>
        <div className="flex justify-center items-center gap-4 mt-4">
          <span className="text-lg font-bold text-secondary">{service.price} ريال</span>
          <span className="text-sm text-muted-foreground">{service.duration}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Additional Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">وصف إضافي (اختياري)</label>
          <Textarea
            placeholder="أضف أي تفاصيل إضافية تساعد المحامي في فهم طلبك..."
            value={formData.additionalDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalDescription: e.target.value }))}
            className="min-h-[100px]"
          />
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium">إرفاق مستند (PDF أو صورة)</label>
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-sm text-muted-foreground">
                {formData.file ? formData.file.name : "اختر ملف أو اسحبه هنا"}
              </span>
            </label>
          </div>
        </div>

        {/* Contact Method */}
        <div className="space-y-2">
          <label className="text-sm font-medium">وسيلة التواصل المفضلة</label>
          <Select value={formData.contactMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, contactMethod: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="اختر وسيلة التواصل" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chat">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  دردشة نصية
                </div>
              </SelectItem>
              <SelectItem value="call">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  مكالمة صوتية
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <label className="text-sm font-medium">طريقة الدفع</label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={formData.paymentMethod === "apple-pay" ? "default" : "outline"}
              className="h-12"
              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "apple-pay" }))}
            >
              <Smartphone className="h-4 w-4 ml-2" />
              Apple Pay
            </Button>
            <Button
              variant={formData.paymentMethod === "card" ? "default" : "outline"}
              className="h-12"
              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "card" }))}
            >
              <CreditCard className="h-4 w-4 ml-2" />
              مدى / Visa
            </Button>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">الخدمة:</span>
              <span>{service.title}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">المدة:</span>
              <span>{service.duration}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-primary">
              <span>المجموع:</span>
              <span>{service.price} ريال</span>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 text-lg"
          onClick={handleSubmit}
          disabled={!formData.contactMethod || !formData.paymentMethod}
        >
          تأكيد وبدء التنفيذ
        </Button>
      </CardContent>
    </div>
  );
};

export default QuickOrderForm;
