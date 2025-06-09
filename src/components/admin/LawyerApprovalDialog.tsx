
import { useState } from 'react';
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
import { CheckCircle, XCircle, Phone, Mail, Calendar, FileText } from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  license_number: string;
  status: string;
  rating: number;
  cases: number;
  avatar: string;
  created_at: string;
  bio?: string;
  experience_years?: number;
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
  onReject 
}: LawyerApprovalDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!lawyer) return null;

  const handleApprove = async () => {
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
              <AvatarImage src={lawyer.avatar} />
              <AvatarFallback className="text-lg">{lawyer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{lawyer.name}</h3>
              <p className="text-muted-foreground">{lawyer.specialty}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-sm">
                  <Mail className="h-4 w-4" />
                  {lawyer.email}
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <Phone className="h-4 w-4" />
                  {lawyer.phone}
                </span>
              </div>
            </div>
            <Badge variant={lawyer.status === 'pending' ? 'secondary' : 'default'}>
              {lawyer.status === 'pending' ? 'قيد المراجعة' : lawyer.status}
            </Badge>
          </div>

          {/* معلومات إضافية */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">رقم الترخيص:</span>
                <span className="font-mono">{lawyer.license_number}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">تاريخ التسجيل:</span>
                <span>{new Date(lawyer.created_at).toLocaleDateString('ar-SA')}</span>
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
                <span>{lawyer.cases}</span>
              </div>
            </div>
          </div>

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
            disabled={isProcessing}
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
