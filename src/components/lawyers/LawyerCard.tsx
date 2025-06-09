
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, Shield, MapPin, Phone, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Lawyer } from "@/hooks/useLawyersData";

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
      className="hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg hover:-translate-y-2 cursor-pointer"
      onClick={handleViewProfile}
    >
      <CardHeader className="text-center pb-4">
        <div className="relative mx-auto mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          {lawyer.verified && (
            <div className="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1">
              <Shield className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h3 className="font-bold text-lg text-center">{lawyer.name}</h3>
            {lawyer.verified && (
              <Badge variant="secondary" className="text-xs bg-secondary/10 text-secondary border-secondary/20">
                مُوثق
              </Badge>
            )}
          </div>
          <p className="text-secondary font-semibold">{lawyer.specialty}</p>
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{lawyer.location}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-bold text-primary">{lawyer.cases}</div>
            <div className="text-muted-foreground">قضية</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-bold text-green-600">{lawyer.successRate}%</div>
            <div className="text-muted-foreground">نجاح</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="font-bold">{lawyer.rating}</span>
            <span className="text-muted-foreground">({lawyer.reviews})</span>
          </div>
          <div className="text-muted-foreground">
            <span className="font-medium">{lawyer.experience}</span>
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
