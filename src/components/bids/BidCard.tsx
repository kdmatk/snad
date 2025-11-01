import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, TrendingUp, CheckCircle2 } from "lucide-react";
import { Bid } from "@/hooks/useBidsData";

interface BidCardProps {
  bid: Bid;
  onAccept?: (bidId: string) => void;
  onReject?: (bidId: string) => void;
  isClient?: boolean;
}

const BidCard = ({ bid, onAccept, onReject, isClient = false }: BidCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "ممتاز";
    if (score >= 60) return "جيد";
    return "مقبول";
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={bid.lawyer?.avatar_url} />
            <AvatarFallback>{bid.lawyer?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-lg">{bid.lawyer?.name}</h3>
            <p className="text-sm text-muted-foreground">{bid.lawyer?.specialty}</p>
          </div>
        </div>

        <div className="text-left">
          <div className={`text-3xl font-bold ${getScoreColor(bid.score)}`}>
            {bid.score.toFixed(1)}
          </div>
          <p className="text-xs text-muted-foreground">{getScoreLabel(bid.score)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-muted/50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{bid.amount} ر.س</div>
          <p className="text-xs text-muted-foreground">السعر المقترح</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="text-xl font-bold">{bid.delivery_days}</span>
          </div>
          <p className="text-xs text-muted-foreground">أيام التنفيذ</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xl font-bold">{bid.lawyer?.rating || 0}</span>
          </div>
          <p className="text-xs text-muted-foreground">التقييم</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          تفاصيل العرض
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {bid.proposal || "لا يوجد تفاصيل"}
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant="secondary">
          {bid.lawyer?.total_cases || 0} قضية سابقة
        </Badge>
        {bid.is_accepted && (
          <Badge className="bg-green-600">
            <CheckCircle2 className="h-3 w-3 ml-1" />
            مقبول
          </Badge>
        )}
        {bid.status === "rejected" && (
          <Badge variant="destructive">مرفوض</Badge>
        )}
      </div>

      {isClient && bid.status === "pending" && !bid.is_accepted && (
        <div className="flex gap-2">
          <Button 
            onClick={() => onAccept?.(bid.id)}
            className="flex-1"
          >
            قبول العرض
          </Button>
          <Button 
            onClick={() => onReject?.(bid.id)}
            variant="outline"
            className="flex-1"
          >
            رفض
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BidCard;
