import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Eye, 
  Download,
  Calendar,
  DollarSign,
  CreditCard,
  TrendingUp,
  Clock
} from "lucide-react";
import PaymentViewDialog from "./PaymentViewDialog";
import { toast } from "sonner";

const PaymentsManagement = () => {
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const payments = [
    {
      id: 1,
      transactionId: "TXN123456789",
      client: "أحمد محمد",
      lawyer: "د. فاطمة الزهراني",
      amount: 300,
      status: "completed",
      method: "credit_card",
      date: "2024-01-15T14:30:00Z",
      service: "استشارة قانون أسرة"
    },
    {
      id: 2,
      transactionId: "TXN123456790",
      client: "سارة علي",
      lawyer: "د. أحمد العلي",
      amount: 500,
      status: "pending",
      method: "bank_transfer",
      date: "2024-01-15T10:15:00Z",
      service: "استشارة قانون تجاري"
    },
    {
      id: 3,
      transactionId: "TXN123456791",
      client: "محمد السعدي",
      lawyer: "د. نوال الخالد",
      amount: 200,
      status: "failed",
      method: "mada",
      date: "2024-01-14T16:45:00Z",
      service: "استشارة عامة"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "مكتمل", variant: "default" as const, color: "bg-green-100 text-green-800" },
      pending: { label: "قيد الانتظار", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
      failed: { label: "فشل", variant: "destructive" as const, color: "bg-red-100 text-red-800" },
      refunded: { label: "مُسترد", variant: "outline" as const, color: "bg-blue-100 text-blue-800" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return <CreditCard className="h-4 w-4" />;
      case 'mada':
        return <CreditCard className="h-4 w-4" />;
      case 'bank_transfer':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getPaymentMethodName = (method: string) => {
    const methods = {
      credit_card: "بطاقة ائتمان",
      mada: "مدى",
      bank_transfer: "تحويل بنكي",
      wallet: "محفظة إلكترونية"
    };
    return methods[method as keyof typeof methods] || method;
  };

  const handleView = (payment: any) => {
    setSelectedPayment(payment);
    setViewDialogOpen(true);
  };

  const handleDownload = (payment: any) => {
    toast.success(`جاري تحميل فاتورة ${payment.transactionId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة المدفوعات</h2>
          <p className="text-muted-foreground">مراقبة وإدارة جميع المعاملات المالية</p>
        </div>
        <Button>
          <Download className="h-4 w-4 ml-2" />
          تصدير التقرير
        </Button>
      </div>

      {/* إحصائيات المدفوعات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold text-green-600">125,500 ريال</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+15% من الشهر الماضي</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المعاملات المكتملة</p>
                <p className="text-2xl font-bold">1,234</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+8% من الشهر الماضي</span>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 p-2">✓</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معاملات قيد الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600">23</p>
                <p className="text-sm text-muted-foreground">بقيمة 12,300 ريال</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معاملات فاشلة</p>
                <p className="text-2xl font-bold text-red-600">15</p>
                <p className="text-sm text-muted-foreground">بقيمة 3,200 ريال</p>
              </div>
              <Badge variant="destructive" className="p-2">✗</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* جدول المدفوعات */}
      <Card>
        <CardHeader>
          <CardTitle>المعاملات الأخيرة</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم المعاملة</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>المحامي</TableHead>
                <TableHead>الخدمة</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <span className="font-mono text-sm">{payment.transactionId}</span>
                  </TableCell>
                  <TableCell>{payment.client}</TableCell>
                  <TableCell>{payment.lawyer}</TableCell>
                  <TableCell>{payment.service}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{payment.amount} ريال</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(payment.method)}
                      <span>{getPaymentMethodName(payment.method)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(payment.date).toLocaleDateString('ar-SA', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleView(payment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDownload(payment)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PaymentViewDialog
        payment={selectedPayment}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />
    </div>
  );
};

export default PaymentsManagement;
