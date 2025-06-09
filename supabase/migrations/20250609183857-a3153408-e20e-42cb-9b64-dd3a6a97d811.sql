
-- إنشاء سياسات Row Level Security لجدول المحامين

-- تمكين RLS على جدول المحامين (إذا لم يكن مفعلاً)
ALTER TABLE public.lawyers ENABLE ROW LEVEL SECURITY;

-- سياسة للسماح للجميع بقراءة المحامين المعتمدين
CREATE POLICY "Anyone can view approved lawyers" 
ON public.lawyers 
FOR SELECT 
USING (registration_status = 'approved');

-- سياسة للسماح للمديرين بإدراج محامين جدد
CREATE POLICY "Admins can insert lawyers" 
ON public.lawyers 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = auth.jwt() ->> 'email' 
    AND is_active = true
  )
);

-- سياسة للسماح للمديرين بتحديث بيانات المحامين
CREATE POLICY "Admins can update lawyers" 
ON public.lawyers 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = auth.jwt() ->> 'email' 
    AND is_active = true
  )
);

-- سياسة للسماح للمديرين بحذف المحامين
CREATE POLICY "Admins can delete lawyers" 
ON public.lawyers 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = auth.jwt() ->> 'email' 
    AND is_active = true
  )
);

-- سياسة للسماح للمديرين بعرض جميع المحامين (بما في ذلك المعلقين)
CREATE POLICY "Admins can view all lawyers" 
ON public.lawyers 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = auth.jwt() ->> 'email' 
    AND is_active = true
  )
);
