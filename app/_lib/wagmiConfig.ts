import { createConfig, http, createStorage, cookieStorage } from "wagmi";
import { sepolia } from "wagmi/chains";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    key: "lumix-token",
    storage: cookieStorage,
  }),
});
