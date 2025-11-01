
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Download, BookOpen, Scale, Eye } from "lucide-react";
import { useState } from "react";

const LegalLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const documents = [
    {
      id: 1,
      title: "نظام الشركات السعودي الجديد 2023",
      category: "قوانين",
      type: "PDF",
      size: "2.4 MB",
      downloads: 1250,
      description: "النسخة المحدثة من نظام الشركات في المملكة العربية السعودية",
      date: "2023-12-15",
      url: "/documents/companies-law-2023.pdf" // URL للملف - يجب استبداله بالرابط الحقيقي
    },
    {
      id: 2,
      title: "دليل قانون العمل الإماراتي",
      category: "أدلة",
      type: "PDF", 
      size: "1.8 MB",
      downloads: 890,
      description: "دليل شامل لقانون العمل في دولة الإمارات العربية المتحدة",
      date: "2023-11-20",
      url: "/documents/uae-labor-law-guide.pdf"
    },
    {
      id: 3,
      title: "نماذج العقود التجارية",
      category: "نماذج",
      type: "DOCX",
      size: "450 KB",
      downloads: 2100,
      description: "مجموعة من نماذج العقود التجارية المعتمدة",
      date: "2023-10-30",
      url: "/documents/commercial-contracts-templates.docx"
    },
    {
      id: 4,
      title: "قرارات محكمة التمييز في القضايا العقارية",
      category: "أحكام",
      type: "PDF",
      size: "3.2 MB",
      downloads: 567,
      description: "مجموعة من أهم القرارات القضائية في المجال العقاري",
      date: "2023-09-15",
      url: "/documents/real-estate-court-decisions.pdf"
    },
    {
      id: 5,
      title: "لائحة التحكيم التجاري الخليجي",
      category: "لوائح",
      type: "PDF",
      size: "1.1 MB",
      downloads: 432,
      description: "لائحة التحكيم المعتمدة في دول مجلس التعاون الخليجي",
      date: "2023-08-25",
      url: "/documents/gcc-arbitration-regulation.pdf"
    },
    {
      id: 6,
      title: "نموذج دعوى التعويض عن الأضرار",
      category: "نماذج",
      type: "DOCX",
      size: "320 KB",
      downloads: 1456,
      description: "نموذج قانوني لرفع دعوى التعويض عن الأضرار",
      date: "2023-07-10",
      url: "/documents/compensation-claim-template.docx"
    }
  ];

  const categories = [
    "الكل",
    "قوانين",
    "لوائح", 
    "أحكام",
    "نماذج",
    "أدلة",
    "مقالات"
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "الكل" || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (documentId: number) => {
    const document = documents.find(doc => doc.id === documentId);
    if (!document) return;

    // إنشاء عنصر a للتحميل المباشر
    const link = window.document.createElement('a');
    link.href = document.url;
    link.download = `${document.title}.${document.type.toLowerCase()}`;
    link.target = '_blank';
    
    // تنشيط التحميل
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const handlePreview = (documentId: number) => {
    const document = documents.find(doc => doc.id === documentId);
    if (!document) return;

    // فتح الملف في نافذة جديدة للمشاهدة
    window.open(document.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">المكتبة القانونية</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              مكتبة شاملة من القوانين واللوائح والأحكام والنماذج القانونية
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="ابحث في المكتبة القانونية..."
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
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              تم العثور على {filteredDocuments.length} مستند
            </p>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => (
              <Card key={document.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-primary">
                      {document.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{document.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {document.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">النوع</p>
                      <p className="font-medium">{document.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">الحجم</p>
                      <p className="font-medium">{document.size}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span>{document.downloads} تحميل</span>
                      </div>
                      <span className="text-muted-foreground">{document.date}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDownload(document.id)}
                      title="تحميل الملف مباشرة"
                    >
                      <Download className="h-4 w-4 ml-1" />
                      تحميل
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePreview(document.id)}
                      title="معاينة الملف"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">لم يتم العثور على مستندات تطابق البحث</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
              >
                إعادة تعيين البحث
              </Button>
            </div>
          )}

          {/* Info Sections */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">قوانين محدثة</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  نوفر أحدث القوانين واللوائح المعتمدة في جميع البلدان العربية
                </p>
                <Button variant="outline">
                  تصفح القوانين
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-secondary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-8 w-8 text-secondary" />
                  <h3 className="text-xl font-bold">نماذج جاهزة</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  مجموعة شاملة من النماذج والعقود القانونية الجاهزة للاستخدام
                </p>
                <Button variant="outline">
                  تصفح النماذج
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Request Section */}
          <div className="mt-12 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">لم تجد ما تبحث عنه؟</h2>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              يمكنك طلب إضافة قانون أو لائحة أو نموذج معين إلى مكتبتنا القانونية
            </p>
            <Button variant="secondary" size="lg">
              طلب إضافة مستند
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LegalLibrary;
