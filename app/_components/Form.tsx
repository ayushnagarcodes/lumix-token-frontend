"use client";

import type { AddressType, FormDataType } from "@/_types/types";
import { useState, type ComponentProps } from "react";
import { isAddress } from "viem";
import Spinner from "@/_components/Spinner";

interface BaseInputField extends ComponentProps<"input"> {
  label: string;
  name: string;
  type?: "text" | "number";
}

interface AddressInputField extends BaseInputField {
  isAddress: true;
  isAmount?: false;
}

interface AmountInputField extends BaseInputField {
  isAddress?: false;
  isAmount: true;
}

type InputField = AddressInputField | AmountInputField;

interface FormProps {
  title: string;
  fields: InputField[];
  onSubmit: (data: FormDataType) => void;
  submitBtnText?: string;
  isPending: boolean;
  children?: React.ReactNode;
}

function Form({
  title,
  fields,
  onSubmit,
  submitBtnText = "Submit",
  isPending,
  children,
}: FormProps) {
  const titleSlug = title.toLowerCase().replace(" ", "-");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const hasErrors = Object.keys(errors).length > 0;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const dataObj: FormDataType = {};
    const errObj = { ...errors };

    // Form validation
    formData.forEach((value, key) => {
      const field = fields.find((field) => field.name === key);
      if (!field) return;

      if (field.isAddress && !isAddress(value as AddressType)) {
        errObj[key] = "Invalid address";
        return;
      }

      if (field.isAmount && (isNaN(Number(value)) || Number(value) <= 0)) {
        errObj[key] = "Invalid amount";
        return;
      }

      if (errObj[key]) delete errObj[key];
      dataObj[key] = field?.isAmount ? Number(value) : (value as AddressType);
    });

    setErrors(errObj);
    if (Object.keys(errObj).length) return;

    // Perform action
    onSubmit(dataObj);
  }

  return (
    <div className="card-styles">
      <form className="form-styles" onSubmit={handleSubmit}>
        <h3 className="form-heading">{title}</h3>

        {fields.map((field, i) => (
          <div key={i}>
            <label
              htmlFor={`${titleSlug}-${field.name}`}
              className="label-styles"
            >
              {field.label}
            </label>
            <input
              id={`${titleSlug}-${field.name}`}
              name={field.name}
              type={field.type || "text"}
              className="input-styles"
              placeholder={
                field.placeholder || (field.isAddress ? "0x1234...5678" : "")
              }
            />
            {errors?.[field.name] && (
              <span className="input-error-styles">{errors[field.name]}</span>
            )}
          </div>
        ))}

        {!hasErrors && children}

        <button
          className="btn-styles w-full"
          disabled={isPending}
          type="submit"
        >
          {isPending ? <Spinner height={22} width={22} /> : submitBtnText}
        </button>
      </form>
    </div>
  );
}

export default Form;
