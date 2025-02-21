import { useEffect } from "react";
import toast from "react-hot-toast";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

function useWriteWithConfirmation() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmationError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (!error) return;
    if (error.name === "ConnectorNotConnectedError") {
      toast("No wallet connected", {
        icon: "🔑",
      });
      return;
    }
    toast.error("Transaction failed");
  }, [error]);

  useEffect(() => {
    if (confirmationError)
      toast.error("Transaction failed during confirmation");
  }, [confirmationError]);

  useEffect(() => {
    if (isConfirmed) toast.success("Transaction successful");
  }, [isConfirmed]);

  return { writeContract, isPending, isConfirming };
}

export default useWriteWithConfirmation;
