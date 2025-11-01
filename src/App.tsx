
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Lawyers from "./pages/Lawyers";
import LawyerProfile from "./pages/LawyerProfile";
import Services from "./pages/Services";
import QuickServices from "./pages/QuickServices";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/ClientDashboard";
import LawyerDashboard from "./pages/LawyerDashboard";
import LawyerRegister from "./pages/LawyerRegister";
import RequestService from "./pages/RequestService";
import InstantConsultation from "./pages/InstantConsultation";
import VoiceCall from "./pages/VoiceCall";
import LegalAuctions from "./pages/LegalAuctions";
import LegalLibrary from "./pages/LegalLibrary";
import Articles from "./pages/Articles";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Demo from "./pages/Demo";
import CaseBids from "./pages/CaseBids";
import LawyerBids from "./pages/LawyerBids";
import MyCases from "./pages/MyCases";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/lawyer/:id" element={<LawyerProfile />} />
            <Route path="/services" element={<Services />} />
            <Route path="/quick-services" element={<QuickServices />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
            <Route path="/lawyer-register" element={<LawyerRegister />} />
            <Route path="/request-service" element={<RequestService />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/voice-call" element={<VoiceCall />} />
            <Route path="/legal-auctions" element={<LegalAuctions />} />
            <Route path="/legal-library" element={<LegalLibrary />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/case-bids/:caseId" element={<CaseBids />} />
            <Route path="/lawyer-bids/:caseId" element={<LawyerBids />} />
            <Route path="/my-cases" element={<MyCases />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
