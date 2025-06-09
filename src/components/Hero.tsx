
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
    <section className="relative bg-gradient-to-l from-primary via-blue-900 to-slate-900 text-white py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-l from-primary/80 via-blue-900/90 to-slate-900/95"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-yellow-400 to-secondary"></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-secondary/20 to-yellow-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-br from-blue-400/20 to-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              منصة <span className="bg-gradient-to-l from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent drop-shadow-2xl">سند</span>
              <br />
              <span className="text-4xl md:text-6xl">للخدمات القانونية</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              اعثر على أفضل المحامين المتخصصين في الوطن العربي واحصل على استشارات قانونية موثوقة
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              <Input
                placeholder="ابحث عن محامي أو خدمة قانونية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-white/20 text-white placeholder:text-white/70 border-white/30 text-right backdrop-blur-sm rounded-xl h-14 text-lg"
              />
              <Button 
                size="lg" 
                className="bg-gradient-to-l from-secondary via-yellow-400 to-secondary text-white hover:from-secondary/90 hover:via-yellow-300 hover:to-secondary/80 font-medium px-8 py-4 shadow-xl border-2 border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-xl h-14 text-lg"
                onClick={handleSearch}
              >
                <Search className="ml-2 h-6 w-6" />
                بحث
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Star, value: "2500+", label: "محامي مُسجل", color: "from-secondary to-yellow-400" },
              { icon: Shield, value: "15000+", label: "قضية ناجحة", color: "from-blue-400 to-blue-600" },
              { icon: Clock, value: "24/7", label: "دعم متواصل", color: "from-green-400 to-green-600" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <IconComponent className={`h-10 w-10 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-secondary/20 to-yellow-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-l from-white via-secondary to-yellow-200 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="opacity-90 text-lg">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
