import { Link } from "react-router-dom";
import "./brand.css";
export default function Brand() {
  return (
    <Link to="/" className="brand" aria-label="سند — الرئيسية">
      <span className="brand-frame" aria-hidden="true">
        <img
          className="brand-logo brand-logo-color"
          src="/brand/snad-logo-color-v1.webp"
          width="640"
          height="320"
          alt=""
          decoding="async"
        />
        <img
          className="brand-logo brand-logo-on-navy"
          src="/brand/snad-logo-on-navy-v1.webp"
          width="640"
          height="320"
          alt=""
          decoding="async"
        />
      </span>
    </Link>
  );
}
