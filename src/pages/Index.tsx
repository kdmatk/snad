
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Users, Shield, Clock, Phone } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedLawyers from "@/components/FeaturedLawyers";
import LegalServices from "@/components/LegalServices";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-arabic" dir="rtl">
      <Header />
      <Hero />
      <FeaturedLawyers />
      <LegalServices />
      <Statistics />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
