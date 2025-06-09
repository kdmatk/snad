
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const CasesManagement = () => {
  const cases = [
    {
      id: 1,
      title: "نزاع تجاري بين شركتين",
      client: "شركة النور التجارية",
      category: "تجاري",
      budget: "5000-8000",
      status: "open",
      urgency: "high",
      bids: 8,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "قضية طلاق وحضانة أطفال",
      client: "فاطمة الأحمد",
      category: "أسرة",
      budget: "2000-3000",
      status: "assigned",
      urgency: "normal",
      bids: 12,
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      title: "نزاع عقاري حول ملكية أرض",
      client: "محمد السعدي",
      category: "عقاري",
      budget: "10000-15000",
      status: "in_progress",
      urgency: "urgent",
      bids: 5,
      createdAt: "2024-01-13"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { label: "مفتوحة", variant: "default" as const, color: "text-blue-600" },
      assigned: { label: "مُسندة", variant: "secondary" as const, color: "text-yellow-600" },
      in_progress: { label: "قيد التنفيذ", variant: "outline" as const, color: "text-purple-600" },
      completed: { label: "مكتملة", variant: "default" as const, color: "text-green-600" },
      cancelled: { label: "ملغية", variant: "destructive" as const, color: "text-red-600" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      low: { label: "منخفضة", color: "text-green-600 bg-green-50" },
      normal: { label: "عادية", color: "text-blue-600 bg-blue-50" },
      high: { label: "عالية", color: "text-yellow-600 bg-yellow-50" },
      urgent: { label: "عاجلة", color: "text-red-600 bg-red-50" }
    };
    
    const config = urgencyConfig[urgency as keyof typeof urgencyConfig];
    return (
      <Badge className={config.color}>
        {urgency === 'urgent' && <AlertTriangle className="h-3 w-3 ml-1" />}
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة القضايا والمزادات</h2>
          <p className="text-muted-foreground">مراقبة وإدارة القضايا المطروحة في المنصة</p>
        </div>
      </div>

      {/* إحصائيات القضايا */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">89</div>
            <div className="text-sm text-muted-foreground">القضايا المفتوحة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">45</div>
            <div className="text-sm text-muted-foreground">القضايا المُسندة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">67</div>
            <div className="text-sm text-muted-foreground">قيد التنفيذ</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">234</div>
            <div className="text-sm text-muted-foreground">مكتملة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">12</div>
            <div className="text-sm text-muted-foreground">عاجلة</div>
          </CardContent>
        </Card>
      </div>

      {/* جدول القضايا */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة القضايا النشطة</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان القضية</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead>الميزانية</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الأولوية</TableHead>
                <TableHead>العروض</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell>
                    <div className="font-medium">{case_.title}</div>
                  </TableCell>
                  <TableCell>{case_.client}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{case_.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>{case_.budget} ريال</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(case_.status)}</TableCell>
                  <TableCell>{getUrgencyBadge(case_.urgency)}</TableCell>
                  <TableCell>
                    <span className="font-medium">{case_.bids} عرض</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(case_.createdAt).toLocaleDateString('ar-SA')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CasesManagement;
