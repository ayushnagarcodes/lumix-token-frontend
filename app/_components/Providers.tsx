"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider } from "wagmi";
import { config } from "@/_lib/wagmiConfig";

interface ProvidersProps {
  children: React.ReactNode;
  initialState: State | undefined;
}

const queryClient = new QueryClient();

export function Providers({ children, initialState }: ProvidersProps) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
