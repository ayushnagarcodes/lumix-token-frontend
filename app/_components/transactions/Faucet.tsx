"use client";

import Form from "@/_components/Form";
import useWriteWithConfirmation from "@/_hooks/useWriteWithConfirmation";
import { lumixContractConfig } from "@/_lib/lumixContractConfig";
import { formatAddress } from "@/_lib/utils";
import { useAccount } from "wagmi";
import IconWarning from "@/_assets/icons/warning.svg";

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
    >
      <span className="text-sm text-red-500 flex items-center gap-1.5">
        <IconWarning height={16} width={16} />
        Can be claimed only once!
      </span>
    </Form>
  );
}

export default Faucet;
