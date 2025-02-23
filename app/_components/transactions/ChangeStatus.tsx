"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import { lumixContractConfig } from "@/_lib/lumixContractConfig";
import useIsOwner from "@/_hooks/useIsOwner";
import useContractStatus from "@/_hooks/useContractStatus";
import Warning from "@/_components/Warning";

function ChangeStatus() {
  const { isOwner, isLoading: isOwnerLoading } = useIsOwner();
  const { isPaused, isLoading: isStatusLoading } = useContractStatus();
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const isWorking =
    isConfirming || isPending || isOwnerLoading || isStatusLoading;

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
      isPending={isWorking}
      submitBtnText={isPaused ? "Unpause" : "Pause"}
    >
      {!isWorking && isPaused ? (
        <p className="text-sm text-yellow-600 text-center">
          The contract is currently paused. No new transactions can be made.
        </p>
      ) : (
        <p className="text-sm text-slate-500 text-center">
          The contract is currently active. New transactions can be made.
        </p>
      )}
      {!isWorking && !isOwner && (
        <Warning
          text="You're not the contract owner!"
          color="red"
          className="-mt-2 relative -left-1 justify-center"
        />
      )}
    </Form>
  );
}

export default ChangeStatus;
