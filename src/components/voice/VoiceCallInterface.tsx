
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Shield,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useVoiceSession } from '@/hooks/useVoiceSession';
import { useToast } from '@/hooks/use-toast';

interface VoiceCallInterfaceProps {
  sessionId?: string;
  clientId: string;
  lawyerId: string;
  durationMinutes?: number;
  onSessionEnd?: () => void;
  userType: 'client' | 'lawyer';
}

const VoiceCallInterface = ({
  sessionId,
  clientId,
  lawyerId,
  durationMinutes = 30,
  onSessionEnd,
  userType
}: VoiceCallInterfaceProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [showReportDialog, setShowReportDialog] = useState(false);
  
  const {
    session,
    isConnecting,
    isConnected,
    remainingTime,
    createVoiceSession,
    startVoiceSession,
    endVoiceSession,
    formatTime
  } = useVoiceSession();

  const { toast } = useToast();

  // إنشاء جلسة جديدة إذا لم تكن موجودة
  useEffect(() => {
    if (!session && !sessionId) {
      createVoiceSession(clientId, lawyerId, durationMinutes);
    }
  }, [session, sessionId, clientId, lawyerId, durationMinutes, createVoiceSession]);

  // بدء المكالمة
  const handleStartCall = async () => {
    if (session) {
      await startVoiceSession(session.id);
    }
  };

  // إنهاء المكالمة
  const handleEndCall = async () => {
    await endVoiceSession();
    if (onSessionEnd) {
      onSessionEnd();
    }
  };

  // تبديل حالة الصوت
  const toggleMute = () => {
    setIsMuted(!isMuted);
    // تطبيق كتم الصوت على البث المحلي
    // يمكن تنفيذ هذا مع WebRTC
  };

  // تبديل مكبر الصوت
  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  // إظهار حالة الاتصال
  const getConnectionStatus = () => {
    if (isConnecting) return { text: "جاري الاتصال...", color: "bg-yellow-500" };
    if (isConnected) return { text: "متصل", color: "bg-green-500" };
    return { text: "غير متصل", color: "bg-gray-500" };
  };

  const connectionStatus = getConnectionStatus();

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-primary/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
          <Phone className="h-6 w-6" />
          المكالمة الصوتية
        </CardTitle>
        
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className={`w-3 h-3 rounded-full ${connectionStatus.color} animate-pulse`}></div>
          <span className="text-sm text-muted-foreground">{connectionStatus.text}</span>
        </div>

        {session && (
          <Badge variant="outline" className="mt-2 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            مشفرة وآمنة
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* عداد الوقت */}
        {isConnected && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">الوقت المتبقي</span>
            </div>
            <div className="text-3xl font-bold text-primary tabular-nums">
              {formatTime(remainingTime)}
            </div>
            {remainingTime <= 300 && (
              <div className="flex items-center justify-center gap-1 mt-2 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">5 دقائق متبقية</span>
              </div>
            )}
          </div>
        )}

        <Separator />

        {/* أزرار التحكم */}
        <div className="grid grid-cols-2 gap-4">
          {/* زر كتم الصوت */}
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="lg"
            onClick={toggleMute}
            disabled={!isConnected}
            className="h-14 flex flex-col gap-1"
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            <span className="text-xs">{isMuted ? "إلغاء الكتم" : "كتم الصوت"}</span>
          </Button>

          {/* زر مكبر الصوت */}
          <Button
            variant={isSpeakerOn ? "default" : "outline"}
            size="lg"
            onClick={toggleSpeaker}
            disabled={!isConnected}
            className="h-14 flex flex-col gap-1"
          >
            {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            <span className="text-xs">مكبر الصوت</span>
          </Button>
        </div>

        {/* زر بدء/إنهاء المكالمة */}
        <div className="flex gap-3">
          {!isConnected ? (
            <Button
              onClick={handleStartCall}
              disabled={isConnecting || !session}
              className="flex-1 h-14 bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              <Phone className="h-5 w-5 ml-2" />
              {isConnecting ? "جاري الاتصال..." : "بدء المكالمة"}
            </Button>
          ) : (
            <Button
              onClick={handleEndCall}
              className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              <PhoneOff className="h-5 w-5 ml-2" />
              إنهاء المكالمة
            </Button>
          )}
        </div>

        {/* زر الإبلاغ */}
        {isConnected && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowReportDialog(true)}
            className="w-full text-amber-600 border-amber-200 hover:bg-amber-50"
          >
            <AlertTriangle className="h-4 w-4 ml-2" />
            الإبلاغ عن مشكلة
          </Button>
        )}

        {/* معلومات الجلسة */}
        {session && (
          <div className="text-center text-sm text-muted-foreground space-y-1">
            <div>رقم الجلسة: {session.room_id.slice(-8)}</div>
            <div>المدة المحددة: {session.duration_minutes} دقيقة</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceCallInterface;
