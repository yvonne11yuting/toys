"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

import ReduxProvider from "@/store/ReduxProvider";

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <ReduxProvider>{props.children}</ReduxProvider>
    </SessionProvider>
  );
};

export default Providers;
