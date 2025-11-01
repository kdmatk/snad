-- إضافة حقول جديدة لجدول case_bids
ALTER TABLE public.case_bids
ADD COLUMN IF NOT EXISTS delivery_days integer,
ADD COLUMN IF NOT EXISTS discount_percentage numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS score numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_accepted boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS responded_at timestamp with time zone;

-- دالة لحساب النقاط تلقائياً
CREATE OR REPLACE FUNCTION public.calculate_bid_score(
  bid_amount numeric,
  lawyer_rating numeric,
  delivery_days integer,
  total_cases integer,
  case_budget_max numeric
)
RETURNS numeric
LANGUAGE plpgsql
AS $$
DECLARE
  price_score numeric;
  rating_score numeric;
  speed_score numeric;
  experience_score numeric;
  final_score numeric;
BEGIN
  -- حساب نقاط السعر (40%) - كلما كان السعر أقل كانت النقاط أعلى
  price_score := CASE 
    WHEN case_budget_max > 0 THEN 
      ((case_budget_max - bid_amount) / case_budget_max) * 40
    ELSE 20
  END;
  
  -- حساب نقاط التقييم (35%)
  rating_score := (lawyer_rating / 5.0) * 35;
  
  -- حساب نقاط السرعة (15%) - كلما كان التنفيذ أسرع كانت النقاط أعلى
  speed_score := CASE
    WHEN delivery_days <= 3 THEN 15
    WHEN delivery_days <= 7 THEN 12
    WHEN delivery_days <= 14 THEN 8
    ELSE 5
  END;
  
  -- حساب نقاط الخبرة (10%)
  experience_score := CASE
    WHEN total_cases >= 50 THEN 10
    WHEN total_cases >= 20 THEN 8
    WHEN total_cases >= 10 THEN 6
    ELSE 4
  END;
  
  final_score := price_score + rating_score + speed_score + experience_score;
  
  RETURN ROUND(final_score, 2);
END;
$$;

-- Trigger لحساب النقاط تلقائياً عند إدخال أو تحديث المزايدة
CREATE OR REPLACE FUNCTION public.update_bid_score()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  lawyer_data record;
  case_data record;
BEGIN
  -- جلب بيانات المحامي
  SELECT rating, total_cases INTO lawyer_data
  FROM public.lawyers
  WHERE id = NEW.lawyer_id;
  
  -- جلب بيانات القضية
  SELECT budget_max INTO case_data
  FROM public.legal_cases
  WHERE id = NEW.case_id;
  
  -- حساب النقاط
  IF lawyer_data IS NOT NULL AND case_data IS NOT NULL AND NEW.delivery_days IS NOT NULL THEN
    NEW.score := calculate_bid_score(
      NEW.amount,
      COALESCE(lawyer_data.rating, 0),
      NEW.delivery_days,
      COALESCE(lawyer_data.total_cases, 0),
      COALESCE(case_data.budget_max, NEW.amount * 1.5)
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- ربط الـ trigger بالجدول
DROP TRIGGER IF EXISTS trigger_update_bid_score ON public.case_bids;
CREATE TRIGGER trigger_update_bid_score
BEFORE INSERT OR UPDATE ON public.case_bids
FOR EACH ROW
EXECUTE FUNCTION public.update_bid_score();

-- إضافة فهرس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_case_bids_score ON public.case_bids(score DESC);
CREATE INDEX IF NOT EXISTS idx_case_bids_case_id ON public.case_bids(case_id);

-- تحديث البيانات الموجودة بإضافة قيم افتراضية
UPDATE public.case_bids
SET delivery_days = 7
WHERE delivery_days IS NULL;