import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, User, FileText, BookOpen, Scale, Star, MapPin, Filter } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || "");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Mock search results
  const searchResults = {
    lawyers: [
      {
        id: 1,
        name: "د. أحمد محمد العلي",
        specialty: "القانون التجاري",
        rating: 4.9,
        location: "الرياض، السعودية",
        price: "500 ريال/ساعة"
      },
      {
        id: 2,
        name: "د. فاطمة سالم الزهراني", 
        specialty: "قانون الأسرة",
        rating: 4.8,
        location: "دبي، الإمارات",
        price: "400 ريال/ساعة"
      }
    ],
    services: [
      {
        id: 1,
        title: "استشارة قانونية فورية",
        description: "احصل على استشارة قانونية سريعة من محامين متخصصين",
        category: "استشارات",
        price: "من 200 ريال"
      },
      {
        id: 2,
        title: "صياغة العقود التجارية",
        description: "صياغة ومراجعة العقود والاتفاقيات القانونية",
        category: "عقود",
        price: "من 500 ريال"
      }
    ],
    articles: [
      {
        id: 1,
        title: "دليل شامل لتأسيس الشركات في السعودية",
        excerpt: "تعرف على الخطوات الأساسية والمتطلبات القانونية...",
        category: "قانون الشركات",
        readTime: "8 دقائق"
      },
      {
        id: 2,
        title: "حقوق العمال في قانون العمل الجديد",
        excerpt: "استعراض شامل لأهم التعديلات على قانون العمل...",
        category: "قانون العمل",
        readTime: "6 دقائق"
      }
    ],
    documents: [
      {
        id: 1,
        title: "نظام الشركات السعودي الجديد",
        type: "PDF",
        category: "قوانين",
        size: "2.4 MB"
      },
      {
        id: 2,
        title: "نماذج العقود التجارية",
        type: "DOCX", 
        category: "نماذج",
        size: "450 KB"
      }
    ]
  };

  const categories = [
    "الكل",
    "محامين",
    "خدمات",
    "مقالات",
    "مستندات"
  ];

  const handleSearch = () => {
    // Update URL with search term
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const getTotalResults = () => {
    return searchResults.lawyers.length + 
           searchResults.services.length + 
           searchResults.articles.length + 
           searchResults.documents.length;
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">البحث في المنصة</h1>
              <p className="text-muted-foreground text-lg">
                ابحث عن المحامين والخدمات والمعلومات القانونية
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="ابحث عن محامين، خدمات، مقالات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-12 text-lg py-6"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
                <Button onClick={handleSearch} size="lg">
                  <SearchIcon className="h-5 w-5 ml-2" />
                  بحث
                </Button>
              </div>
            </div>

            {/* Search Results */}
            {searchTerm && (
              <>
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    تم العثور على {getTotalResults()} نتيجة للبحث "{searchTerm}"
                  </p>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all">الكل ({getTotalResults()})</TabsTrigger>
                    <TabsTrigger value="lawyers">محامين ({searchResults.lawyers.length})</TabsTrigger>
                    <TabsTrigger value="services">خدمات ({searchResults.services.length})</TabsTrigger>
                    <TabsTrigger value="articles">مقالات ({searchResults.articles.length})</TabsTrigger>
                    <TabsTrigger value="documents">مستندات ({searchResults.documents.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-6">
                    <div className="space-y-8">
                      {/* Lawyers Section */}
                      <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">المحامين</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {searchResults.lawyers.map((lawyer) => (
                            <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                              <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <User className="h-6 w-6 text-primary" />
                                  </div>
                                  <div>
                                    <h3 className="font-bold">{lawyer.name}</h3>
                                    <p className="text-sm text-muted-foreground">{lawyer.specialty}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                      <span>{lawyer.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      <span>{lawyer.location}</span>
                                    </div>
                                  </div>
                                  <span className="font-medium text-primary">{lawyer.price}</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Services Section */}
                      <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">الخدمات</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {searchResults.services.map((service) => (
                            <Card key={service.id} className="hover:shadow-lg transition-shadow">
                              <CardContent className="p-6">
                                <div className="flex items-start gap-3">
                                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                                    <Scale className="h-6 w-6 text-secondary" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="font-bold">{service.title}</h3>
                                      <Badge variant="outline">{service.category}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                                    <span className="font-medium text-primary">{service.price}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Articles Section */}
                      <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">المقالات</h2>
                        <div className="space-y-4">
                          {searchResults.articles.map((article) => (
                            <Card key={article.id} className="hover:shadow-lg transition-shadow">
                              <CardContent className="p-6">
                                <div className="flex items-start gap-3">
                                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <BookOpen className="h-6 w-6 text-green-600" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="font-bold">{article.title}</h3>
                                      <Badge variant="outline">{article.category}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{article.excerpt}</p>
                                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Documents Section */}
                      <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">المستندات</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {searchResults.documents.map((document) => (
                            <Card key={document.id} className="hover:shadow-lg transition-shadow">
                              <CardContent className="p-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-blue-600" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-bold">{document.title}</h3>
                                      <Badge variant="outline">{document.category}</Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                      <span>{document.type}</span>
                                      <span>{document.size}</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="lawyers" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.lawyers.map((lawyer) => (
                        <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="text-center mb-4">
                              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <User className="h-8 w-8 text-primary" />
                              </div>
                              <h3 className="font-bold text-lg">{lawyer.name}</h3>
                              <p className="text-muted-foreground">{lawyer.specialty}</p>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  <span>{lawyer.rating}</span>
                                </div>
                                <span className="font-medium text-primary">{lawyer.price}</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{lawyer.location}</span>
                              </div>
                            </div>
                            <Button className="w-full mt-4">عرض الملف الشخصي</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="services" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.services.map((service) => (
                        <Card key={service.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-secondary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <Scale className="h-8 w-8 text-secondary" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">{service.title}</h3>
                                <p className="text-muted-foreground">{service.description}</p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary">{service.category}</Badge>
                                <span className="font-medium text-primary">{service.price}</span>
                              </div>
                            </div>
                            <Button className="w-full mt-4">طلب الخدمة</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="articles" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.articles.map((article) => (
                        <Card key={article.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <BookOpen className="h-8 w-8 text-green-600" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">{article.title}</h3>
                                <p className="text-muted-foreground">{article.excerpt}</p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary">{article.category}</Badge>
                                <span className="font-medium text-primary">{article.readTime}</span>
                              </div>
                            </div>
                            <Button className="w-full mt-4">قراءة المزيد</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.documents.map((document) => (
                        <Card key={document.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <FileText className="h-8 w-8 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">{document.title}</h3>
                                <p className="text-muted-foreground">{document.category}</p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary">{document.type}</Badge>
                                <span className="font-medium text-primary">{document.size}</span>
                              </div>
                            </div>
                            <Button className="w-full mt-4">تحميل المستند</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}

            {/* No Results */}
            {searchTerm && getTotalResults() === 0 && (
              <div className="text-center py-12">
                <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-muted-foreground mb-2">لا توجد نتائج</h2>
                <p className="text-muted-foreground mb-6">
                  لم نتمكن من العثور على نتائج تطابق بحثك "{searchTerm}"
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>جرب:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>التأكد من الإملاء</li>
                    <li>استخدام كلمات مختلفة</li>
                    <li>البحث بمصطلحات أعم</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {!searchTerm && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary mb-6">عمليات البحث الشائعة</h2>
                <div className="flex flex-wrap gap-3 justify-center">
                  {["محامي تجاري", "قانون العمل", "استشارة قانونية", "صياغة عقود", "قانون الأسرة", "تأسيس شركة"].map((term) => (
                    <Button 
                      key={term}
                      variant="outline"
                      onClick={() => {
                        setSearchTerm(term);
                        handleSearch();
                      }}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
