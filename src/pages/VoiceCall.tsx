import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import VoiceCallInterface from '@/components/voice/VoiceCallInterface';
import VoiceSessionManager from '@/components/voice/VoiceSessionManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { generateUUID } from '@/utils/uuid';
import { Phone, ArrowRight, Shield, Clock, CheckCircle2, Settings } from 'lucide-react';
const VoiceCall = () => {
  const {
    sessionId
  } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('call');

  // توليد UUID صحيح للمستخدم الحالي والمحامي
  const currentUser = {
    id: generateUUID(),
    type: 'client' as 'client' | 'lawyer',
    name: 'أحمد محمد'
  };
  const demoLawyer = {
    id: generateUUID(),
    name: 'د. فاطمة الزهراني',
    specialty: 'قانون الأسرة'
  };
  const handleSessionEnd = () => {
    navigate('/services');
  };
  return <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="text-slate-800">
                <ArrowRight className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-primary">الاتصال الصوتي</h1>
                <p className="text-muted-foreground">
                  جلسة استشارة قانونية مع {demoLawyer.name}
                </p>
              </div>
            </div>

            {/* المعلومات الأمنية */}
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <h3 className="font-medium text-green-800">اتصال آمن ومشفر</h3>
                    <p className="text-sm text-green-600">
                      جميع المكالمات محمية بتشفير كامل من الطرف إلى الطرف
                    </p>
                  </div>
                  <Badge variant="outline" className="border-green-300 text-green-700">
                    <CheckCircle2 className="h-3 w-3 ml-1" />
                    موثق
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="call" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  المكالمة
                </TabsTrigger>
                <TabsTrigger value="manage" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  إدارة الجلسات
                </TabsTrigger>
              </TabsList>

              <TabsContent value="call" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* واجهة المكالمة */}
                  <div className="lg:col-span-2">
                    <VoiceCallInterface sessionId={sessionId} clientId={currentUser.type === 'client' ? currentUser.id : generateUUID()} lawyerId={currentUser.type === 'lawyer' ? currentUser.id : demoLawyer.id} durationMinutes={30} onSessionEnd={handleSessionEnd} userType={currentUser.type} />
                  </div>

                  {/* معلومات الجلسة */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">تفاصيل الجلسة</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">المحامي:</span>
                          <p className="font-medium">{demoLawyer.name}</p>
                          <p className="text-sm text-muted-foreground">{demoLawyer.specialty}</p>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">المدة:</span>
                          <p className="font-medium">30 دقيقة</p>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">نوع الجلسة:</span>
                          <p className="font-medium">استشارة صوتية</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">إرشادات المكالمة</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>تأكد من وجود اتصال إنترنت مستقر</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>استخدم سماعات للحصول على أفضل جودة صوت</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>اختر مكان هادئ للمكالمة</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>حضر أسئلتك وأوراقك مسبقاً</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="manage" className="mt-6">
                <VoiceSessionManager lawyerId={currentUser.type === 'lawyer' ? currentUser.id : demoLawyer.id} userType={currentUser.type} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>;
};
export default VoiceCall;