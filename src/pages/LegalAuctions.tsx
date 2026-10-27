import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Clock, Users, Search, Filter, Eye, Gavel } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import CaseCard from "@/components/cases/CaseCard";
import { Loader2 } from "lucide-react";

const LegalAuctions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // جلب القضايا المتاحة للمزاد
  const { data: auctions, isLoading } = useQuery({
    queryKey: ["legal-auctions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_cases")
        .select("*")
        .eq("is_auction", true)
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // جلب عدد العروض لكل قضية
  const { data: bidsCount } = useQuery({
    queryKey: ["auctions-bids-count", auctions?.map(a => a.id)],
    queryFn: async () => {
      if (!auctions || auctions.length === 0) return {};

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
    enabled: !!auctions && auctions.length > 0,
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

  const filteredAuctions = auctions?.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "الكل" || auction.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">طلبات عروض المحامين</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              تصفح طلبات الخدمات القانونية واطلع على متطلباتها
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="ابحث في المزادات..."
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
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Filter className="h-4 w-4 ml-2" />
                فلترة متقدمة
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              تم العثور على {filteredAuctions?.length || 0} مزاد متاح
            </p>
          </div>

          {/* Auctions Grid */}
          {filteredAuctions && filteredAuctions.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAuctions.map((auction) => (
                <CaseCard
                  key={auction.id}
                  caseData={auction}
                  bidsCount={bidsCount?.[auction.id] || 0}
                  isOwner={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                {auctions?.length === 0 
                  ? "لا توجد طلبات عروض متاحة حاليًا"
                  : "لم يتم العثور على مزادات تطابق البحث"
                }
              </p>
              {auctions && auctions.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                  }}
                >
                  إعادة تعيين الفلاتر
                </Button>
              )}
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">كيف تعمل عروض المحامين؟</h2>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>1. تصفح المزادات المتاحة</li>
                  <li>2. اقرأ تفاصيل القضية والمتطلبات</li>
                  <li>3. قدم عطاءك مع عرض السعر والخطة</li>
                  <li>4. انتظر قرار العميل</li>
                  <li>5. ابدأ العمل عند القبول</li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">لماذا طلب عروض؟</h2>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• منافسة عادلة وشفافة</li>
                  <li>• أسعار تنافسية</li>
                  <li>• حماية حقوق الطرفين</li>
                  <li>• جودة عالية في الخدمات</li>
                  <li>• نظام تقييم موثوق</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LegalAuctions;
