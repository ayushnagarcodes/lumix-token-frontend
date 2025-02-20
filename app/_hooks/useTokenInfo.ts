import {
  LUMIX_DECIMALS,
  lumixContractConfig,
} from "@/_lib/lumixContractConfig";
import { formatAddress, formatTokenAmount } from "@/_lib/utils";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useReadContracts } from "wagmi";
import type { ReadContractsErrorType } from "wagmi/actions";

type TokenInfo = {
  label: string;
  value: string | number;
  showCopyBtn?: boolean;
  copyValue?: string;
};

type useTokenInfoReturnType = {
  tokenInfo: TokenInfo[];
  isLoading: boolean;
  error: ReadContractsErrorType | null;
};

function useTokenInfo(): useTokenInfoReturnType {
  const { data, isLoading, error } = useReadContracts({
    contracts: [
      {
        ...lumixContractConfig,
        functionName: "totalSupply",
      },
      {
        ...lumixContractConfig,
        functionName: "cap",
      },
      {
        ...lumixContractConfig,
        functionName: "contractOwner",
      },
      {
        ...lumixContractConfig,
        functionName: "isPaused",
      },
    ],
  });

  useEffect(() => {
    if (error) toast.error("Couldn't fetch token info");
  }, [error]);

  const [totalSupply, cap, contractOwner, isPaused] = data || [];

  return {
    tokenInfo: [
      {
        label: "Name",
        value: "Lumix Token",
      },
      {
        label: "Symbol",
        value: "LMX",
      },
      {
        label: "Decimals",
        value: LUMIX_DECIMALS,
      },
      {
        label: "Total Supply",
        value: totalSupply?.result
          ? formatTokenAmount(totalSupply.result)
          : "...",
      },
      {
        label: "Cap",
        value: cap?.result ? formatTokenAmount(cap.result) : "...",
      },
      {
        label: "Contract Owner",
        value: contractOwner?.result
          ? formatAddress(contractOwner.result)
          : "...",
        showCopyBtn: true,
        copyValue: contractOwner?.result ?? "",
      },
      {
        label: "Contract Address",
        value: formatAddress(lumixContractConfig.address),
        showCopyBtn: true,
        copyValue: lumixContractConfig.address,
      },
      {
        label: "Status",
        value:
          isLoading || isPaused?.status === "failure"
            ? "..."
            : isPaused?.result
            ? "Paused"
            : "Active",
      },
    ],
    isLoading,
    error,
  };
}

export default useTokenInfo;
