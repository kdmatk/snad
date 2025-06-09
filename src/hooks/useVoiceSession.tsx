
import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface VoiceSession {
  id: string;
  client_id: string;
  lawyer_id: string;
  consultation_id?: string;
  session_status: 'scheduled' | 'active' | 'ended' | 'cancelled';
  duration_minutes: number;
  start_time?: string;
  end_time?: string;
  actual_duration?: number;
  room_id: string;
  is_encrypted: boolean;
  recording_consent: boolean;
}

export const useVoiceSession = () => {
  const [session, setSession] = useState<VoiceSession | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // إنشاء جلسة صوتية جديدة
  const createVoiceSession = useCallback(async (
    clientId: string,
    lawyerId: string,
    durationMinutes: number = 30,
    consultationId?: string
  ) => {
    try {
      const roomId = `voice_room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { data, error } = await supabase
        .from('voice_sessions')
        .insert({
          client_id: clientId,
          lawyer_id: lawyerId,
          consultation_id: consultationId,
          duration_minutes: durationMinutes,
          room_id: roomId,
          session_status: 'scheduled'
        })
        .select()
        .single();

      if (error) throw error;

      setSession(data);
      setRemainingTime(durationMinutes * 60);
      
      toast({
        title: "تم إنشاء جلسة صوتية",
        description: "تم إنشاء غرفة الاتصال الصوتي بنجاح"
      });

      return data;
    } catch (error) {
      console.error('Error creating voice session:', error);
      toast({
        title: "خطأ في إنشاء الجلسة",
        description: "حدث خطأ أثناء إنشاء جلسة الاتصال الصوتي",
        variant: "destructive"
      });
      return null;
    }
  }, [toast]);

  // بدء الجلسة الصوتية
  const startVoiceSession = useCallback(async (sessionId: string) => {
    try {
      setIsConnecting(true);

      // طلب إذن الوصول للميكروفون
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: false
      });

      setLocalStream(stream);

      // تحديث حالة الجلسة في قاعدة البيانات
      const { error } = await supabase
        .from('voice_sessions')
        .update({
          session_status: 'active',
          start_time: new Date().toISOString()
        })
        .eq('id', sessionId);

      if (error) throw error;

      // إضافة حدث بدء الجلسة
      await supabase
        .from('session_events')
        .insert({
          session_id: sessionId,
          event_type: 'session_started',
          participant_type: 'client' // يمكن تحديد النوع بناءً على المستخدم الحالي
        });

      setIsConnected(true);
      setIsConnecting(false);

      // بدء العداد التنازلي
      startTimer();

      toast({
        title: "بدأت الجلسة الصوتية",
        description: "تم الاتصال بنجاح، يمكنك الآن التحدث"
      });

    } catch (error) {
      console.error('Error starting voice session:', error);
      setIsConnecting(false);
      toast({
        title: "خطأ في بدء الجلسة",
        description: "حدث خطأ أثناء بدء الاتصال الصوتي",
        variant: "destructive"
      });
    }
  }, [toast]);

  // إنهاء الجلسة الصوتية
  const endVoiceSession = useCallback(async () => {
    try {
      if (session) {
        const endTime = new Date().toISOString();
        const actualDuration = session.start_time 
          ? Math.floor((new Date(endTime).getTime() - new Date(session.start_time).getTime()) / 1000 / 60)
          : 0;

        // تحديث قاعدة البيانات
        await supabase
          .from('voice_sessions')
          .update({
            session_status: 'ended',
            end_time: endTime,
            actual_duration: actualDuration
          })
          .eq('id', session.id);

        // إضافة حدث إنهاء الجلسة
        await supabase
          .from('session_events')
          .insert({
            session_id: session.id,
            event_type: 'session_ended',
            event_data: { actual_duration: actualDuration }
          });
      }

      // إغلاق البث الصوتي
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        setLocalStream(null);
      }

      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
        setRemoteStream(null);
      }

      // إيقاف العداد
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      setIsConnected(false);
      setSession(null);
      setRemainingTime(0);

      toast({
        title: "انتهت الجلسة الصوتية",
        description: "تم إنهاء المكالمة بنجاح"
      });

    } catch (error) {
      console.error('Error ending voice session:', error);
      toast({
        title: "خطأ في إنهاء الجلسة",
        description: "حدث خطأ أثناء إنهاء المكالمة",
        variant: "destructive"
      });
    }
  }, [session, localStream, remoteStream, toast]);

  // بدء العداد التنازلي
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          endVoiceSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [endVoiceSession]);

  // تنظيف الموارد عند إلغاء المكون
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [localStream, remoteStream]);

  // تنسيق الوقت المتبقي
  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    session,
    isConnecting,
    isConnected,
    remainingTime,
    localStream,
    remoteStream,
    createVoiceSession,
    startVoiceSession,
    endVoiceSession,
    formatTime
  };
};
