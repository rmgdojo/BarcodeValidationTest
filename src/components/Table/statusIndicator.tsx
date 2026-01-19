import { Loader2, CheckCircle2, XCircle } from "lucide-react";

type Props = {
  status: string;
};

export default function StatusIndicator({ status }: Props) {
  if (status === "Validating...") {
    return (
      <div className="status status--pending">
        <Loader2 size={16} className="spin" aria-label="Validating" />
        <span>{status}</span>
      </div>
    );
  }

  if (status === "Valid barcode") {
    return (
      <div className="status status--success">
        <CheckCircle2 size={16} aria-label="Valid" />
        <span>{status}</span>
      </div>
    );
  }

  if (status === "Invalid barcode") {
    return (
      <div className="status status--error">
        <XCircle size={16} aria-label="Invalid" />
        <span>{status}</span>
      </div>
    );
  }

  return <span>{status}</span>;
}
