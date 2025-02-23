"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import {
  LUMIX_DECIMALS,
  lumixContractConfig,
} from "@/_lib/lumixContractConfig";
import type { FormDataType } from "@/_types/types";
import { parseUnits } from "viem";
import IconWarning from "@/_assets/icons/warning.svg";
import useIsOwner from "@/_hooks/useIsOwner";

function Burn() {
  const { isOwner, isLoading: isInfoLoading } = useIsOwner();
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const handleSubmit = (data: FormDataType) => {
    if (!isOwner) return;

    const { amount } = data;
    const tokenAmount = parseUnits(String(amount), LUMIX_DECIMALS);

    writeContract({
      ...lumixContractConfig,
      functionName: "burn",
      args: [tokenAmount],
    });
  };

  return (
    <Form
      title="# Burn"
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
      isPending={isConfirming || isPending || isInfoLoading}
    >
      {!isOwner && (
        <span className="text-sm text-red-500 flex items-center gap-1.5">
          <IconWarning height={16} width={16} />
          You&apos;re not the contract owner!
        </span>
      )}
    </Form>
  );
}

export default Burn;
