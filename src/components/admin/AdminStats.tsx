
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserCheck, 
  DollarSign, 
  TrendingUp, 
  Scale, 
  MessageCircle,
  Star,
  AlertTriangle
} from "lucide-react";

const AdminStats = () => {
  const stats = [
    {
      title: "إجمالي المحامين",
      value: "248",
      change: "+12%",
      changeType: "positive",
      icon: UserCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "العملاء النشطين",
      value: "1,205",
      change: "+8%",
      changeType: "positive",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "الإيرادات الشهرية",
      value: "125,500 ريال",
      change: "+25%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "القضايا النشطة",
      value: "89",
      change: "+5%",
      changeType: "positive",
      icon: Scale,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "الاستشارات اليومية",
      value: "156",
      change: "+18%",
      changeType: "positive",
      icon: MessageCircle,
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    {
      title: "متوسط التقييم",
      value: "4.8",
      change: "+0.2",
      changeType: "positive",
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "الطلبات المعلقة",
      value: "23",
      change: "-8%",
      changeType: "negative",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "معدل النمو",
      value: "15.2%",
      change: "+3%",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className={`h-3 w-3 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`} />
                    <span className={`text-sm ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">من الشهر الماضي</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminStats;
