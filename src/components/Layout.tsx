
import Header from "./Header";
import Footer from "./Footer";
import DemoBanner from "./DemoBanner";
import AICustomerSupport from "./AICustomerSupport";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background font-arabic" dir="rtl">
      <DemoBanner />
      <Header />
      <main>{children}</main>
      <Footer />
      <AICustomerSupport />
    </div>
  );
};

export default Layout;
