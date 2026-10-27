import { Link } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness, BadgeCheck } from "lucide-react";
import type { Lawyer } from "@/hooks/useLawyersData";
import LawyerAvatar from "./LawyerAvatar";
export default function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <article className="lawyer-card">
      <LawyerAvatar name={lawyer.name} src={lawyer.image} />
      <div className="lawyer-card-info">
        <Link to={`/lawyer/${lawyer.id}`} className="lawyer-name">
          {lawyer.name}
        </Link>
        <p>{lawyer.specialty}</p>
        <span className="lawyer-meta">
          <BriefcaseBusiness size={14} />
          {lawyer.experience === "غير محدد"
            ? "خدمات قانونية متخصصة"
            : `خبرة ${lawyer.experience}`}
        </span>
        {lawyer.verified && (
          <span className="verified-label">
            <BadgeCheck size={14} />
            تم التحقق من الترخيص
          </span>
        )}
        <div className="lawyer-card-bottom">
          <span>{lawyer.price}</span>
          <Link className="small-outline" to={`/lawyer/${lawyer.id}`}>
            عرض الملف <ArrowLeft size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
