import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import CaseCard from "@/components/cases/CaseCard";
import CreateCaseDialog from "@/components/cases/CreateCaseDialog";
import { Loader2 } from "lucide-react";

const MyCases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const { data: cases, isLoading, refetch } = useQuery({
    queryKey: ["my-cases"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("يجب تسجيل الدخول");

      const { data, error } = await supabase
        .from("legal_cases")
        .select("*")
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // جلب عدد العروض لكل قضية
  const { data: bidsCount } = useQuery({
    queryKey: ["cases-bids-count", cases?.map(c => c.id)],
    queryFn: async () => {
      if (!cases || cases.length === 0) return {};

      const { data, error } = await supabase
        .from("case_bids")
        .select("case_id");

      if (error) throw error;

      const counts: { [key: string]: number } = {};
      data.forEach((bid) => {
        counts[bid.case_id] = (counts[bid.case_id] || 0) + 1;
      });

      return counts;
    },
    enabled: !!cases && cases.length > 0,
  });

  const categories = [
    "الكل",
    "تجاري",
    "عقاري",
    "عمالي",
    "جنائي",
    "أسرة",
    "استشارات",
    "تحكيم"
  ];

  const statusOptions = [
    "الكل",
    "open",
    "assigned",
    "in_progress",
    "completed",
    "closed"
  ];

  const filteredCases = cases?.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "الكل" || caseItem.category === selectedCategory;
    const matchesStatus = !selectedStatus || selectedStatus === "الكل" || caseItem.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">قضاياي</h1>
              <p className="text-muted-foreground">
                إدارة قضاياك ومتابعة العروض المقدمة من المحامين
              </p>
            </div>
            <CreateCaseDialog onSuccess={() => refetch()} />
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="ابحث في القضايا..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Filter className="h-4 w-4 ml-2" />
                فلترة متقدمة
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredCases?.length || 0} قضية
            </p>
          </div>

          {/* Cases Grid */}
          {filteredCases && filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  caseData={caseItem}
                  bidsCount={bidsCount?.[caseItem.id] || 0}
                  isOwner={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                {cases?.length === 0 
                  ? "لم تقم بإنشاء أي قضية بعد"
                  : "لم يتم العثور على قضايا تطابق البحث"
                }
              </p>
              {cases?.length === 0 && (
                <CreateCaseDialog onSuccess={() => refetch()} />
              )}
              {cases && cases.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setSelectedStatus("");
                  }}
                >
                  إعادة تعيين الفلاتر
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyCases;
