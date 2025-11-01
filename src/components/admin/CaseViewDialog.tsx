import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, DollarSign, User, Briefcase, AlertTriangle } from "lucide-react";

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

interface CaseViewDialogProps {
  case_: CaseData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CaseViewDialog = ({ case_, open, onOpenChange }: CaseViewDialogProps) => {
  if (!case_) return null;

  const getStatusLabel = (status: string) => {
    const statusConfig: Record<string, string> = {
      open: "مفتوحة",
      assigned: "مُسندة",
      in_progress: "قيد التنفيذ",
      completed: "مكتملة",
      cancelled: "ملغية"
    };
    return statusConfig[status] || status;
  };

  const getUrgencyLabel = (urgency: string) => {
    const urgencyConfig: Record<string, string> = {
      low: "منخفضة",
      normal: "عادية",
      high: "عالية",
      urgent: "عاجلة"
    };
    return urgencyConfig[urgency] || urgency;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>تفاصيل القضية</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{case_.title}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline">{case_.category}</Badge>
              <Badge>{getStatusLabel(case_.status)}</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">
                {case_.urgency === 'urgent' && <AlertTriangle className="h-3 w-3 ml-1" />}
                {getUrgencyLabel(case_.urgency)}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">العميل</p>
                <p className="font-medium">{case_.client}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">عدد العروض</p>
                <p className="font-medium">{case_.bids} عرض</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">الميزانية</p>
                <p className="font-medium">{case_.budget} ريال</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">تاريخ الإنشاء</p>
                <p className="font-medium">
                  {new Date(case_.createdAt).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">وصف القضية</h4>
            <p className="text-muted-foreground">
              هذه قضية {case_.category} تحتاج إلى محامي متخصص. الميزانية المحددة هي {case_.budget} ريال.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseViewDialog;
