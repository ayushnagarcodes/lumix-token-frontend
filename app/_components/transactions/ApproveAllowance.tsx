"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import {
  LUMIX_DECIMALS,
  lumixContractConfig,
} from "@/_lib/lumixContractConfig";
import type { AddressType, FormDataType } from "@/_types/types";
import { parseUnits } from "viem";

function ApproveAllowance() {
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const handleSubmit = (data: FormDataType) => {
    const { spenderAddress, amount } = data;
    const tokenAmount = parseUnits(String(amount), LUMIX_DECIMALS);

    writeContract({
      ...lumixContractConfig,
      functionName: "approve",
      args: [spenderAddress as AddressType, tokenAmount],
    });
  };

  return (
    <Form
      title="# Approve Allowance"
      fields={[
        {
          label: "Enter Spender Address",
          name: "spenderAddress",
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

export default ApproveAllowance;
