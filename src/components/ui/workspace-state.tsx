import { FileText, CircleAlert, Loader2, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  text: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, text, action, className }: EmptyStateProps) {
  return (
    <div className={cn("sn-state sn-state-empty", className)}>
      <span className="sn-state-icon"><FileText size={24} aria-hidden="true" /></span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action && <div className="sn-state-action">{action}</div>}
    </div>
  );
}

export function LoadingState({ text = "جارٍ تحميل البيانات..." }: { text?: string }) {
  return (
    <div className="sn-state sn-state-loading" role="status" aria-live="polite">
      <span className="sn-state-icon"><Loader2 size={24} className="animate-spin" aria-hidden="true" /></span>
      <p>{text}</p>
      <div className="sn-loading-lines" aria-hidden="true"><i /><i /><i /></div>
    </div>
  );
}

export function FailureState({ message, retry, busy = false }: {
  message: string;
  retry?: () => void;
  busy?: boolean;
}) {
  return (
    <div className="sn-state-failure" role="alert">
      <CircleAlert size={22} aria-hidden="true" />
      <div><h3>تعذّر عرض البيانات</h3><p>{message}</p></div>
      {retry && <Button variant="outline" onClick={retry} disabled={busy} aria-busy={busy}>
        <RefreshCw size={16} aria-hidden="true" />{busy ? "جارٍ إعادة المحاولة..." : "إعادة المحاولة"}
      </Button>}
    </div>
  );
}
