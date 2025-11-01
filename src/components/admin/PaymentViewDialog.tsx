import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, User, CreditCard, Download, FileText } from "lucide-react";
import { toast } from "sonner";

interface PaymentData {
  id: number;
  transactionId: string;
  client: string;
  lawyer: string;
  amount: number;
  status: string;
  method: string;
  date: string;
  service: string;
}

interface PaymentViewDialogProps {
  payment: PaymentData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentViewDialog = ({ payment, open, onOpenChange }: PaymentViewDialogProps) => {
  if (!payment) return null;

  const getStatusLabel = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      completed: { label: "مكتمل", className: "bg-green-100 text-green-800" },
      pending: { label: "قيد الانتظار", className: "bg-yellow-100 text-yellow-800" },
      failed: { label: "فشل", className: "bg-red-100 text-red-800" },
      refunded: { label: "مُسترد", className: "bg-blue-100 text-blue-800" }
    };
    return statusConfig[status] || { label: status, className: "" };
  };

  const getPaymentMethodName = (method: string) => {
    const methods: Record<string, string> = {
      credit_card: "بطاقة ائتمان",
      mada: "مدى",
      bank_transfer: "تحويل بنكي",
      wallet: "محفظة إلكترونية"
    };
    return methods[method] || method;
  };

  const handleDownloadInvoice = () => {
    toast.success("جاري تحميل الفاتورة...");
  };

  const statusInfo = getStatusLabel(payment.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>تفاصيل المعاملة</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">رقم المعاملة</p>
              <p className="text-lg font-mono font-semibold">{payment.transactionId}</p>
            </div>
            <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">العميل</p>
                <p className="font-medium">{payment.client}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">المحامي</p>
                <p className="font-medium">{payment.lawyer}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">الخدمة</p>
                <p className="font-medium">{payment.service}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">التاريخ</p>
                <p className="font-medium">
                  {new Date(payment.date).toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">طريقة الدفع</p>
                <p className="font-medium">{getPaymentMethodName(payment.method)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">المبلغ</p>
                <p className="text-xl font-bold text-green-600">{payment.amount} ريال</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end">
            <Button onClick={handleDownloadInvoice}>
              <Download className="h-4 w-4 ml-2" />
              تحميل الفاتورة
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentViewDialog;
