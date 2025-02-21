"use client";

import Form from "@/_components/Form";
import {
  LUMIX_DECIMALS,
  lumixContractConfig,
} from "@/_lib/lumixContractConfig";
import type { AddressType, FormDataType } from "@/_types/types";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

function Transfer() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (error) toast.error("Transaction failed");
  }, [error]);

  useEffect(() => {
    if (isConfirmed) toast.success("Transaction successful");
  }, [isConfirmed]);

  function handleSubmit(data: FormDataType) {
    const { receiverAddress, amount } = data;
    const tokenAmount = parseUnits(String(amount), LUMIX_DECIMALS);

    writeContract({
      ...lumixContractConfig,
      functionName: "transfer",
      args: [receiverAddress as AddressType, tokenAmount],
    });
  }

  return (
    <Form
      title="# Transfer"
      fields={[
        {
          label: " Enter Receiver Address",
          name: "receiverAddress",
          isAddress: true,
        },
        {
          label: " Enter Amount",
          name: "amount",
          type: "number",
          min: 0,
          isAmount: true,
          placeholder: "10 LMK",
        },
      ]}
      onSubmit={handleSubmit}
      isPending={isConfirming || isPending}
    />
  );
}

export default Transfer;
