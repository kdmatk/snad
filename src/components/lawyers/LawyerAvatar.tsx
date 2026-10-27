import { useState } from "react";
export default function LawyerAvatar({
  name,
  src,
}: {
  name: string;
  src?: string | null;
}) {
  const [failed, setFailed] = useState(false);
  const letters = name
    .replace(/^(د\.|أ\.|الأستاذة?|المستشار[ة]?)\s*/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0])
    .join(" ");
  return src &&
    !/pravatar|randomuser|placeholder|unsplash/i.test(src) &&
    !failed ? (
    <img
      className="lawyer-avatar"
      src={src}
      alt={`صورة ${name}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  ) : (
    <div className="lawyer-avatar avatar-initials" aria-label={`ملف ${name}`}>
      {letters}
    </div>
  );
}
