import { formatUnits } from "viem";
import { LUMIX_DECIMALS } from "@/_lib/lumixContractConfig";

export function formatTokenAmount(value: bigint) {
  const formattedValue = formatUnits(value, LUMIX_DECIMALS);
  return new Intl.NumberFormat().format(Number(formattedValue));
}
