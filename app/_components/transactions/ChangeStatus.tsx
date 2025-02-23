"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import { lumixContractConfig } from "@/_lib/lumixContractConfig";
import IconWarning from "@/_assets/icons/warning.svg";
import useIsOwner from "@/_hooks/useIsOwner";
import useContractStatus from "@/_hooks/useContractStatus";

function ChangeStatus() {
  const { isOwner, isLoading: isOwnerLoading } = useIsOwner();
  const { isPaused, isLoading: isStatusLoading } = useContractStatus();
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const handleSubmit = () => {
    if (!isOwner) return;

    writeContract({
      ...lumixContractConfig,
      functionName: isPaused ? "unpause" : "pause",
    });
  };

  return (
    <Form
      title="# Change Contract Status"
      fields={[]}
      onSubmit={handleSubmit}
      isPending={isConfirming || isPending || isOwnerLoading || isStatusLoading}
      submitBtnText={isPaused ? "Unpause" : "Pause"}
    >
      {isPaused ? (
        <p className="text-sm text-yellow-600 text-center">
          The contract is currently paused. No new transactions can be made.
        </p>
      ) : (
        <p className="text-sm text-slate-500 text-center">
          The contract is currently active. New transactions can be made.
        </p>
      )}
      {!isOwner && (
        <span className="-mt-2 relative -left-1 text-sm text-red-500 flex items-center justify-center gap-1.5">
          <IconWarning height={16} width={16} />
          You&apos;re not the contract owner!
        </span>
      )}
    </Form>
  );
}

export default ChangeStatus;
