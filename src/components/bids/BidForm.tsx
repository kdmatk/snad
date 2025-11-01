import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BidFormProps {
  caseId: string;
  lawyerId: string;
  lawyerRating: number;
  lawyerCases: number;
  maxBudget: number;
  onSubmit: (data: {
    case_id: string;
    lawyer_id: string;
    amount: number;
    delivery_days: number;
    proposal: string;
  }) => void;
}

const BidForm = ({ 
  caseId, 
  lawyerId, 
  lawyerRating, 
  lawyerCases,
  maxBudget,
  onSubmit 
}: BidFormProps) => {
  const [amount, setAmount] = useState<number>(maxBudget * 0.8);
  const [deliveryDays, setDeliveryDays] = useState<number>(7);
  const [proposal, setProposal] = useState<string>("");

  // حساب النقاط المتوقعة
  const calculateExpectedScore = () => {
    const priceScore = maxBudget > 0 ? ((maxBudget - amount) / maxBudget) * 40 : 20;
    const ratingScore = (lawyerRating / 5.0) * 35;
    
    let speedScore = 5;
    if (deliveryDays <= 3) speedScore = 15;
    else if (deliveryDays <= 7) speedScore = 12;
    else if (deliveryDays <= 14) speedScore = 8;
    
    let experienceScore = 4;
    if (lawyerCases >= 50) experienceScore = 10;
    else if (lawyerCases >= 20) experienceScore = 8;
    else if (lawyerCases >= 10) experienceScore = 6;
    
    return (priceScore + ratingScore + speedScore + experienceScore).toFixed(1);
  };

  const expectedScore = parseFloat(calculateExpectedScore());

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      case_id: caseId,
      lawyer_id: lawyerId,
      amount,
      delivery_days: deliveryDays,
      proposal,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6">
        <div className="mb-6 p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <h3 className="font-bold">النقاط المتوقعة</h3>
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(expectedScore)}`}>
              {expectedScore}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            يتم حساب النقاط بناءً على السعر (40%)، التقييم (35%)، السرعة (15%)، والخبرة (10%)
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">السعر المقترح (ر.س)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              min={0}
              max={maxBudget}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              الحد الأقصى للميزانية: {maxBudget} ر.س
            </p>
          </div>

          <div>
            <Label htmlFor="delivery">مدة التنفيذ (بالأيام)</Label>
            <Input
              id="delivery"
              type="number"
              value={deliveryDays}
              onChange={(e) => setDeliveryDays(parseInt(e.target.value))}
              min={1}
              required
            />
            <div className="flex gap-2 mt-2">
              <Badge 
                variant={deliveryDays <= 3 ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setDeliveryDays(3)}
              >
                عاجل (3 أيام)
              </Badge>
              <Badge 
                variant={deliveryDays === 7 ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setDeliveryDays(7)}
              >
                عادي (7 أيام)
              </Badge>
              <Badge 
                variant={deliveryDays === 14 ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setDeliveryDays(14)}
              >
                مرن (14 يوم)
              </Badge>
            </div>
          </div>

          <div>
            <Label htmlFor="proposal">تفاصيل العرض</Label>
            <Textarea
              id="proposal"
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              placeholder="اشرح كيف ستتعامل مع هذه القضية وما هي خبرتك في هذا المجال..."
              rows={5}
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <TrendingUp className="ml-2 h-5 w-5" />
            إرسال العرض
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default BidForm;
