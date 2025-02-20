import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { ReadContractErrorType } from "viem";

export type AddressType = `0x${string}`;

export type RefetchFnType = (
  options?: RefetchOptions
) => Promise<QueryObserverResult<unknown, ReadContractErrorType>>;

export type FormDataType = Record<string, AddressType | number>;
