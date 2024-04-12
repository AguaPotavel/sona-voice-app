import React from "react";
import type { AppProps } from "next/app";

import { NextAuthProvider } from "@/_shared/providers/provider";
import LayoutApp from "@/_shared/components/layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider>
      <LayoutApp>
        <Component {...pageProps} />
      </LayoutApp>
    </NextAuthProvider>
  );
}

export default MyApp;
