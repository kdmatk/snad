import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Eye, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CaseCardProps {
  caseData: {
    id: string;
    title: string;
    category: string;
    description: string;
    budget_min?: number;
    budget_max?: number;
    status: string;
    urgency?: string;
    created_at: string;
    is_auction: boolean;
    case_number?: string;
    attachments?: string[];
  };
  bidsCount?: number;
  isOwner?: boolean;
}

const CaseCard = ({ caseData, bidsCount = 0, isOwner = false }: CaseCardProps) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; variant: any } } = {
      open: { label: 'مفتوحة', variant: 'default' },
      assigned: { label: 'معينة', variant: 'secondary' },
      in_progress: { label: 'قيد التنفيذ', variant: 'default' },
      completed: { label: 'مكتملة', variant: 'default' },
      closed: { label: 'مغلقة', variant: 'destructive' }
    };
    
    const statusInfo = statusMap[status] || { label: status, variant: 'secondary' };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getUrgencyBadge = (urgency?: string) => {
    if (!urgency) return null;
    
    const urgencyMap: { [key: string]: { label: string; className: string } } = {
      urgent: { label: 'عاجل', className: 'bg-red-100 text-red-800' },
      normal: { label: 'عادي', className: 'bg-blue-100 text-blue-800' },
      low: { label: 'غير عاجل', className: 'bg-gray-100 text-gray-800' }
    };
    
    const info = urgencyMap[urgency] || urgencyMap.normal;
    return <Badge className={info.className}>{info.label}</Badge>;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {caseData.case_number && (
                <Badge variant="secondary" className="font-mono text-xs">
                  {caseData.case_number}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg mb-2">{caseData.title}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="border-primary/20 text-primary">
                {caseData.category}
              </Badge>
              {getStatusBadge(caseData.status)}
              {getUrgencyBadge(caseData.urgency)}
              {caseData.is_auction && (
                <Badge className="bg-yellow-100 text-yellow-800">مزاد</Badge>
              )}
            </div>
          </div>
          {caseData.budget_max && (
            <div className="text-left mr-4">
              <div className="text-lg font-bold text-primary">
                {caseData.budget_min && `${caseData.budget_min} - `}
                {caseData.budget_max} ر.س
              </div>
              <div className="text-xs text-muted-foreground">الميزانية</div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {caseData.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{new Date(caseData.created_at).toLocaleDateString('ar-SA')}</span>
          </div>
          {caseData.is_auction && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{bidsCount} عرض</span>
            </div>
          )}
          {caseData.attachments && caseData.attachments.length > 0 && (
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>{caseData.attachments.length} ملف</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {isOwner ? (
            <Button 
              className="flex-1"
              onClick={() => navigate(`/case-bids/${caseData.id}`)}
            >
              <Eye className="h-4 w-4 ml-2" />
              عرض العروض ({bidsCount})
            </Button>
          ) : (
            <Button 
              className="flex-1"
              onClick={() => navigate(`/lawyer-bids/${caseData.id}`)}
              disabled={caseData.status !== 'open'}
            >
              {caseData.status === 'open' ? 'تقديم عرض' : 'مغلق'}
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate(`/case/${caseData.id}`)}>
            التفاصيل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseCard;
