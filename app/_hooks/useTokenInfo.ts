import {
  LUMIX_DECIMALS,
  lumixContractConfig,
} from "@/_lib/lumixContractConfig";
import { formatAddress, formatTokenAmount } from "@/_lib/utils";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useReadContracts } from "wagmi";

function useTokenInfo() {
  const { data, isPending, error } = useReadContracts({
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
          : "_",
      },
      {
        label: "Cap",
        value: cap?.result ? formatTokenAmount(cap.result) : "_",
      },
      {
        label: "Contract Owner",
        value: contractOwner?.result
          ? formatAddress(contractOwner.result)
          : "_",
        showCopyBtn: true,
      },
      {
        label: "Contract Address",
        value: formatAddress(lumixContractConfig.address),
        showCopyBtn: true,
      },
      {
        label: "Status",
        value:
          isPending || isPaused?.status === "failure"
            ? "_"
            : isPaused?.result
            ? "Paused"
            : "Active",
      },
    ],
    isPending,
    error,
  };
}

export default useTokenInfo;
