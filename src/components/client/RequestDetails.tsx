import { useState } from "react";
import { Download, Upload, FileText, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import type { ServiceRequest } from "@/hooks/useClientData";
import { dateLabel, shortId, statusInfo } from "./clientUtils";
export default function RequestDetails({
  request,
  userId,
  onClose,
  onUpdated,
}: {
  request: ServiceRequest | null;
  userId: string | undefined;
  onClose: () => void;
  onUpdated: () => Promise<unknown>;
}) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const download = async (path: string) => {
    setMessage("");
    setBusy(true);
    try {
      const { data, error } = await supabase.storage
        .from("case-files")
        .download(path);
      if (error) throw error;
      const url = URL.createObjectURL(data);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = path.split("/").pop() || "document";
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
    } catch {
      setFailed(true);
      setMessage("تعذّر تحميل المستند. يرجى المحاولة مرة أخرى.");
    } finally {
      setBusy(false);
    }
  };
  const upload = async () => {
    if (!request || !userId || !files.length) return;
    setBusy(true);
    setMessage("");
    setFailed(false);
    try {
      const { data: owned, error: ownershipError } = await supabase
        .from("legal_cases")
        .select("id,attachments")
        .eq("id", request.id)
        .eq("client_id", userId)
        .single();
      if (ownershipError || !owned) throw new Error("تعذّر التحقق من الطلب.");
      const paths: string[] = [];
      let unsuccessful = 0;
      for (const file of files) {
        const path = `${request.id}/${crypto.randomUUID()}.${file.name.split(".").pop()?.toLowerCase()}`;
        const { error } = await supabase.storage
          .from("case-files")
          .upload(path, file);
        if (error) unsuccessful++;
        else paths.push(path);
      }
      if (paths.length) {
        const { data: latest, error: latestError } = await supabase
          .from("legal_cases")
          .select("attachments")
          .eq("id", request.id)
          .eq("client_id", userId)
          .single();
        if (latestError) throw latestError;
        const attachments = [
          ...new Set([...(latest.attachments ?? []), ...paths]),
        ];
        const { error } = await supabase
          .from("legal_cases")
          .update({ attachments })
          .eq("id", request.id)
          .eq("client_id", userId)
          .select("id")
          .single();
        if (error) throw error;
        await onUpdated();
      }
      setFiles([]);
      setFailed(unsuccessful > 0);
      setMessage(
        unsuccessful
          ? `تم إرفاق ${paths.length} مستندات، وتعذّر رفع ${unsuccessful}. يمكنك إعادة محاولة الملفات التي لم تُرفع.`
          : "تم إرفاق المستندات بالطلب.",
      );
    } catch {
      setFailed(true);
      setMessage(
        "تعذّر إرفاق المستندات. لم نؤكد اكتمال الرفع؛ يرجى مراجعة المرفقات ثم المحاولة مرة أخرى.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <Dialog
      open={!!request}
      onOpenChange={(open) => {
        if (!open && !busy) {
          setFiles([]);
          setMessage("");
          onClose();
        }
      }}
    >
      <DialogContent className="cd-request-dialog" dir="rtl">
        {request && (
          <>
            <p className="cd-eyebrow">
              طلب <bdi>{shortId(request)}</bdi>
            </p>
            <DialogTitle>{request.title}</DialogTitle>
            <DialogDescription>
              تفاصيل الطلب والمستندات المرفقة به.
            </DialogDescription>
            <div className="cd-detail-meta">
              <span className={`cd-status ${statusInfo(request.status).tone}`}>
                {statusInfo(request.status).label}
              </span>
              <span>{request.category}</span>
              <span>{dateLabel(request.created_at)}</span>
            </div>
            <p className="cd-request-description">
              {request.description || "لم يُضف وصف تفصيلي."}
            </p>
            <h3>المستندات المرفقة</h3>
            {request.attachments?.length ? (
              <ul className="cd-document-list">
                {request.attachments.map((path, i) => (
                  <li key={path}>
                    <FileText size={18} />
                    <span>
                      مستند {i + 1}{" "}
                      <small>{path.split(".").pop()?.toUpperCase()}</small>
                    </span>
                    <button
                      aria-label={`تحميل المستند ${i + 1}`}
                      onClick={() => download(path)}
                      disabled={busy}
                    >
                      <Download size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="cd-muted">لا توجد مستندات مرفقة.</p>
            )}
            {userId && (
              <div className="cd-upload">
                <label htmlFor="cd-request-files">
                  <Upload size={18} /> إضافة مستندات للطلب
                </label>
                <input
                  id="cd-request-files"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  disabled={busy}
                  onChange={(e) => {
                    const selected = Array.from(e.target.files ?? []);
                    const extensions = /\.(pdf|docx?|jpe?g|png)$/i;
                    if (
                      selected.length > 3 ||
                      selected.some(
                        (f) =>
                          f.size > 10 * 1024 * 1024 || !extensions.test(f.name),
                      )
                    ) {
                      setFailed(true);
                      setMessage(
                        "اختر حتى 3 ملفات PDF أو Word أو صور، وبحد أقصى 10MB لكل ملف.",
                      );
                      setFiles([]);
                      e.target.value = "";
                      return;
                    }
                    setFiles(selected);
                    setMessage("");
                  }}
                />
                <small>حتى 3 ملفات في كل مرة، 10MB لكل ملف.</small>
                <button
                  className="navy-button"
                  onClick={upload}
                  disabled={busy || !files.length}
                >
                  {busy ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Upload size={16} />
                  )}
                  إرفاق المستندات
                </button>
              </div>
            )}
            {message && (
              <p
                role="status"
                className={failed ? "error-message" : "cd-success"}
              >
                {message}
              </p>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
