"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import { lumixContractConfig } from "@/_lib/lumixContractConfig";
import { formatAddress } from "@/_lib/utils";
import { useAccount } from "wagmi";

function Faucet() {
  const { address } = useAccount();
  const { writeContract, isPending, isConfirming } = useWriteWithConfirmation();

  const handleSubmit = () => {
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
      isPending={isConfirming || isPending}
    />
  );
}

export default Faucet;
