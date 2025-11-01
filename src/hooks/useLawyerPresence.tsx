import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface LawyerPresenceState {
  [key: string]: {
    lawyer_id: string;
    online_at: string;
  }[];
}

export const useLawyerPresence = () => {
  const [onlineLawyers, setOnlineLawyers] = useState<Set<string>>(new Set());
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    // إنشاء قناة للحضور
    const presenceChannel = supabase.channel('lawyers-presence');

    // الاستماع لأحداث الحضور
    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState() as LawyerPresenceState;
        const online = new Set<string>();
        
        Object.keys(state).forEach((key) => {
          const presences = state[key];
          if (presences && presences.length > 0 && presences[0]?.lawyer_id) {
            online.add(String(presences[0].lawyer_id));
          }
        });
        
        setOnlineLawyers(online);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('محامي انضم:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('محامي غادر:', key, leftPresences);
      })
      .subscribe();

    setChannel(presenceChannel);

    return () => {
      presenceChannel.unsubscribe();
    };
  }, []);

  const trackLawyerPresence = async (lawyerId: string) => {
    if (!channel) return;

    try {
      // تتبع حضور المحامي
      await channel.track({
        lawyer_id: lawyerId,
        online_at: new Date().toISOString(),
      });

      // تحديث حالة المحامي في قاعدة البيانات
      await supabase
        .from('lawyers')
        .update({ 
          is_online: true,
          last_seen: new Date().toISOString()
        })
        .eq('id', lawyerId);

      console.log('تم تتبع حضور المحامي:', lawyerId);
    } catch (error) {
      console.error('خطأ في تتبع الحضور:', error);
    }
  };

  const untrackLawyerPresence = async (lawyerId: string) => {
    if (!channel) return;

    try {
      await channel.untrack();
      
      // تحديث حالة المحامي في قاعدة البيانات
      await supabase
        .from('lawyers')
        .update({ 
          is_online: false,
          last_seen: new Date().toISOString()
        })
        .eq('id', lawyerId);

      console.log('تم إلغاء تتبع حضور المحامي:', lawyerId);
    } catch (error) {
      console.error('خطأ في إلغاء تتبع الحضور:', error);
    }
  };

  return {
    onlineLawyers,
    trackLawyerPresence,
    untrackLawyerPresence,
  };
};
