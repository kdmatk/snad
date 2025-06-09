
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Shield, Clock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/lawyers');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            منصة <span className="text-secondary">سند</span>
            <br />
            للخدمات القانونية
          </h1>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            اعثر على أفضل المحامين المتخصصين في الوطن العربي واحصل على استشارات قانونية موثوقة
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Input
                placeholder="ابحث عن محامي أو خدمة قانونية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-white text-black border-0 text-right"
              />
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={handleSearch}
              >
                <Search className="ml-2 h-5 w-5" />
                بحث
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-secondary ml-2" />
                <span className="text-2xl font-bold">2500+</span>
              </div>
              <p className="opacity-90">محامي مُسجل</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-6 w-6 text-secondary ml-2" />
                <span className="text-2xl font-bold">15000+</span>
              </div>
              <p className="opacity-90">قضية ناجحة</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-secondary ml-2" />
                <span className="text-2xl font-bold">24/7</span>
              </div>
              <p className="opacity-90">دعم متواصل</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
