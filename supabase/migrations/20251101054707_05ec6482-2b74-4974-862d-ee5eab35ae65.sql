-- إنشاء جدول الخدمات السريعة
CREATE TABLE IF NOT EXISTS public.quick_services (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  duration_hours integer NOT NULL,
  price numeric NOT NULL,
  rating numeric DEFAULT 0,
  lawyer text DEFAULT 'محامي معتمد',
  category text NOT NULL,
  icon text,
  is_popular boolean DEFAULT false,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- تفعيل RLS
ALTER TABLE public.quick_services ENABLE ROW LEVEL SECURITY;

-- سياسة للقراءة العامة للخدمات النشطة
CREATE POLICY "Anyone can view active quick services"
ON public.quick_services
FOR SELECT
USING (is_active = true);

-- سياسة للإدارة الكاملة للمسؤولين
CREATE POLICY "Admins can manage quick services"
ON public.quick_services
FOR ALL
USING (true);

-- إضافة trigger للتحديث التلقائي لـ updated_at
CREATE TRIGGER update_quick_services_updated_at
BEFORE UPDATE ON public.quick_services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- إدراج البيانات الأولية
INSERT INTO public.quick_services (title, description, duration_hours, price, rating, category, icon, is_popular, order_index) VALUES
('مراجعة عقد عمل', 'مراجعة شاملة لعقد عمل مكون من 3 صفحات وتقديم ملاحظات قانونية', 12, 149, 4.9, 'مراجعة عقود', 'FileText', true, 1),
('استشارة أحوال شخصية', 'استشارة مفصلة في قضايا الزواج والطلاق والحضانة', 6, 199, 4.8, 'استشارات', 'MessageCircle', false, 2),
('صياغة مذكرة قانونية', 'إعداد مذكرة قانونية احترافية للدفوع والمرافعات', 24, 299, 4.7, 'صياغة قانونية', 'Edit', false, 3),
('مراجعة عقد إيجار', 'مراجعة بنود عقد الإيجار وتقديم التوصيات اللازمة', 8, 129, 4.9, 'مراجعة عقود', 'FileText', true, 4),
('صياغة شكوى رسمية', 'إعداد شكوى قانونية رسمية للجهات المختصة', 18, 249, 4.6, 'شكاوى', 'Scale', false, 5),
('توجيه قانوني سريع', 'إرشاد قانوني فوري للإجراءات الواجب اتخاذها', 3, 99, 4.8, 'توجيه قانوني سريع', 'Clock', false, 6),
('مراجعة عقد شراكة', 'تحليل شامل لعقد الشراكة التجارية وتقييم المخاطر', 24, 399, 4.9, 'مراجعة عقود', 'Users', false, 7),
('استشارة قانون العمل', 'استشارة متخصصة في حقوق العمال والقضايا العمالية', 4, 179, 4.7, 'استشارات', 'MessageCircle', true, 8),
('صياغة عقد خدمات', 'إعداد عقد تقديم خدمات احترافي وشامل', 16, 279, 4.8, 'صياغة قانونية', 'Edit', false, 9);