"use client";

import { useSelector } from "react-redux";

import React from "react";

import Image from "next/image";

import { RootState } from "@/store/setup-store";
import { BarcodeValdationState } from "@/types";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/ui/item";

const stateLabelMap: {
  [k in BarcodeValdationState]: {
    icon: string;
    label: string;
    optimised: boolean;
  };
} = {
  invalid: { icon: "/crossed.png", label: "Invalid barcode", optimised: false },
  valid: { icon: "/check.png", label: "Valid barcode", optimised: false },
  validating: {
    icon: "/loading-spinner.gif",
    label: "Validating...",
    optimised: true,
  },
};

export const ValidationHistory: React.FC = () => {
  const history = useSelector(
    ({ barcode }: RootState) => barcode.validationHistory
  );

  return (
    <ItemGroup className="flex w-full flex-col max-h-80 overflow-y-scroll">
      {history.map(({ barcode, state }, index) => {
        const { icon, label, optimised } = stateLabelMap[state];
        return (
          <React.Fragment key={barcode}>
            <Item role="listitem">
              <ItemMedia className="my-auto">
                <Image
                  unoptimized={optimised}
                  aria-label={state}
                  data-slot="validation-state"
                  alt={state}
                  src={icon}
                  width={20}
                  height={20}
                />
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{barcode}</ItemTitle>
                <ItemDescription>{label}</ItemDescription>
              </ItemContent>
            </Item>
            {index !== history.length - 1 && <ItemSeparator />}
          </React.Fragment>
        );
      })}
    </ItemGroup>
  );
};
