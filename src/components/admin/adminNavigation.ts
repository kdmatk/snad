import {
  BriefcaseBusiness,
  CreditCard,
  FileText,
  House,
  LayoutGrid,
  Settings,
  Timer,
  Users,
  UserRoundCheck,
} from "lucide-react";
export const adminNavigation = [
  { id: "overview", label: "مركز العمليات", Icon: House },
  { id: "lawyers", label: "المحامون", Icon: UserRoundCheck },
  { id: "clients", label: "العملاء", Icon: Users },
  { id: "services", label: "الخدمات", Icon: LayoutGrid },
  { id: "quick-services", label: "الخدمات السريعة", Icon: Timer },
  { id: "cases", label: "الطلبات", Icon: BriefcaseBusiness },
  { id: "payments", label: "المدفوعات", Icon: CreditCard },
  { id: "articles", label: "المقالات", Icon: FileText },
  { id: "settings", label: "الإعدادات", Icon: Settings },
];
