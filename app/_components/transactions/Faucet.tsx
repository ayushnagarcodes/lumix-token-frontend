"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import { lumixContractConfig } from "@/_lib/lumixContractConfig";
import { formatAddress } from "@/_lib/utils";
import { useAccount } from "wagmi";
import useContractStatus from "@/_hooks/useContractStatus";
import Warning from "@/_components/Warning";

function Faucet() {
  const { address } = useAccount();
  const { isPaused, isLoading: isStatusLoading } = useContractStatus();
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const isWorking = isConfirming || isPending || isStatusLoading;

  const handleSubmit = () => {
    if (isPaused) return;

    writeContract({
      ...lumixContractConfig,
      functionName: "claimFaucet",
    });
  };

  return (
    <Form
      title="# Claim Faucet"
      fields={[
        {
          label: "Claiming Address",
          name: "spenderAddress",
          isAddress: true,
          disabled: true,
          defaultValue: address ? formatAddress(address) : "",
          placeholder: "Please connect wallet",
        },
        {
          label: "Faucet Amount",
          name: "amount",
          min: 0,
          isAmount: true,
          defaultValue: "10 LMK",
          disabled: true,
        },
      ]}
      onSubmit={handleSubmit}
      isPending={isWorking}
      isPaused={isPaused}
    >
      {!isWorking && isPaused ? (
        <Warning text="The contract is currently paused." color="yellow" />
      ) : (
        <Warning text="Can be claimed only once!" color="red" />
      )}
    </Form>
  );
}

export default Faucet;
