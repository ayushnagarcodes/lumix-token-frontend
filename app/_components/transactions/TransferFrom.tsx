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

function TransferFrom() {
  const { isPaused, isLoading: isStatusLoading } = useContractStatus();
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const isWorking = isConfirming || isPending || isStatusLoading;

  const handleSubmit = (data: FormDataType) => {
    if (isPaused) return;

    const { ownerAddress, receiverAddress, amount } = data;
    const tokenAmount = parseUnits(String(amount), LUMIX_DECIMALS);

    writeContract({
      ...lumixContractConfig,
      functionName: "transferFrom",
      args: [
        ownerAddress as AddressType,
        receiverAddress as AddressType,
        tokenAmount,
      ],
    });
  };

  return (
    <Form
      title="# Transfer From"
      fields={[
        {
          label: "Enter Owner Address",
          name: "ownerAddress",
          isAddress: true,
        },
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

export default TransferFrom;
