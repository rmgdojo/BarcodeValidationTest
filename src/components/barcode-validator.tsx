"use client";

import { ScanBarcode } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import React, { useCallback, useEffect, useRef } from "react";

import { changeValue, submitBarcode } from "@/store/barcode";
import { renderToast } from "@/store/notification";
import { RootState } from "@/store/setup-store";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";

const sampleBarcodes = [
  "AB473124829GB",
  "XH545554533GB",
  "AA000000005GB",
  "NP135791355GB",
  "LM222222225GB",
  "JK111111115GB",
];
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "full",
  timeStyle: "long",
}).format;

export const BarcodeValidator: React.FC = () => {
  const dispatch = useDispatch();
  const barcode = useSelector(({ barcode }: RootState) => barcode.input);
  const barcodeError = useSelector(({ barcode }: RootState) => barcode.error);
  const renderToastNotification = useSelector(
    ({ notification }: RootState) => notification.render
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renderToastNotification) {
      toast.success("Valid barcode format", {
        description: dateFormatter(new Date()),
        onAutoClose: () => {
          dispatch(renderToast({ render: false }));
        },
        richColors: false,
      });
    }
  }, [renderToastNotification]);

  const onValidate = useCallback(() => {
    dispatch(submitBarcode());
  }, [barcode]);

  const onAddExample = useCallback(
    (input: string) => () => {
      dispatch(changeValue({ input }));

      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [inputRef.current]
  );

  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeValue({ input: target.value }));
    },
    []
  );

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <ScanBarcode className="h-5 w-5 text-rm-primary" />
          Enter Barcode
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="flex flex-col sm:flex-row gap-3" action={onValidate}>
          <FieldGroup>
            <Field data-invalid={!!barcodeError}>
              <FieldLabel htmlFor="barcode-input">
                Enter a Royal Mail barcode to validate
              </FieldLabel>
              <Input
                aria-errormessage="error-label"
                aria-invalid={!!barcodeError}
                aria-label="Barcode input"
                autoComplete="off"
                className="font-mono text-base"
                id="barcode-input"
                name="barcode-input"
                onChange={onChange}
                placeholder="e.g. AB473124829GB or AA000000005GB"
                ref={inputRef}
                type="text"
                value={barcode}
              />
              <FieldError id="error-label" className="block italic text-sm">
                {barcodeError}
              </FieldError>
            </Field>
            <Field className="ml-auto sm:w-fit">
              <Button
                data-testid="validate-button"
                disabled={!barcode}
                type="submit"
              >
                Validate
              </Button>
            </Field>
          </FieldGroup>
        </form>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Click to try examples:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {sampleBarcodes.map(example => (
              <Button
                key={example}
                onClick={onAddExample(example)}
                className="font-mono text-xs bg-secondary px-2 py-1 rounded hover:bg-secondary/80 transition-colors text-secondary-foreground"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
