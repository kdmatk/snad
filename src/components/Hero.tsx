
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Shield, Clock, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

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
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 text-white py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-transparent to-blue-800/30"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-yellow-400 to-secondary"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Demo Badge */}
          <Badge 
            className="mb-4 text-base py-2 px-4 bg-amber-500 hover:bg-amber-600 cursor-pointer animate-pulse"
            onClick={() => navigate('/demo')}
          >
            <Sparkles className="h-4 w-4 ml-1" />
            جرب النسخة التجريبية الآن
          </Badge>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            منصة <span className="text-secondary bg-gradient-to-r from-secondary to-yellow-400 bg-clip-text text-transparent">سند</span>
            <br />
            للخدمات القانونية
          </h1>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-slate-200">
            اعثر على أفضل المحامين المتخصصين في الوطن العربي واحصل على استشارات قانونية موثوقة
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-2xl">
              <Input
                placeholder="ابحث عن محامي أو خدمة قانونية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-white/90 text-blue-900 border-0 text-right placeholder:text-blue-600/70 focus:ring-2 focus:ring-secondary"
              />
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg border-2 border-white/30"
                onClick={handleSearch}
              >
                <Search className="ml-2 h-5 w-5" />
                بحث
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-secondary ml-2" />
                <span className="text-2xl font-bold">2500+</span>
              </div>
              <p className="text-slate-300">محامي مُسجل</p>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-6 w-6 text-secondary ml-2" />
                <span className="text-2xl font-bold">15000+</span>
              </div>
              <p className="text-slate-300">قضية ناجحة</p>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-secondary ml-2" />
                <span className="text-2xl font-bold">24/7</span>
              </div>
              <p className="text-slate-300">دعم متواصل</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
