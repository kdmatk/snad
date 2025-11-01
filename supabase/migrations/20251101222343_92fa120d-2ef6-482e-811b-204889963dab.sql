-- حذف البيانات التجريبية القديمة التي لا تشير إلى مستخدمين حقيقيين
DELETE FROM public.case_bids 
WHERE case_id IN (
  SELECT id FROM public.legal_cases 
  WHERE client_id NOT IN (SELECT id FROM auth.users)
);

DELETE FROM public.legal_cases 
WHERE client_id NOT IN (SELECT id FROM auth.users)
   OR client_id IS NULL;

-- إزالة الـ foreign key constraints القديمة
ALTER TABLE public.legal_cases
DROP CONSTRAINT IF EXISTS legal_cases_client_id_fkey;

ALTER TABLE public.legal_cases
DROP CONSTRAINT IF EXISTS legal_cases_lawyer_id_fkey;

-- جعل الحقول nullable للتوافق مع البيانات الموجودة
ALTER TABLE public.legal_cases
ALTER COLUMN client_id DROP NOT NULL;

ALTER TABLE public.legal_cases
ALTER COLUMN lawyer_id DROP NOT NULL;

-- إضافة foreign keys جديدة تشير إلى auth.users
ALTER TABLE public.legal_cases
ADD CONSTRAINT legal_cases_client_id_fkey 
FOREIGN KEY (client_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

ALTER TABLE public.legal_cases
ADD CONSTRAINT legal_cases_lawyer_id_fkey 
FOREIGN KEY (lawyer_id) 
REFERENCES auth.users(id) 
ON DELETE SET NULL;