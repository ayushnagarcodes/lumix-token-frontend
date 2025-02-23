"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import {
  LUMIX_DECIMALS,
  lumixContractConfig,
} from "@/_lib/lumixContractConfig";
import type { FormDataType } from "@/_types/types";
import { parseUnits } from "viem";
import useIsOwner from "@/_hooks/useIsOwner";
import useContractStatus from "@/_hooks/useContractStatus";
import Warning from "@/_components/Warning";

function Mint() {
  const { isOwner, isLoading: isInfoLoading } = useIsOwner();
  const { isPaused, isLoading: isStatusLoading } = useContractStatus();
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const isWorking =
    isConfirming || isPending || isInfoLoading || isStatusLoading;

  const handleSubmit = (data: FormDataType) => {
    if (!isOwner || isPaused) return;

    const { amount } = data;
    const tokenAmount = parseUnits(String(amount), LUMIX_DECIMALS);

    writeContract({
      ...lumixContractConfig,
      functionName: "mint",
      args: [tokenAmount],
    });
  };

  return (
    <Form
      title="# Mint"
      fields={[
        {
          label: "Enter Amount",
          name: "amount",
          type: "number",
          min: 0,
          isAmount: true,
          placeholder: "10 LMK",
          disabled: !isOwner,
        },
      ]}
      onSubmit={handleSubmit}
      isPending={isWorking}
      isPaused={isPaused}
    >
      {!isWorking && !isOwner && !isPaused && (
        <Warning text="You're not the contract owner!" color="red" />
      )}
      {!isWorking && isPaused && (
        <Warning text="The contract is currently paused." color="yellow" />
      )}
    </Form>
  );
}

export default Mint;
