
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
    // قوانين ولوائح
    {
      id: 1,
      title: "نظام الشركات السعودي الجديد 2023",
      category: "قوانين",
      type: "PDF",
      size: "2.4 MB",
      downloads: 1250,
      description: "النسخة المحدثة من نظام الشركات في المملكة العربية السعودية",
      date: "2023-12-15",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
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
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
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
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
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
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    
    // نماذج العقود التجارية من Google Drive
    {
      id: 100,
      title: "عقد إيجار سيارة",
      category: "نماذج",
      type: "PDF",
      size: "151 KB",
      downloads: 245,
      description: "نموذج عقد إيجار سيارة مع كافة الشروط والبنود القانونية",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 101,
      title: "عقد بيع بشرط التجربة",
      category: "نماذج",
      type: "PDF",
      size: "195 KB",
      downloads: 312,
      description: "عقد بيع مع شرط التجربة للمنتجات والخدمات",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 102,
      title: "عقد بيع سيارة",
      category: "نماذج",
      type: "PDF",
      size: "140 KB",
      downloads: 523,
      description: "نموذج عقد بيع سيارة معتمد وشامل",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 103,
      title: "عقد تأجير مسكن",
      category: "نماذج",
      type: "PDF",
      size: "203 KB",
      downloads: 1834,
      description: "عقد تأجير سكني شامل لجميع البنود والشروط",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 104,
      title: "عقد تأسيس شركة ذات مسئولية محدودة",
      category: "نماذج",
      type: "PDF",
      size: "184 KB",
      downloads: 876,
      description: "نموذج قانوني لتأسيس شركة ذات مسئولية محدودة",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 105,
      title: "عقد تخزين بضائع",
      category: "نماذج",
      type: "PDF",
      size: "44 KB",
      downloads: 198,
      description: "عقد تخزين بضائع في المستودعات",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 106,
      title: "عقد تسويق",
      category: "نماذج",
      type: "PDF",
      size: "223 KB",
      downloads: 645,
      description: "عقد تسويق منتجات وخدمات تجارية",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 107,
      title: "عقد تصنيع وبيع بضائع",
      category: "نماذج",
      type: "PDF",
      size: "20 KB",
      downloads: 234,
      description: "نموذج عقد تصنيع وبيع البضائع التجارية",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 108,
      title: "عقد توريد",
      category: "نماذج",
      type: "PDF",
      size: "53 KB",
      downloads: 567,
      description: "عقد توريد سلع ومنتجات",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 109,
      title: "عقد توزيع",
      category: "نماذج",
      type: "PDF",
      size: "76 KB",
      downloads: 423,
      description: "عقد توزيع منتجات تجارية",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 110,
      title: "عقد توزيع إقليمي",
      category: "نماذج",
      type: "PDF",
      size: "46 KB",
      downloads: 312,
      description: "عقد توزيع إقليمي حصري",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 111,
      title: "عقد توزيع منتجات",
      category: "نماذج",
      type: "PDF",
      size: "200 KB",
      downloads: 489,
      description: "نموذج شامل لعقد توزيع المنتجات",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 112,
      title: "عقد حل وتصفية شركة بالاتفاق",
      category: "نماذج",
      type: "PDF",
      size: "133 KB",
      downloads: 276,
      description: "عقد حل وتصفية الشركات بالتراضي",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 113,
      title: "عقد رسمي لبيع حق انتفاع",
      category: "نماذج",
      type: "PDF",
      size: "157 KB",
      downloads: 198,
      description: "عقد بيع حق الانتفاع العقاري",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 114,
      title: "عقد شراكة",
      category: "نماذج",
      type: "PDF",
      size: "55 KB",
      downloads: 1245,
      description: "نموذج عقد شراكة تجارية",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 115,
      title: "عقد شركة تضامن",
      category: "نماذج",
      type: "PDF",
      size: "158 KB",
      downloads: 423,
      description: "عقد تأسيس شركة تضامن",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 116,
      title: "عقد شركة توصية بسيطة",
      category: "نماذج",
      type: "PDF",
      size: "166 KB",
      downloads: 334,
      description: "عقد تأسيس شركة توصية بسيطة",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 117,
      title: "عقد طبع ونشر",
      category: "نماذج",
      type: "PDF",
      size: "157 KB",
      downloads: 267,
      description: "عقد طبع ونشر مطبوعات وكتب",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 118,
      title: "عقد عمل",
      category: "نماذج",
      type: "PDF",
      size: "158 KB",
      downloads: 2134,
      description: "نموذج عقد عمل معتمد",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 119,
      title: "عقد عمل (نموذج 2)",
      category: "نماذج",
      type: "PDF",
      size: "149 KB",
      downloads: 1876,
      description: "نموذج عقد عمل بديل",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 120,
      title: "عقد فسخ عقد شراكة",
      category: "نماذج",
      type: "PDF",
      size: "21 KB",
      downloads: 345,
      description: "نموذج فسخ عقد الشراكة",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 121,
      title: "عقد قسمة بمعدل",
      category: "نماذج",
      type: "PDF",
      size: "192 KB",
      downloads: 289,
      description: "عقد قسمة أملاك بالتعديل",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 122,
      title: "عقد مشاركة لبناء عمارة سكنية",
      category: "نماذج",
      type: "PDF",
      size: "227 KB",
      downloads: 456,
      description: "عقد مشاركة في مشاريع البناء السكنية",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 123,
      title: "عقد مقاولة لإنشاء مبنى إداري",
      category: "نماذج",
      type: "PDF",
      size: "253 KB",
      downloads: 512,
      description: "عقد مقاولة لإنشاء مبنى إداري لمصنع",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 124,
      title: "عقد مقاولة مع مهندس",
      category: "نماذج",
      type: "PDF",
      size: "197 KB",
      downloads: 634,
      description: "عقد مقاولة مع مهندس لعمل تصميم ومقايسة",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 125,
      title: "عقد مقاولة",
      category: "نماذج",
      type: "PDF",
      size: "233 KB",
      downloads: 923,
      description: "نموذج عقد مقاولة عام",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 126,
      title: "عقد نشر كتاب",
      category: "نماذج",
      type: "PDF",
      size: "148 KB",
      downloads: 234,
      description: "عقد نشر كتاب مع دار النشر",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 127,
      title: "عقد هبة رسمي",
      category: "نماذج",
      type: "PDF",
      size: "150 KB",
      downloads: 445,
      description: "عقد هبة موثق رسمياً",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 128,
      title: "عقد وساطة",
      category: "نماذج",
      type: "PDF",
      size: "23 KB",
      downloads: 378,
      description: "عقد وساطة تجارية",
      date: "2020-03-03",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
    },
    {
      id: 129,
      title: "نموذج دعوى التعويض عن الأضرار",
      category: "نماذج",
      type: "DOCX",
      size: "320 KB",
      downloads: 1456,
      description: "نموذج قانوني لرفع دعوى التعويض عن الأضرار",
      date: "2023-07-10",
      url: "https://drive.google.com/drive/folders/1I3sXtJe5wEzi9siHbn2x1HbeZe_Ft1xT"
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
