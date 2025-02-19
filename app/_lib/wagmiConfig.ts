import { createConfig, http, createStorage, cookieStorage } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected, coinbaseWallet, metaMask } from "wagmi/connectors";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: "Lumix Token" }),
    injected(),
  ],
  transports: {
    [sepolia.id]: http("/api/sepoliaProxy"),
  },
  ssr: true,
  storage: createStorage({
    key: "lumix-token",
    storage: cookieStorage,
  }),
});
