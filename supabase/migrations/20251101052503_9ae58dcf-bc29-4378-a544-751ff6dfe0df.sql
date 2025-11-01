-- إضافة حساب المدير الافتراضي
INSERT INTO public.admins (email, name, role, is_active, password_hash)
VALUES 
  ('admin@example.com', 'المدير العام', 'super_admin', true, 'hashed_password_placeholder')
ON CONFLICT (email) DO UPDATE 
  SET is_active = true, role = 'super_admin';