import { RefetchFnType } from "@/_components/_types/types";
import { useEffect } from "react";
import { useBlockNumber } from "wagmi";

function useRefetch(refetch: RefetchFnType) {
  const { data: blockNumber } = useBlockNumber({ watch: true });

  useEffect(() => {
    if (blockNumber) refetch();
  }, [blockNumber, refetch]);
}

export default useRefetch;
