import Brand from "@/components/Brand";
import { LogOut } from "lucide-react";
import { adminNavigation } from "./adminNavigation";
export default function AdminSidebar({
  activeTab,
  onTabChange,
  onLogout,
  loggingOut,
  reviewCount,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  loggingOut: boolean;
  reviewCount?: number;
}) {
  return (
    <div className="ad-sidebar-content">
      <Brand />
      <nav aria-label="أقسام الإدارة">
        {adminNavigation.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={activeTab === id ? "active" : ""}
            aria-current={activeTab === id ? "page" : undefined}
            onClick={() => onTabChange(id)}
          >
            <Icon size={21} aria-hidden="true" />
            <span>{label}</span>
            {id === "lawyers" && !!reviewCount && (
              <b className="ad-nav-count">{reviewCount}</b>
            )}
          </button>
        ))}
      </nav>
      <div className="ad-sidebar-bottom">
        <button onClick={onLogout} disabled={loggingOut}>
          <LogOut size={20} aria-hidden="true" />
          {loggingOut ? "جارٍ الخروج..." : "تسجيل الخروج"}
        </button>
      </div>
    </div>
  );
}
