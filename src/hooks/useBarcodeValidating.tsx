import { useState, useRef } from "react";
import { validateBarcode } from "../utils/Barcode";
import { mockApi } from "../services/mockApi";
import type { HistoryItem } from "../types";





export function useBarcodeValidating() {
  const counterRef = useRef(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const submit = () => {
    setError(null);

    const barcode = input.toUpperCase().trim();
    setInput(barcode);

    const result = validateBarcode(barcode);
    if (!result.valid) {
      setError(result.error!);
      return;
    }

    const id = ++counterRef.current;
    setInput("");

    setHistory((h) => [
      ...h,
      { id, barcode, status: "Validating..." }
    ]);

    mockApi()
      .then(() => {
        setHistory((h) =>
          h.map((i) =>
            i.id === id ? { ...i, status: "Valid barcode" } : i
          )
        );
        setToast({
          message: "Barcode number validated successfully",
          type: "success"
        });
      })
      .catch(() => {
        setHistory((h) =>
          h.map((i) =>
            i.id === id ? { ...i, status: "Invalid barcode" } : i
          )
        );
        setToast({
          message: `Barcode ${barcode} failed server validation`,
          type: "error"
        });
      });
  };

  return {
    input,
    setInput,
    error,
    history,
    toast,
    clearToast: () => setToast(null),
    submit
  };
}
