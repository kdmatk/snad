
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user?.email) {
        const { data: adminData, error } = await supabase
          .from('admins')
          .select('*')
          .eq('email', session.user.email)
          .eq('is_active', true)
          .single();

        if (error) {
          console.log('المستخدم ليس مديراً:', error);
          setAdmin(null);
        } else {
          setAdmin(adminData);
        }
      }
    } catch (error) {
      console.error('خطأ في فحص حالة المدير:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginAdmin = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // التحقق من وجود المدير في قاعدة البيانات أولاً
      const { data: adminCheck } = await supabase
        .from('admins')
        .select('email, is_active')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (!adminCheck) {
        throw new Error('هذا البريد الإلكتروني غير مسجل كمدير');
      }

      // محاولة تسجيل الدخول
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      // إذا فشل تسجيل الدخول بسبب عدم وجود المستخدم، قم بإنشائه
      if (error && error.message.includes('Invalid login credentials')) {
        console.log('إنشاء مستخدم مدير جديد في نظام المصادقة...');
        
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
            data: {
              is_admin: true
            }
          }
        });

        if (signUpError) {
          throw signUpError;
        }

        if (signUpData.user) {
          // انتظر قليلاً لضمان إنشاء المستخدم
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // حاول تسجيل الدخول مرة أخرى
          const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
            email,
            password
          });

          if (retryError) {
            throw new Error('تم إنشاء الحساب بنجاح. الرجاء المحاولة مرة أخرى.');
          }

          await checkAdminInDatabase(retryData.user.email!);
          return;
        }
      } else if (error) {
        throw error;
      }

      // التحقق من صلاحيات المدير
      if (data?.user?.email) {
        await checkAdminInDatabase(data.user.email);
      }
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول:', error);
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "فشل في تسجيل الدخول",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkAdminInDatabase = async (email: string) => {
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (adminError) {
      await supabase.auth.signOut();
      throw new Error('هذا المستخدم ليس مديراً مفعلاً');
    }

    setAdmin(adminData);
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: `مرحباً ${adminData.name}`,
    });

    // إعادة توجيه بدلاً من إعادة تحميل
    navigate('/admin', { replace: true });
  };

  const logoutAdmin = async () => {
    try {
      await supabase.auth.signOut();
      setAdmin(null);
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
      navigate('/admin');
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
      toast({
        title: "خطأ",
        description: "فشل في تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  return {
    admin,
    loading,
    loginAdmin,
    logoutAdmin,
    isAuthenticated: !!admin
  };
};
