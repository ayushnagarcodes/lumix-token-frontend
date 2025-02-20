import { formatUnits } from "viem";
import { LUMIX_DECIMALS } from "@/_lib/lumixContractConfig";
import LogoMetamask from "@/_assets/logos/metamask.svg";
import LogoCoinbase from "@/_assets/logos/coinbase.svg";
import LogoEthereum from "@/_assets/logos/ethereum.svg";
import type { FC } from "react";

export function formatTokenAmount(value: bigint) {
  const formattedValue = formatUnits(value, LUMIX_DECIMALS);
  return new Intl.NumberFormat().format(Number(formattedValue)) + " LMX";
}

export function formatAddress(address: `0x${string}`) {
  return address.slice(0, 7) + "..." + address.slice(-5);
}

export const connectorLogos: Record<
  string,
  FC<{ width?: number; height?: number }>
> = {
  MetaMask: LogoMetamask,
  "Coinbase Wallet": LogoCoinbase,
  Injected: LogoEthereum,
};
