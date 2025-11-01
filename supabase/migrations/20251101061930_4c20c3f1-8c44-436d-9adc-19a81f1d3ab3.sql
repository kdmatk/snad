-- إضافة حقول حالة الاتصال وآخر مرة اتصال لجدول المحامين
ALTER TABLE public.lawyers 
ADD COLUMN IF NOT EXISTS is_online boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS last_seen timestamp with time zone DEFAULT now();

-- إنشاء فهرس لتحسين الأداء عند البحث عن المحامين المتصلين
CREATE INDEX IF NOT EXISTS idx_lawyers_online_status ON public.lawyers(is_online, last_seen);

-- تحديث آخر مرة اتصال تلقائياً
CREATE OR REPLACE FUNCTION public.update_lawyer_last_seen()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.last_seen = now();
  RETURN NEW;
END;
$$;

-- إنشاء trigger لتحديث last_seen عند أي تحديث للمحامي
DROP TRIGGER IF EXISTS update_lawyer_last_seen_trigger ON public.lawyers;
CREATE TRIGGER update_lawyer_last_seen_trigger
  BEFORE UPDATE ON public.lawyers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_lawyer_last_seen();