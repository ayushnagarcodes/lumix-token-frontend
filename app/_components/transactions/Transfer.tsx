"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import {
  LUMIX_DECIMALS,
  lumixContractConfig,
} from "@/_lib/lumixContractConfig";
import type { AddressType, FormDataType } from "@/_types/types";
import { parseUnits } from "viem";
import useContractStatus from "@/_hooks/useContractStatus";
import Warning from "@/_components/Warning";

function Transfer() {
  const { isPaused, isLoading: isStatusLoading } = useContractStatus();
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const isWorking = isConfirming || isPending || isStatusLoading;

  const handleSubmit = (data: FormDataType) => {
    if (isPaused) return;

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
      isPending={isWorking}
      isPaused={isPaused}
    >
      {!isWorking && isPaused && (
        <Warning text="The contract is currently paused." color="yellow" />
      )}
    </Form>
  );
}

export default Transfer;
