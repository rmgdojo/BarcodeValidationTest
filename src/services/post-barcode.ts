"use client";

const DELAY_UPPER_LIMIT = 30_000;
const wait = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

type Response = {
  barcode: string;
  data: string | null;
  error: string | null;
  status: "valid" | "invalid";
};

export const postBarcode = async (
  formData: globalThis.FormData,
  options?: { signal: AbortSignal }
): Promise<Response> => {
  /**
   * Simulates aborting a network request. In this assessment, only
   * placeholder text is displayed, as no real network request is initiated.
   */

  if (options?.signal) {
    options.signal.onabort = () => {
      console.log("[AbortError]: ", options.signal.reason);
    };
  }

  const delay = Math.floor(Math.random() * DELAY_UPPER_LIMIT) + 1;
  console.time(`time-${delay}`);
  await wait(delay);
  console.timeEnd(`time-${delay}`);

  return new Promise((resolve, reject) => {
    const barcode = formData.get("barcode").toString();
    if (delay % 2 === 0) {
      resolve({
        barcode,
        data: "Success",
        error: null,
        status: "valid",
      });
    } else {
      reject({
        barcode,
        data: null,
        error: "Something went wrong",
        status: "invalid",
      });
    }
  });
};
