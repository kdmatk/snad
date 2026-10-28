import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  Calendar,
  FileText,
} from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  specialty: string;
  license_number: string | null;
  registration_status: string;
  rating: number | null;
  total_cases: number | null;
  avatar_url: string | null;
  created_at: string;
  bio?: string | null;
  license_document_path?: string | null;
  country?: string | null;
  city?: string | null;
  experience_years?: number | null;
}

interface LawyerApprovalDialogProps {
  lawyer: Lawyer | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (lawyerId: string) => void;
  onReject: (lawyerId: string) => void;
}

const LawyerApprovalDialog = ({
  lawyer,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: LawyerApprovalDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [documentError, setDocumentError] = useState("");
  const [documentLoading, setDocumentLoading] = useState(false);
  useEffect(() => {
    setDocumentUrl(null);
    setDocumentError("");
  }, [lawyer?.id]);
  useEffect(() => {
    if (!documentUrl) return;
    const timer = window.setTimeout(() => setDocumentUrl(null), 55000);
    return () => window.clearTimeout(timer);
  }, [documentUrl]);
  const openLicense = async () => {
    if (!lawyer?.license_document_path) return;
    setDocumentLoading(true);
    setDocumentError("");
    const { data, error } = await supabase.storage
      .from("lawyer-licenses")
      .createSignedUrl(lawyer.license_document_path, 60);
    if (error || !data?.signedUrl)
      setDocumentError("تعذّر فتح الترخيص. أعد المحاولة.");
    else setDocumentUrl(data.signedUrl);
    setDocumentLoading(false);
  };
  if (!lawyer) return null;

  const complete =
    !!lawyer.name.trim() &&
    !!lawyer.specialty.trim() &&
    !!lawyer.license_number?.trim();
  const handleApprove = async () => {
    if (!complete) return;
    setIsProcessing(true);
    try {
      await onApprove(lawyer.id);
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      await onReject(lawyer.id);
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">تفاصيل طلب التسجيل</DialogTitle>
          <DialogDescription>
            مراجعة بيانات المحامي واتخاذ قرار بالموافقة أو الرفض
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* معلومات المحامي الأساسية */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={lawyer.avatar_url || undefined} />
              <AvatarFallback className="text-lg">
                {lawyer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {lawyer.name || "ملف محامٍ غير مكتمل"}
              </h3>
              <p className="text-muted-foreground">
                {lawyer.specialty || "التخصص لم يُضف"}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-sm">
                  <Mail className="h-4 w-4" />
                  {lawyer.email}
                </span>
                {lawyer.phone && (
                  <span className="flex items-center gap-1 text-sm">
                    <Phone className="h-4 w-4" />
                    {lawyer.phone}
                  </span>
                )}
              </div>
            </div>
            <Badge
              variant={
                lawyer.registration_status === "pending"
                  ? "secondary"
                  : "default"
              }
            >
              {lawyer.registration_status === "incomplete"
                ? "بانتظار استكمال البيانات"
                : lawyer.registration_status === "pending"
                  ? "قيد المراجعة"
                  : lawyer.registration_status === "approved"
                    ? "معتمد"
                    : "مرفوض"}
            </Badge>
          </div>

          {/* معلومات إضافية */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">رقم الترخيص:</span>
                <span className="font-mono">
                  {lawyer.license_number || "لم يُضف"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">تاريخ التسجيل:</span>
                <span>
                  {new Date(lawyer.created_at).toLocaleDateString("ar-SA")}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {lawyer.experience_years && (
                <div>
                  <span className="font-medium">سنوات الخبرة: </span>
                  <span>{lawyer.experience_years} سنة</span>
                </div>
              )}
              <div>
                <span className="font-medium">عدد القضايا: </span>
                <span>{lawyer.total_cases || 0}</span>
              </div>
            </div>
          </div>

          {lawyer.license_document_path && (
            <section className="space-y-2">
              <h4 className="font-medium">ترخيص المحاماة المرفق</h4>
              <Button
                type="button"
                variant="outline"
                onClick={openLicense}
                disabled={documentLoading}
              >
                {documentLoading
                  ? "جارٍ تجهيز الرابط..."
                  : "تجهيز رابط عرض الترخيص"}
              </Button>
              {documentUrl && (
                <a
                  className="block text-primary underline"
                  href={documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  فتح الترخيص — رابط مؤقت لمدة دقيقة
                </a>
              )}
              {documentError && (
                <p role="alert" className="text-sm text-red-700">
                  {documentError}
                </p>
              )}
            </section>
          )}
          {/* النبذة الشخصية */}
          {lawyer.bio && (
            <div>
              <h4 className="font-medium mb-2">النبذة الشخصية:</h4>
              <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                {lawyer.bio}
              </p>
            </div>
          )}
        </div>

        {!complete && (
          <p className="text-sm text-amber-800 bg-amber-50 p-3 rounded-md">
            لا يمكن اعتماد الطلب قبل استكمال الاسم المهني والتخصص ورقم الترخيص.
          </p>
        )}
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            إلغاء
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={isProcessing}
          >
            <XCircle className="h-4 w-4 ml-2" />
            رفض الطلب
          </Button>
          <Button
            onClick={handleApprove}
            disabled={
              isProcessing ||
              !complete ||
              lawyer.registration_status === "approved"
            }
          >
            <CheckCircle className="h-4 w-4 ml-2" />
            قبول الطلب
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LawyerApprovalDialog;
