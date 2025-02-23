import useTokenInfo from "@/_hooks/useTokenInfo";

function useContractStatus() {
  const { tokenInfo, isLoading } = useTokenInfo();
  const contractStatus = tokenInfo.filter((info) => info.label === "Status")[0]
    .value;
  const isPaused = contractStatus === "Paused";

  return { isPaused, isLoading };
}

export default useContractStatus;
