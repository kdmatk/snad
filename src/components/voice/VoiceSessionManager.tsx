
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Phone, 
  Calendar, 
  Clock, 
  User,
  Shield,
  PlayCircle,
  StopCircle,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VoiceSession {
  id: string;
  client_id: string;
  lawyer_id: string;
  session_status: 'scheduled' | 'active' | 'ended' | 'cancelled';
  duration_minutes: number;
  start_time?: string;
  end_time?: string;
  actual_duration?: number;
  room_id: string;
  created_at: string;
}

interface VoiceSessionManagerProps {
  lawyerId: string;
  userType: 'lawyer' | 'client';
}

const VoiceSessionManager = ({ lawyerId, userType }: VoiceSessionManagerProps) => {
  const [sessions, setSessions] = useState<VoiceSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<VoiceSession | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);

  const { toast } = useToast();

  // جلب جلسات الصوت
  const fetchVoiceSessions = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('voice_sessions')
        .select('*')
        .eq(userType === 'lawyer' ? 'lawyer_id' : 'client_id', lawyerId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching voice sessions:', error);
      toast({
        title: "خطأ في جلب الجلسات",
        description: "حدث خطأ أثناء جلب جلسات الصوت",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoiceSessions();
  }, [lawyerId, userType]);

  // تحديث حالة الجلسة
  const updateSessionStatus = async (sessionId: string, status: 'active' | 'ended' | 'cancelled') => {
    try {
      const updateData: any = { session_status: status };
      
      if (status === 'active') {
        updateData.start_time = new Date().toISOString();
      } else if (status === 'ended') {
        updateData.end_time = new Date().toISOString();
      }

      const { error } = await supabase
        .from('voice_sessions')
        .update(updateData)
        .eq('id', sessionId);

      if (error) throw error;

      await fetchVoiceSessions();
      
      toast({
        title: "تم تحديث الجلسة",
        description: `تم تحديث حالة الجلسة إلى: ${getStatusText(status)}`
      });

    } catch (error) {
      console.error('Error updating session status:', error);
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث حالة الجلسة",
        variant: "destructive"
      });
    }
  };

  // إرسال تقرير
  const submitReport = async () => {
    if (!selectedSession || !reportReason.trim()) {
      toast({
        title: "بيانات غير مكتملة",
        description: "يرجى إدخال سبب الإبلاغ",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('session_reports')
        .insert({
          session_id: selectedSession.id,
          reporter_id: lawyerId,
          reporter_type: userType,
          report_reason: reportReason,
          description: reportDescription
        });

      if (error) throw error;

      setShowReportForm(false);
      setReportReason('');
      setReportDescription('');
      setSelectedSession(null);

      toast({
        title: "تم إرسال التقرير",
        description: "تم إرسال التقرير بنجاح، سيتم مراجعته قريباً"
      });

    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال التقرير",
        variant: "destructive"
      });
    }
  };

  // الحصول على نص الحالة
  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'مجدولة';
      case 'active': return 'نشطة';
      case 'ended': return 'منتهية';
      case 'cancelled': return 'ملغية';
      default: return 'غير معروف';
    }
  };

  // الحصول على لون الحالة
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'ended': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center h-48">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>جاري تحميل الجلسات...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            إدارة جلسات الصوت
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {sessions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد جلسات صوتية حتى الآن</p>
              </div>
            ) : (
              sessions.map((session) => (
                <Card key={session.id} className="border border-muted">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(session.session_status)} text-white`}>
                          {getStatusText(session.session_status)}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          مشفرة
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(session.created_at)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          المدة: {session.duration_minutes} دقيقة
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          الغرفة: {session.room_id.slice(-8)}
                        </span>
                      </div>
                    </div>

                    {session.start_time && (
                      <div className="text-sm text-muted-foreground mb-4">
                        <div>بدأت في: {formatDate(session.start_time)}</div>
                        {session.end_time && (
                          <div>انتهت في: {formatDate(session.end_time)}</div>
                        )}
                        {session.actual_duration && (
                          <div>المدة الفعلية: {session.actual_duration} دقيقة</div>
                        )}
                      </div>
                    )}

                    <Separator className="my-3" />

                    <div className="flex gap-2 flex-wrap">
                      {session.session_status === 'scheduled' && (
                        <Button
                          size="sm"
                          onClick={() => updateSessionStatus(session.id, 'active')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <PlayCircle className="h-4 w-4 ml-2" />
                          بدء الجلسة
                        </Button>
                      )}
                      
                      {session.session_status === 'active' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateSessionStatus(session.id, 'ended')}
                        >
                          <StopCircle className="h-4 w-4 ml-2" />
                          إنهاء الجلسة
                        </Button>
                      )}

                      {session.session_status === 'scheduled' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateSessionStatus(session.id, 'cancelled')}
                        >
                          إلغاء الجلسة
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedSession(session);
                          setShowReportForm(true);
                        }}
                      >
                        <AlertTriangle className="h-4 w-4 ml-2" />
                        إبلاغ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* نموذج الإبلاغ */}
      {showReportForm && selectedSession && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              إبلاغ عن مشكلة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="reportReason">سبب الإبلاغ *</Label>
              <Input
                id="reportReason"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="اكتب سبب الإبلاغ..."
              />
            </div>
            
            <div>
              <Label htmlFor="reportDescription">تفاصيل إضافية (اختياري)</Label>
              <Textarea
                id="reportDescription"
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="اكتب تفاصيل إضافية حول المشكلة..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={submitReport} disabled={!reportReason.trim()}>
                <CheckCircle className="h-4 w-4 ml-2" />
                إرسال التقرير
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowReportForm(false);
                  setSelectedSession(null);
                  setReportReason('');
                  setReportDescription('');
                }}
              >
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VoiceSessionManager;
