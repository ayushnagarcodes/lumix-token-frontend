"use client";

import Form from "@/_components/Form";
import useBalance from "@/_hooks/useBalance";
import type { AddressType, FormDataType } from "@/_types/types";
import { useState } from "react";

function CheckBalance() {
  const [address, setAddress] = useState<AddressType | undefined>();
  const { balance, balanceError, isBalanceLoading } = useBalance(address);
  const showBalance = address && !balanceError && !isBalanceLoading;

  function handleSubmit(data: FormDataType) {
    setAddress(data.address as AddressType);
  }

  return (
    <Form
      title="# Check Balance"
      fields={[
        {
          label: "Enter Address",
          name: "address",
          isAddress: true,
        },
      ]}
      onSubmit={handleSubmit}
      isPending={isBalanceLoading}
    >
      <p className="text-slate-800">
        <span className="font-medium">Balance:</span>{" "}
        {showBalance ? balance : "..."}
      </p>
    </Form>
  );
}

export default CheckBalance;
