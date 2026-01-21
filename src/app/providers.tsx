"use client";

import { Provider } from "react-redux";

import React from "react";
import { Toaster } from 'sonner'

import { store } from "@/store/store";

type Props = { children: React.ReactNode };

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Toaster />
      <Provider store={store}>{children}</Provider>
    </React.Fragment>
  );
};
