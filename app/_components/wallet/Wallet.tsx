"use client";

import { useAccount, useDisconnect } from "wagmi";
import ConnectWallet from "@/_components/wallet/ConnectWallet";
import CopyClipboard from "@/_components/CopyClipboard";
import useBalance from "@/_hooks/useBalance";
import Spinner from "@/_components/Spinner";
import RefreshPage from "@/_components/RefreshPage";
import IconPlugs from "@/_assets/icons/plugs.svg";
import IconWallet from "@/_assets/icons/wallet.svg";
import { formatAddress } from "@/_lib/utils";

function Wallet() {
  const { isConnected, address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { balance, balanceError, isBalanceLoading } = useBalance(address);

  if (!isConnected || !address) return <ConnectWallet />;

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <div className="flex items-center gap-2 bg-slate-100 py-2 pr-4 pl-[18px] rounded-full">
        <IconWallet height={20} width={20} />
        {isBalanceLoading ? (
          <Spinner height={18} width={18} />
        ) : (
          <span>{balanceError ? "..." : balance}</span>
        )}
      </div>

      <div className="flex items-center gap-2 bg-slate-100 py-2 pr-4 pl-[18px] rounded-full">
        <span className="text-slate-800 font-medium">{chain?.name}</span>|
        <span>{formatAddress(address)}</span>
        <CopyClipboard
          className="relative -top-[1px] -left-[2px]"
          text={address}
          height={18}
          width={18}
        ></CopyClipboard>
      </div>

      <div className="flex gap-4">
        <button className="btn-styles" onClick={() => disconnect()}>
          <IconPlugs height={20} width={20} />
          Disconnect
        </button>
        <RefreshPage />
      </div>
    </div>
  );
}

export default Wallet;
