import { useReadContract } from "wagmi";
import toast from "react-hot-toast";
import type { AddressType } from "@/_components/_types/types";
import { lumixContractConfig } from "@/_lib/lumixContractConfig";
import { useEffect } from "react";
import { formatTokenAmount } from "@/_lib/utils";

function useBalance(address: AddressType | undefined) {
  const {
    data: balance,
    error: balanceError,
    isPending: isBalanceLoading,
  } = useReadContract({
    ...lumixContractConfig,
    functionName: "balanceOf",
    args: [address!], // safe as query is enabled only if address is present
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    if (balanceError) toast.error("Couldn't fetch balance");
  }, [balanceError]);

  return {
    balance: formatTokenAmount(balance ?? BigInt(0)),
    balanceError,
    isBalanceLoading,
  };
}

export default useBalance;
