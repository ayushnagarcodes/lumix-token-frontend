"use client";

import Form from "@/_components/Form";
import useAllowance from "@/_hooks/useAllowance";
import type { AddressType, FormDataType } from "@/_types/types";
import { useState } from "react";

function CheckAllowance() {
  const [ownerAddress, setOwnerAddress] = useState<AddressType | undefined>();
  const [spenderAddress, setSpenderAddress] = useState<
    AddressType | undefined
  >();
  const { allowance, allowanceError, isAllowanceLoading } = useAllowance(
    ownerAddress,
    spenderAddress
  );
  const showAllowance =
    ownerAddress && spenderAddress && !allowanceError && !isAllowanceLoading;

  function handleSubmit(data: FormDataType) {
    setOwnerAddress(data.ownerAddress as AddressType);
    setSpenderAddress(data.spenderAddress as AddressType);
  }

  return (
    <Form
      title="# Check Allowance"
      fields={[
        {
          label: " Enter Owner Address",
          name: "ownerAddress",
          isAddress: true,
        },
        {
          label: " Enter Spender Address",
          name: "spenderAddress",
          isAddress: true,
        },
      ]}
      onSubmit={handleSubmit}
      isPending={isAllowanceLoading}
    >
      <p className="text-slate-800">
        <span className="font-medium">Allowance:</span>{" "}
        {showAllowance ? allowance : "..."}
      </p>
    </Form>
  );
}

export default CheckAllowance;
