
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import PlatformSaleBanner from "@/components/PlatformSaleBanner";
import FeaturedLawyers from "@/components/FeaturedLawyers";
import LegalServices from "@/components/LegalServices";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <PlatformSaleBanner />
      <FeaturedLawyers />
      <LegalServices />
      <Statistics />
      <Testimonials />
    </Layout>
  );
};

export default Index;
