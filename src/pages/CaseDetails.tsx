import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, DollarSign, Users, FileText, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CaseDetails = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();

  const { data: legalCase, isLoading } = useQuery({
    queryKey: ["case-details", caseId],
    queryFn: async () => {
      if (!caseId) return null;
      
      const { data, error } = await supabase
        .from("legal_cases")
        .select("*")
        .eq("id", caseId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!caseId,
  });

  const { data: bidsCount } = useQuery({
    queryKey: ["case-bids-count", caseId],
    queryFn: async () => {
      if (!caseId) return 0;

      const { data, error } = await supabase
        .from("case_bids")
        .select("id")
        .eq("case_id", caseId);

      if (error) throw error;
      return data.length;
    },
    enabled: !!caseId,
  });

  const getStatusInfo = (status: string) => {
    const statusMap: { [key: string]: { label: string; variant: any; color: string } } = {
      open: { label: 'مفتوحة', variant: 'default', color: 'bg-green-100 text-green-800' },
      assigned: { label: 'معينة', variant: 'secondary', color: 'bg-blue-100 text-blue-800' },
      in_progress: { label: 'قيد التنفيذ', variant: 'default', color: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'مكتملة', variant: 'default', color: 'bg-purple-100 text-purple-800' },
      closed: { label: 'مغلقة', variant: 'destructive', color: 'bg-red-100 text-red-800' }
    };
    
    return statusMap[status] || { label: status, variant: 'secondary', color: 'bg-gray-100 text-gray-800' };
  };

  const getUrgencyInfo = (urgency?: string) => {
    const urgencyMap: { [key: string]: { label: string; color: string } } = {
      urgent: { label: 'عاجل', color: 'bg-red-100 text-red-800' },
      normal: { label: 'عادي', color: 'bg-blue-100 text-blue-800' },
      low: { label: 'غير عاجل', color: 'bg-gray-100 text-gray-800' }
    };
    
    return urgency ? urgencyMap[urgency] || urgencyMap.normal : null;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!legalCase) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              القضية غير موجودة أو تم حذفها
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  const statusInfo = getStatusInfo(legalCase.status);
  const urgencyInfo = getUrgencyInfo(legalCase.urgency);

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* المعلومات الرئيسية */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-3xl mb-3">{legalCase.title}</CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="border-primary/20 text-primary">
                          {legalCase.category}
                        </Badge>
                        <Badge className={statusInfo.color}>
                          {statusInfo.label}
                        </Badge>
                        {urgencyInfo && (
                          <Badge className={urgencyInfo.color}>
                            {urgencyInfo.label}
                          </Badge>
                        )}
                        {legalCase.is_auction && (
                          <Badge className="bg-yellow-100 text-yellow-800">مزاد</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      وصف القضية
                    </h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {legalCase.description || "لا يوجد وصف"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* معلومات جانبية */}
            <div className="space-y-6">
              {/* الميزانية */}
              {(legalCase.budget_min || legalCase.budget_max) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      الميزانية المقترحة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">
                      {legalCase.budget_min && `${legalCase.budget_min} - `}
                      {legalCase.budget_max} ر.س
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* معلومات المزاد */}
              {legalCase.is_auction && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      معلومات المزاد
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">عدد العروض</span>
                      <span className="text-2xl font-bold text-primary">{bidsCount || 0}</span>
                    </div>
                    {legalCase.auction_end_date && (
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-muted-foreground">تاريخ الإغلاق</span>
                        <span className="font-medium">
                          {new Date(legalCase.auction_end_date).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* معلومات عامة */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    معلومات عامة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">تاريخ الإنشاء</span>
                    <span className="font-medium">
                      {new Date(legalCase.created_at).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-muted-foreground">آخر تحديث</span>
                    <span className="font-medium">
                      {new Date(legalCase.updated_at).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* أزرار الإجراءات */}
              {legalCase.is_auction && (
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => navigate(`/case-bids/${caseId}`)}
                >
                  <Users className="ml-2 h-5 w-5" />
                  عرض العروض ({bidsCount || 0})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaseDetails;
