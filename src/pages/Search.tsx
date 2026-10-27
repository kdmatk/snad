import { Navigate, useSearchParams } from "react-router-dom";
export default function Search() {
  const [p] = useSearchParams();
  return (
    <Navigate
      replace
      to={`/quick-services${p.get("q") ? `?q=${encodeURIComponent(p.get("q")!)}` : ""}`}
    />
  );
}
