
import Layout from "@/components/Layout";
import ConsultationMethods from "@/components/consultation/ConsultationMethods";
import AvailableLawyers from "@/components/consultation/AvailableLawyers";
import ConsultationFeatures from "@/components/consultation/ConsultationFeatures";
import EmergencyContact from "@/components/consultation/EmergencyContact";
import { useInstantConsultationData } from "@/hooks/useInstantConsultationData";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const InstantConsultation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    consultationMethods,
    availableLawyers,
    selectedMethod,
    setSelectedMethod
  } = useInstantConsultationData();

  const handleStartConsultation = (lawyerId: number, method: string) => {
    if (!method) {
      toast({
        title: "يرجى اختيار طريقة الاستشارة أولاً",
        variant: "destructive"
      });
      return;
    }
    
    const lawyer = availableLawyers.find(l => l.id === lawyerId);
    
    if (method === "voice") {
      // التوجه إلى صفحة الاتصال الصوتي
      navigate(`/voice-call?lawyer=${lawyerId}`);
      toast({
        title: "جاري إنشاء جلسة صوتية",
        description: `سيتم إنشاء جلسة صوتية مع ${lawyer?.name}`
      });
    } else {
      // للطرق الأخرى
      toast({
        title: `بدء استشارة ${method === "chat" ? "نصية" : "فيديو"}`,
        description: `جاري بدء الاستشارة مع ${lawyer?.name}`
      });
    }
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">استشارة فورية</h1>
              <p className="text-muted-foreground text-lg">
                احصل على استشارة قانونية فورية من محامين متخصصين
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Consultation Methods */}
              <div>
                <ConsultationMethods
                  methods={consultationMethods}
                  selectedMethod={selectedMethod}
                  onMethodSelect={setSelectedMethod}
                />
                <ConsultationFeatures />
              </div>

              {/* Available Lawyers */}
              <div>
                <AvailableLawyers
                  lawyers={availableLawyers}
                  selectedMethod={selectedMethod}
                  onStartConsultation={handleStartConsultation}
                />
                <EmergencyContact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstantConsultation;
