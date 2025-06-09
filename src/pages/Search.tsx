
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, Star, User, Shield, MapPin, Phone, MessageCircle, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const lawyers = [
    {
      id: 1,
      name: "د. أحمد محمد العلي",
      specialty: "القانون التجاري",
      experience: "15 سنة",
      rating: 4.9,
      reviews: 245,
      location: "الرياض، السعودية",
      verified: true,
      price: "500 ريال/ساعة",
      description: "خبير في القانون التجاري والشركات مع سجل حافل من القضايا الناجحة",
      phone: "+966501234567",
      cases: 156,
      successRate: 95
    },
    {
      id: 2,
      name: "د. فاطمة سالم الزهراني",
      specialty: "قانون الأسرة",
      experience: "12 سنة",
      rating: 4.8,
      reviews: 189,
      location: "دبي، الإمارات",
      verified: true,
      price: "400 ريال/ساعة",
      description: "متخصصة في قضايا الأسرة والأحوال الشخصية",
      phone: "+971501234567",
      cases: 123,
      successRate: 92
    }
  ];

  const filteredLawyers = lawyers.filter(lawyer => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return lawyer.name.toLowerCase().includes(searchLower) ||
           lawyer.specialty.toLowerCase().includes(searchLower) ||
           lawyer.description.toLowerCase().includes(searchLower);
  });

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleConsultation = (lawyer: typeof lawyers[0]) => {
    navigate(`/instant-consultation?lawyer=${lawyer.id}`);
  };

  const handleCall = (lawyer: typeof lawyers[0]) => {
    window.open(`tel:${lawyer.phone}`, '_self');
  };

  const handleViewProfile = (lawyer: typeof lawyers[0]) => {
    navigate(`/lawyer/${lawyer.id}`);
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">نتائج البحث</h1>
            <p className="text-muted-foreground text-lg">
              {searchTerm ? `البحث عن: "${searchTerm}"` : 'جميع النتائج'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="ابحث عن محامي أو تخصص..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pr-10"
                />
              </div>
              <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
                بحث
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              تم العثور على {filteredLawyers.length} نتيجة
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLawyers.map((lawyer) => (
              <Card 
                key={lawyer.id} 
                className="hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg hover:-translate-y-2 cursor-pointer"
                onClick={() => handleViewProfile(lawyer)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto flex items-center justify-center">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    {lawyer.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <h3 className="font-bold text-lg text-center">{lawyer.name}</h3>
                      {lawyer.verified && (
                        <Badge variant="secondary" className="text-xs bg-secondary/10 text-secondary border-secondary/20">
                          مُوثق
                        </Badge>
                      )}
                    </div>
                    <p className="text-secondary font-semibold">{lawyer.specialty}</p>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{lawyer.location}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4" onClick={(e) => e.stopPropagation()}>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-bold text-primary">{lawyer.cases}</div>
                      <div className="text-muted-foreground">قضية</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-bold text-green-600">{lawyer.successRate}%</div>
                      <div className="text-muted-foreground">نجاح</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-bold">{lawyer.rating}</span>
                      <span className="text-muted-foreground">({lawyer.reviews})</span>
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium">{lawyer.experience}</span>
                    </div>
                  </div>

                  <div className="text-center py-2 bg-primary/5 rounded-lg">
                    <p className="text-lg font-bold text-primary">{lawyer.price}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90" 
                      size="sm"
                      onClick={() => handleConsultation(lawyer)}
                    >
                      <MessageCircle className="h-3 w-3 ml-1" />
                      استشارة
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => handleCall(lawyer)}
                    >
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLawyers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لم يتم العثور على نتائج تطابق البحث</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  navigate('/lawyers');
                }}
              >
                تصفح جميع المحامين
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
