import { Scale } from "lucide-react";
import { Link } from "react-router-dom";
export default function Brand() {
  return (
    <Link to="/" className="brand" aria-label="سند — الرئيسية">
      <Scale aria-hidden="true" />
      <span>
        <strong>سند</strong>
        <small>SNAD</small>
      </span>
    </Link>
  );
}
