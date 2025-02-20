import { useReadContract } from "wagmi";
import toast from "react-hot-toast";
import type { AddressType } from "@/_types/types";
import { lumixContractConfig } from "@/_lib/lumixContractConfig";
import { useEffect } from "react";
import { formatTokenAmount } from "@/_lib/utils";

function useAllowance(
  ownerAddress: AddressType | undefined,
  spenderAddress: AddressType | undefined
) {
  const {
    data: allowance,
    error: allowanceError,
    isLoading: isAllowanceLoading,
  } = useReadContract({
    ...lumixContractConfig,
    functionName: "allowance",
    args: [ownerAddress!, spenderAddress!], // safe as query is enabled only if address is present
    query: {
      enabled: !!ownerAddress && !!spenderAddress,
    },
  });

  useEffect(() => {
    if (allowanceError) toast.error("Couldn't fetch allowance");
  }, [allowanceError]);

  return {
    allowance: formatTokenAmount(allowance ?? BigInt(0)),
    allowanceError,
    isAllowanceLoading,
  };
}

export default useAllowance;
