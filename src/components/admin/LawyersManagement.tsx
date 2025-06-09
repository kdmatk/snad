import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import LawyerApprovalDialog from './LawyerApprovalDialog';
import AddLawyerDialog from './AddLawyerDialog';
import { useSupabaseLawyers } from '@/hooks/useSupabaseLawyers';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Check, 
  X,
  Star,
  Phone,
  Mail,
  Loader2
} from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  specialty: string;
  license_number: string;
  registration_status: string;
  rating: number | null;
  total_cases: number | null;
  avatar_url: string | null;
  created_at: string;
  bio?: string | null;
  experience_years?: number | null;
}

const LawyersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const { addLawyer } = useSupabaseLawyers();

  useEffect(() => {
    loadLawyers();
  }, []);

  const loadLawyers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lawyers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLawyers(data || []);
    } catch (error) {
      console.error('Error loading lawyers:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات المحامين",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewLawyer = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setDialogOpen(true);
  };

  const handleAddLawyer = async (lawyerData: any) => {
    await addLawyer(lawyerData);
    loadLawyers();
  };

  const handleApproveLawyer = async (lawyerId: string) => {
    try {
      const { error } = await supabase
        .from('lawyers')
        .update({ 
          registration_status: 'approved',
          license_verified: true
        })
        .eq('id', lawyerId);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم قبول طلب المحامي",
      });

      loadLawyers();
    } catch (error) {
      console.error('Error approving lawyer:', error);
      toast({
        title: "خطأ",
        description: "فشل في قبول الطلب",
        variant: "destructive",
      });
    }
  };

  const handleRejectLawyer = async (lawyerId: string) => {
    try {
      const { error } = await supabase
        .from('lawyers')
        .update({ registration_status: 'rejected' })
        .eq('id', lawyerId);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم رفض طلب المحامي",
      });

      loadLawyers();
    } catch (error) {
      console.error('Error rejecting lawyer:', error);
      toast({
        title: "خطأ",
        description: "فشل في رفض الطلب",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { label: "معتمد", variant: "default" as const },
      pending: { label: "قيد المراجعة", variant: "secondary" as const },
      rejected: { label: "مرفوض", variant: "destructive" as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "secondary" as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lawyer.registration_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: lawyers.length,
    approved: lawyers.filter(l => l.registration_status === 'approved').length,
    pending: lawyers.filter(l => l.registration_status === 'pending').length,
    rejected: lawyers.filter(l => l.registration_status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="mr-2">جاري تحميل البيانات...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">إدارة المحامين</h2>
          <p className="text-muted-foreground">عرض وإدارة المحامين المسجلين في المنصة</p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة محامي جديد
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-muted-foreground">إجمالي المحامين</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-muted-foreground">معتمد</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">قيد المراجعة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-muted-foreground">مرفوض</div>
          </CardContent>
        </Card>
      </div>

      {/* أدوات البحث والتصفية */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث بالاسم أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 ml-2" />
                تصفية
              </Button>
              <select 
                className="px-4 py-2 border rounded-md bg-background"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">جميع الحالات</option>
                <option value="approved">معتمد</option>
                <option value="pending">قيد المراجعة</option>
                <option value="rejected">مرفوض</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* جدول المحامين */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المحامين ({filteredLawyers.length})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المحامي</TableHead>
                <TableHead className="hidden md:table-cell">التخصص</TableHead>
                <TableHead className="hidden lg:table-cell">رقم الترخيص</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="hidden md:table-cell">التقييم</TableHead>
                <TableHead className="hidden lg:table-cell">القضايا</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLawyers.map((lawyer) => (
                <TableRow key={lawyer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={lawyer.avatar_url || undefined} />
                        <AvatarFallback>{lawyer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{lawyer.name}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {lawyer.specialty}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 md:hidden">
                          <Mail className="h-3 w-3" />
                          {lawyer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{lawyer.specialty}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="font-mono text-sm">{lawyer.license_number}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(lawyer.registration_status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{lawyer.rating || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{lawyer.total_cases || 0}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewLawyer(lawyer)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {lawyer.registration_status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-green-600"
                            onClick={() => handleApproveLawyer(lawyer.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-600"
                            onClick={() => handleRejectLawyer(lawyer.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredLawyers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد بيانات مطابقة للبحث
            </div>
          )}
        </CardContent>
      </Card>

      <LawyerApprovalDialog
        lawyer={selectedLawyer}
        isOpen={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedLawyer(null);
        }}
        onApprove={handleApproveLawyer}
        onReject={handleRejectLawyer}
      />

      <AddLawyerDialog
        isOpen={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSave={handleAddLawyer}
      />
    </div>
  );
};

export default LawyersManagement;
