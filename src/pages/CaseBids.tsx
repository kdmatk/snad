import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingDown, Info } from "lucide-react";
import BidCard from "@/components/bids/BidCard";
import { useBidsData } from "@/hooks/useBidsData";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CaseBids = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { bids, isLoading, acceptBid, rejectBid } = useBidsData(caseId);

  const handleAccept = (bidId: string) => {
    acceptBid.mutate(bidId);
  };

  const handleReject = (bidId: string) => {
    rejectBid.mutate(bidId);
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

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">عروض المحامين</h1>
          <p className="text-muted-foreground">
            تم ترتيب العروض حسب أفضل نقاط (السعر + التقييم + السرعة + الخبرة)
          </p>
        </div>

        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              <span className="font-semibold">نظام التقييم الذكي:</span>
            </div>
            <p className="text-sm mt-2">
              يتم حساب النقاط تلقائياً بناءً على: السعر (40%) + تقييم المحامي (35%) + سرعة التنفيذ (15%) + الخبرة (10%)
            </p>
          </AlertDescription>
        </Alert>

        {bids.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              لا توجد عروض حتى الآن
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bids.map((bid) => (
              <BidCard
                key={bid.id}
                bid={bid}
                onAccept={handleAccept}
                onReject={handleReject}
                isClient={true}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CaseBids;
