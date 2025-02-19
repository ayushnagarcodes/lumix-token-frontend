"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider } from "wagmi";
import { config } from "@/_lib/wagmiConfig";

interface ProvidersProps {
  initialState: State | undefined;
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ initialState, children }: ProvidersProps) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
