export const specialties = [
  "القانون التجاري",
  "قانون الأسرة",
  "القانون الجنائي",
  "القانون العقاري",
  "قانون العمل",
  "القانون المالي",
  "القانون الإداري",
  "قانون الضرائب",
  "قانون الشركات",
  "القانون البحري",
];
export const countries = [
  "السعودية",
  "الإمارات",
  "مصر",
  "الكويت",
  "البحرين",
  "قطر",
  "عمان",
  "الأردن",
  "لبنان",
  "المغرب",
  "تونس",
];
export const experienceOptions = [
  ["0", "أقل من سنة"],
  ["1", "١–٣ سنوات"],
  ["3", "٣–٥ سنوات"],
  ["5", "٥–١٠ سنوات"],
  ["10", "١٠–١٥ سنة"],
  ["15", "١٥–٢٠ سنة"],
  ["20", "أكثر من ٢٠ سنة"],
];
export interface LawyerRegistrationFields {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  specialty: string;
  experience: string;
  licenseNumber: string;
  bio: string;
}
export const emptyRegistration: LawyerRegistrationFields = {
  name: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  specialty: "",
  experience: "",
  licenseNumber: "",
  bio: "",
};
export function licenseError(file: File | null) {
  if (!file) return "أرفق ترخيص المحاماة للمتابعة.";
  if (!file.size) return "الملف فارغ. اختر ملفًا صالحًا.";
  if (file.size > 5 * 1024 * 1024)
    return "حجم الملف يجب ألا يتجاوز ٥ ميجابايت.";
  const allowed: Record<string, string> = {
    "application/pdf": ".pdf",
    "image/jpeg": ".jpg",
    "image/png": ".png",
  };
  if (!allowed[file.type] || !/\.(pdf|jpe?g|png)$/i.test(file.name))
    return "اختر ترخيصًا بصيغة PDF أو JPG أو PNG.";
  return null;
}
export function stepErrors(
  step: number,
  data: LawyerRegistrationFields,
  file: File | null,
) {
  const errors: Record<string, string> = {};
  if (step === 1) {
    if (data.name.trim().length < 3) errors.name = "أدخل الاسم المهني الكامل.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      errors.email = "أدخل بريدًا إلكترونيًا صالحًا.";
    if (!/^[+\d\s()-]{7,22}$/.test(data.phone.trim()))
      errors.phone = "أدخل رقم جوال مع مفتاح الدولة.";
    if (!countries.includes(data.country)) errors.country = "اختر البلد.";
    if (!data.city.trim()) errors.city = "أدخل المدينة.";
  }
  if (step === 2) {
    if (!specialties.includes(data.specialty))
      errors.specialty = "اختر التخصص الرئيسي.";
    if (!experienceOptions.some(([value]) => value === data.experience))
      errors.experience = "اختر سنوات الخبرة.";
    if (!data.licenseNumber.trim())
      errors.licenseNumber = "أدخل رقم ترخيص المحاماة.";
    if (data.bio.trim().length < 20)
      errors.bio = "أضف نبذة مهنية من ٢٠ حرفًا على الأقل.";
    const error = licenseError(file);
    if (error) errors.file = error;
  }
  return errors;
}
