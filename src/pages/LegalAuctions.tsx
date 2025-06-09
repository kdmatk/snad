
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Clock, DollarSign, Users, Search, Filter } from "lucide-react";
import { useState } from "react";

const LegalAuctions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const auctions = [
    {
      id: 1,
      title: "قضية تجارية - نزاع شراكة تجارية",
      category: "تجاري",
      description: "نزاع بين شركاء في شركة تجارية حول توزيع الأرباح والمسؤوليات",
      budget: "5,000 - 10,000 ريال",
      deadline: "2024-01-25",
      bidsCount: 8,
      status: "مفتوح",
      timeLeft: "3 أيام",
      client: "شركة النور التجارية",
      requirements: ["خبرة في القانون التجاري", "سجل ناجح في قضايا الشراكات"]
    },
    {
      id: 2,
      title: "قضية عقارية - نزاع ملكية",
      category: "عقاري",
      description: "نزاع حول ملكية قطعة أرض بين ورثة",
      budget: "3,000 - 7,000 ريال",
      deadline: "2024-01-22",
      bidsCount: 12,
      status: "مفتوح",
      timeLeft: "يوم واحد",
      client: "عائلة الأحمد",
      requirements: ["تخصص في القانون العقاري", "خبرة في قضايا الميراث"]
    },
    {
      id: 3,
      title: "استشارة قانونية - تأسيس شركة",
      category: "استشارات",
      description: "استشارة شاملة لتأسيس شركة تقنية والامتثال القانوني",
      budget: "2,000 - 4,000 ريال",
      deadline: "2024-01-20",
      bidsCount: 15,
      status: "مغلق",
      timeLeft: "انتهى",
      client: "شركة تك الرياض",
      requirements: ["خبرة في قانون الشركات", "معرفة بالقوانين التقنية"]
    },
    {
      id: 4,
      title: "قضية عمالية - فصل تعسفي",
      category: "عمالي",
      description: "قضية فصل تعسفي لموظف وطالب بالتعويض",
      budget: "4,000 - 8,000 ريال",
      deadline: "2024-01-28",
      bidsCount: 6,
      status: "مفتوح",
      timeLeft: "5 أيام",
      client: "محمد الخالد",
      requirements: ["تخصص في قانون العمل", "خبرة في قضايا الفصل التعسفي"]
    }
  ];

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
    "مفتوح",
    "مغلق",
    "قيد التقييم"
  ];

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "الكل" || auction.category === selectedCategory;
    const matchesStatus = !selectedStatus || selectedStatus === "الكل" || auction.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handlePlaceBid = (auctionId: number) => {
    alert(`سيتم توجيهك لصفحة تقديم العطاء للمزاد رقم ${auctionId}`);
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">المزادات القانونية</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              شارك في مزادات القضايا والخدمات القانونية واعرض خدماتك المهنية
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              تم العثور على {filteredAuctions.length} مزاد
            </p>
          </div>

          {/* Auctions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAuctions.map((auction) => (
              <Card key={auction.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{auction.title}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="border-primary/20 text-primary">
                          {auction.category}
                        </Badge>
                        <Badge 
                          variant={auction.status === 'مفتوح' ? 'default' : 'secondary'}
                          className={auction.status === 'مفتوح' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {auction.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{auction.budget}</div>
                      <div className="text-sm text-muted-foreground">الميزانية المقترحة</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {auction.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{auction.timeLeft}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{auction.bidsCount} عطاء</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">العميل: {auction.client}</p>
                    <p className="text-xs text-muted-foreground">آخر موعد: {auction.deadline}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">المتطلبات:</p>
                    <ul className="space-y-1">
                      {auction.requirements.map((req, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                          <Scale className="h-3 w-3 text-primary" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="flex-1"
                      disabled={auction.status !== 'مفتوح'}
                      onClick={() => handlePlaceBid(auction.id)}
                    >
                      {auction.status === 'مفتوح' ? 'تقديم عطاء' : 'مغلق'}
                    </Button>
                    <Button variant="outline" size="sm">
                      تفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAuctions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لم يتم العثور على مزادات تطابق البحث</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setSelectedStatus("");
                }}
              >
                إعادة تعيين الفلاتر
              </Button>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">كيف تعمل المزادات؟</h2>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>1. تصفح المزادات المتاحة</li>
                  <li>2. اقرأ تفاصيل القضية والمتطلبات</li>
                  <li>3. قدم عطاءك مع عرض السعر والخطة</li>
                  <li>4. انتظر قرار العميل</li>
                  <li>5. ابدأ العمل عند القبول</li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">لماذا المزادات؟</h2>
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
