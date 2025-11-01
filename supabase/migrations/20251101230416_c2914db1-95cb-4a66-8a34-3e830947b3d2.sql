-- حذف السياسات القديمة وإنشاء سياسات جديدة صحيحة

DROP POLICY IF EXISTS "المشاركون يمكنهم رؤية ملفات القضية" ON storage.objects;

-- سياسة محسّنة لعرض الملفات
CREATE POLICY "المشاركون يمكنهم رؤية ملفات القضية"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'case-files' AND
  (
    -- العميل صاحب القضية
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM legal_cases WHERE client_id = auth.uid()
    )
    OR
    -- المحامي المعين للقضية
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM legal_cases 
      WHERE lawyer_id IN (
        SELECT id FROM lawyers WHERE user_id = auth.uid()
      )
    )
    OR
    -- المحامي الذي قدم عرض على القضية
    (storage.foldername(name))[1] IN (
      SELECT case_id::text FROM case_bids 
      WHERE lawyer_id IN (
        SELECT id FROM lawyers WHERE user_id = auth.uid()
      )
    )
    OR
    -- الأدمن
    EXISTS (
      SELECT 1 FROM admins 
      WHERE email = (auth.jwt() ->> 'email') AND is_active = true
    )
  )
);