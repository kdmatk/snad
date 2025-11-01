
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, Shield, MapPin, Phone, MessageCircle, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Lawyer } from "@/hooks/useLawyersData";
import { formatLastSeen } from "@/utils/dateFormatter";

interface LawyerCardProps {
  lawyer: Lawyer;
}

const LawyerCard = ({ lawyer }: LawyerCardProps) => {
  const navigate = useNavigate();

  const handleConsultation = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/instant-consultation?lawyer=${lawyer.id}`);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`tel:${lawyer.phone}`, '_self');
  };

  const handleViewProfile = () => {
    navigate(`/lawyer/${lawyer.id}`);
  };

  return (
    <Card 
      className="hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg hover:-translate-y-2 cursor-pointer overflow-hidden"
      onClick={handleViewProfile}
    >
      <CardHeader className="text-center pb-4">
        {/* صورة المحامي مع إطار ذهبي */}
        <div className="relative mx-auto mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-full mx-auto flex items-center justify-center golden-ring">
            <User className="h-12 w-12 text-white" />
          </div>
          {lawyer.verified && (
            <div className="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1.5 shadow-lg golden-ring border-2">
              <Shield className="h-4 w-4 text-white" />
            </div>
          )}
          {/* مؤشر حالة الاتصال */}
          <div className={`absolute top-0 left-0 w-4 h-4 rounded-full border-2 border-white ${
            lawyer.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} title={formatLastSeen(lawyer.lastSeen)} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h3 className="font-bold text-lg text-center">{lawyer.name}</h3>
            {lawyer.verified && (
              <Badge className="text-xs bg-secondary/10 text-secondary border border-secondary/30">
                <Award className="h-3 w-3 ml-1" />
                مُوثق
              </Badge>
            )}
          </div>
          
          {/* Badge للتخصص */}
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 font-semibold">
            {lawyer.specialty}
          </Badge>
          
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{lawyer.location}</span>
          </div>
          
          {/* حالة الاتصال */}
          <div className="flex items-center justify-center gap-1 text-xs mt-2">
            <div className={`w-2 h-2 rounded-full ${lawyer.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className={lawyer.isOnline ? 'text-green-600 font-medium' : 'text-muted-foreground'}>
              {formatLastSeen(lawyer.lastSeen)}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4" onClick={(e) => e.stopPropagation()}>
        {/* نجوم التقييم بألوان ذهبية */}
        <div className="flex items-center justify-center gap-1 bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 rounded-lg p-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 star-golden ${
                  i < Math.floor(lawyer.rating) ? 'fill-current' : 'fill-none'
                }`}
              />
            ))}
          </div>
          <span className="font-bold text-lg mr-2">{lawyer.rating}</span>
          <span className="text-muted-foreground text-sm">({lawyer.reviews} تقييم)</span>
        </div>

        {/* عرض نسبة النجاح بشكل بصري */}
        <div className="space-y-2 bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-green-700">نسبة النجاح</span>
            <span className="font-bold text-green-600 text-lg">{lawyer.successRate}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-green-100">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${lawyer.successRate}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground text-center">
            {lawyer.cases} قضية مكتملة
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center p-2 bg-primary/5 rounded border border-primary/10">
            <div className="font-bold text-primary text-lg">{lawyer.cases}</div>
            <div className="text-xs text-muted-foreground">قضية</div>
          </div>
          <div className="text-center p-2 bg-secondary/5 rounded border border-secondary/10">
            <div className="font-bold text-secondary text-lg">{lawyer.experience}</div>
            <div className="text-xs text-muted-foreground">خبرة</div>
          </div>
        </div>

        <div className="text-center py-2 bg-primary/5 rounded-lg">
          <p className="text-lg font-bold text-primary">{lawyer.price}</p>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90" 
            size="sm"
            onClick={handleConsultation}
          >
            <MessageCircle className="h-3 w-3 ml-1" />
            استشارة
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-primary text-primary hover:bg-primary hover:text-white"
            onClick={handleCall}
          >
            <Phone className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LawyerCard;
