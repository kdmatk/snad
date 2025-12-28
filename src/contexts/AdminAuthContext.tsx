import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

interface AdminAuthContextType {
  admin: Admin | null;
  loading: boolean;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logoutAdmin: () => Promise<void>;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const localSession = localStorage.getItem('admin_session');
      if (localSession) {
        const sessionData = JSON.parse(localSession);
        
        const { data: adminData, error } = await supabase
          .from('admins')
          .select('*')
          .eq('email', sessionData.email)
          .eq('is_active', true)
          .single();

        if (!error && adminData) {
          setAdmin(adminData);
          setLoading(false);
          return;
        } else {
          localStorage.removeItem('admin_session');
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user?.email) {
        const { data: adminData, error } = await supabase
          .from('admins')
          .select('*')
          .eq('email', session.user.email)
          .eq('is_active', true)
          .single();

        if (!error && adminData) {
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
      
      // التحقق من بيانات المدير الافتراضي
      if (email === 'admin@example.com' && password === 'Admin771298!') {
        const { data: adminData, error } = await supabase
          .from('admins')
          .select('*')
          .eq('email', email)
          .eq('is_active', true)
          .single();

        if (error || !adminData) {
          throw new Error('هذا المستخدم ليس مديراً مفعلاً');
        }

        setAdmin(adminData);
        localStorage.setItem('admin_session', JSON.stringify({
          email: adminData.email,
          name: adminData.name,
          role: adminData.role
        }));

        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: `مرحباً ${adminData.name}`,
        });

        return;
      }

      // محاولة تسجيل الدخول عبر Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new Error('بيانات الدخول غير صحيحة');
      }

      if (data.user?.email) {
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('*')
          .eq('email', data.user.email)
          .eq('is_active', true)
          .single();

        if (adminError || !adminData) {
          await supabase.auth.signOut();
          throw new Error('هذا المستخدم ليس مديراً مفعلاً');
        }

        setAdmin(adminData);
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: `مرحباً ${adminData.name}`,
        });
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

  const logoutAdmin = async () => {
    try {
      localStorage.removeItem('admin_session');
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

  return (
    <AdminAuthContext.Provider value={{
      admin,
      loading,
      loginAdmin,
      logoutAdmin,
      isAuthenticated: !!admin
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
