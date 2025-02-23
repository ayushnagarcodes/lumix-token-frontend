"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import { lumixContractConfig } from "@/_lib/lumixContractConfig";
import type { AddressType, FormDataType } from "@/_types/types";
import useIsOwner from "@/_hooks/useIsOwner";
import useContractStatus from "@/_hooks/useContractStatus";
import Warning from "@/_components/Warning";

function TransferOwnership() {
  const { isOwner, isLoading: isInfoLoading } = useIsOwner();
  const { isPaused, isLoading: isStatusLoading } = useContractStatus();
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const isWorking =
    isConfirming || isPending || isInfoLoading || isStatusLoading;

  const handleSubmit = (data: FormDataType) => {
    if (!isOwner || isPaused) return;

    const { newOwnerAddress } = data;

    writeContract({
      ...lumixContractConfig,
      functionName: "transferOwnership",
      args: [newOwnerAddress as AddressType],
    });
  };

  return (
    <Form
      title="# Transfer Ownership"
      fields={[
        {
          label: "Enter New Owner Address",
          name: "newOwnerAddress",
          isAddress: true,
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

export default TransferOwnership;
