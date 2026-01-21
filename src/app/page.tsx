import { BarcodeValidator } from "@/components/barcode-validator";
import { ValidationHistory } from "@/components/validation-history";

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto gap-y-12 flex flex-col">
        <BarcodeValidator />
        <ValidationHistory />
      </div>
    </main>
  );
}
