
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search, Clock, User, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const articles = [
    {
      id: 1,
      title: "دليل شامل لتأسيس الشركات في السعودية 2024",
      category: "قانون الشركات",
      excerpt: "تعرف على الخطوات الأساسية والمتطلبات القانونية لتأسيس شركة في المملكة العربية السعودية وفقاً للأنظمة الجديدة...",
      author: "د. أحمد محمد العلي",
      readTime: "8 دقائق",
      views: 2450,
      publishDate: "2024-01-15",
      image: "/placeholder.svg",
      featured: true
    },
    {
      id: 2,
      title: "حقوق العمال في قانون العمل الإماراتي الجديد",
      category: "قانون العمل",
      excerpt: "استعراض شامل لأهم التعديلات على قانون العمل الإماراتي وما يعنيه للعمال وأصحاب العمل...",
      author: "د. فاطمة سالم الزهراني",
      readTime: "6 دقائق",
      views: 1890,
      publishDate: "2024-01-12",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "التحكيم التجاري: البديل الأمثل لحل النزاعات",
      category: "التحكيم",
      excerpt: "فوائد التحكيم التجاري ومتى يكون الخيار الأفضل لحل النزاعات التجارية بدلاً من اللجوء للمحاكم...",
      author: "د. محمود علي الخطيب",
      readTime: "10 دقائق",
      views: 1234,
      publishDate: "2024-01-08",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "قانون حماية البيانات الشخصية في دول الخليج",
      category: "قانون التقنية",
      excerpt: "نظرة على قوانين حماية البيانات الشخصية في دول مجلس التعاون الخليجي وتأثيرها على الشركات...",
      author: "د. خالد الأحمد",
      readTime: "7 دقائق",
      views: 1567,
      publishDate: "2024-01-05",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "الطلاق الخلعي: الإجراءات والحقوق",
      category: "قانون الأسرة",
      excerpt: "دليل تفصيلي عن الطلاق الخلعي في الشريعة الإسلامية والأنظمة العربية، الإجراءات والحقوق المترتبة...",
      author: "د. عائشة المطيري",
      readTime: "9 دقائق",
      views: 2890,
      publishDate: "2024-01-03",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "العقود الذكية والقانون: تحديات وفرص",
      category: "قانون التقنية",
      excerpt: "كيف تؤثر تقنية البلوك تشين والعقود الذكية على الممارسات القانونية التقليدية...",
      author: "د. سارة الكندي",
      readTime: "12 دقائق",
      views: 987,
      publishDate: "2023-12-28",
      image: "/placeholder.svg"
    }
  ];

  const categories = [
    "الكل",
    "قانون الشركات",
    "قانون العمل",
    "قانون الأسرة",
    "قانون التقنية",
    "التحكيم",
    "القانون العقاري",
    "القانون الجنائي"
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "الكل" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const handleReadMore = (articleId: number) => {
    alert(`سيتم توجيهك لقراءة المقال رقم ${articleId}`);
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">المقالات القانونية</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              مقالات ونصائح قانونية من خبراء القانون في الوطن العربي
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="ابحث في المقالات..."
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

          {/* Featured Article */}
          {featuredArticle && (
            <Card className="mb-8 shadow-xl border-0 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 flex items-center">
                  <BookOpen className="h-24 w-24 text-primary" />
                </div>
                <div className="p-8">
                  <Badge className="mb-4 bg-secondary text-white">مقال مميز</Badge>
                  <h2 className="text-2xl font-bold mb-4">{featuredArticle.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{featuredArticle.views}</span>
                    </div>
                  </div>
                  <Button onClick={() => handleReadMore(featuredArticle.id)}>
                    اقرأ المقال
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              تم العثور على {filteredArticles.length} مقال
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary" />
                </div>
                
                <CardHeader className="pb-4">
                  <Badge variant="outline" className="border-primary/20 text-primary w-fit mb-2">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      <span>{article.views} مشاهدة</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{article.publishDate}</span>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleReadMore(article.id)}
                  >
                    اقرأ المقال
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">لم يتم العثور على مقالات تطابق البحث</p>
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

          {/* Newsletter Section */}
          <div className="mt-12 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">اشترك في النشرة الإخبارية القانونية</h2>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              احصل على أحدث المقالات والنصائح القانونية مباشرة في بريدك الإلكتروني
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="بريدك الإلكتروني"
                className="bg-white text-black"
              />
              <Button variant="secondary">
                اشتراك
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Articles;
