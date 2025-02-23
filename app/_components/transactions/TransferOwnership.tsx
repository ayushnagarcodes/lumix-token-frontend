"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import { lumixContractConfig } from "@/_lib/lumixContractConfig";
import type { AddressType, FormDataType } from "@/_types/types";
import IconWarning from "@/_assets/icons/warning.svg";
import useIsOwner from "@/_hooks/useIsOwner";

function TransferOwnership() {
  const { isOwner, isLoading: isInfoLoading } = useIsOwner();
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const handleSubmit = (data: FormDataType) => {
    if (!isOwner) return;

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

export default TransferOwnership;
