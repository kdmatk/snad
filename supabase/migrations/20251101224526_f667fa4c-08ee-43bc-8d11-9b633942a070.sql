-- إنشاء bucket لملفات القضايا
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-files', 'case-files', false)
ON CONFLICT (id) DO NOTHING;

-- سياسات الأمان للـ bucket
-- يمكن للعملاء رفع ملفات لقضاياهم فقط
CREATE POLICY "العملاء يمكنهم رفع ملفات قضاياهم"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'case-files' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM legal_cases WHERE client_id = auth.uid()
  )
);

-- يمكن للعملاء والمحامين المشاركين في القضية رؤية الملفات
CREATE POLICY "المشاركون يمكنهم رؤية ملفات القضية"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'case-files' AND
  (
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM legal_cases WHERE client_id = auth.uid()
    )
    OR
    (storage.foldername(name))[1] IN (
      SELECT case_id::text FROM case_bids WHERE lawyer_id IN (
        SELECT id FROM lawyers WHERE user_id = auth.uid()
      )
    )
  )
);

-- إضافة حقول جديدة لجدول legal_cases
ALTER TABLE legal_cases 
ADD COLUMN IF NOT EXISTS case_number TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS attachments TEXT[];

-- دالة لتوليد رقم القضية التلقائي
CREATE OR REPLACE FUNCTION generate_case_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  new_number TEXT;
  year_part TEXT;
  sequence_part INTEGER;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  -- الحصول على آخر رقم تسلسلي لهذا العام
  SELECT COALESCE(
    MAX(CAST(SUBSTRING(case_number FROM '\d+$') AS INTEGER)), 
    0
  ) + 1
  INTO sequence_part
  FROM legal_cases
  WHERE case_number LIKE 'CASE-' || year_part || '-%';
  
  new_number := 'CASE-' || year_part || '-' || LPAD(sequence_part::TEXT, 6, '0');
  
  RETURN new_number;
END;
$$;

-- إنشاء trigger لتوليد رقم القضية تلقائياً
CREATE OR REPLACE FUNCTION set_case_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.case_number IS NULL THEN
    NEW.case_number := generate_case_number();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_set_case_number ON legal_cases;
CREATE TRIGGER trigger_set_case_number
  BEFORE INSERT ON legal_cases
  FOR EACH ROW
  EXECUTE FUNCTION set_case_number();