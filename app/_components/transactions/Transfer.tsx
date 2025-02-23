"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import {
  LUMIX_DECIMALS,
  lumixContractConfig,
} from "@/_lib/lumixContractConfig";
import type { AddressType, FormDataType } from "@/_types/types";
import { parseUnits } from "viem";

function Transfer() {
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const handleSubmit = (data: FormDataType) => {
    const { receiverAddress, amount } = data;
    const tokenAmount = parseUnits(String(amount), LUMIX_DECIMALS);

    writeContract({
      ...lumixContractConfig,
      functionName: "transfer",
      args: [receiverAddress as AddressType, tokenAmount],
    });
  };

  return (
    <Form
      title="# Transfer"
      fields={[
        {
          label: "Enter Receiver Address",
          name: "receiverAddress",
          isAddress: true,
        },
        {
          label: "Enter Amount",
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
