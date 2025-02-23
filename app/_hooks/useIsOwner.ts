import { useAccount } from "wagmi";
import useTokenInfo from "@/_hooks/useTokenInfo";

function useIsOwner() {
  const { address } = useAccount();

  const { tokenInfo, isLoading } = useTokenInfo();
  const contractOwner = tokenInfo.filter(
    (info) => info.label === "Contract Owner"
  )[0].copyValue;
  const isOwner = address === contractOwner;

  return { isOwner, isLoading };
}

export default useIsOwner;
