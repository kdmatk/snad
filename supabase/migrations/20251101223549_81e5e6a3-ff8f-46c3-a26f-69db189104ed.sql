-- ربط المحامي التجريبي بالمستخدم الحالي
UPDATE public.lawyers 
SET user_id = 'a83cd234-8cb0-4c32-809e-f1a8b2273012',
    name = 'محامي تجريبي',
    updated_at = now()
WHERE email = 'demo@lawyer.com' 
  AND user_id IS NULL;