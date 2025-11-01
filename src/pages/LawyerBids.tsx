import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Gavel } from "lucide-react";
import BidForm from "@/components/bids/BidForm";
import { useBidsData } from "@/hooks/useBidsData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const LawyerBids = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { addBid } = useBidsData(caseId);

  // بيانات وهمية للمحامي - في التطبيق الحقيقي يجب جلبها من auth
  const lawyerId = "temp-lawyer-id";
  const lawyerRating = 4.5;
  const lawyerCases = 25;

  // جلب بيانات القضية
  const { data: legalCase, isLoading } = useQuery({
    queryKey: ["legal-case", caseId],
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

  const handleSubmit = (bidData: any) => {
    addBid.mutate(bidData, {
      onSuccess: () => {
        navigate("/lawyer-dashboard");
      },
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </Layout>
    );
  }

  if (!legalCase) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">القضية غير موجودة</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
              <Gavel className="h-8 w-8 text-primary" />
              تقديم عرض مزايدة
            </h1>

            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">{legalCase.title}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="font-semibold">التصنيف:</span> {legalCase.category}</p>
                <p><span className="font-semibold">الحالة:</span> {legalCase.status}</p>
                <p><span className="font-semibold">الميزانية:</span> {legalCase.budget_min} - {legalCase.budget_max} ر.س</p>
                <p className="mt-4">{legalCase.description}</p>
              </div>
            </Card>
          </div>

          <div>
            <BidForm
              caseId={caseId!}
              lawyerId={lawyerId}
              lawyerRating={lawyerRating}
              lawyerCases={lawyerCases}
              maxBudget={legalCase.budget_max || 10000}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LawyerBids;
