"use client";

import { useAccount, useDisconnect } from "wagmi";
import ConnectWallet from "@/_components/wallet/ConnectWallet";
import CopyClipboard from "@/_components/CopyClipboard";

function Wallet() {
  const { isConnected, address, chain } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected || !address) return <ConnectWallet />;

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2 bg-slate-100 py-2 pr-4 pl-[18px] rounded-full">
        <span className="text-slate-800 font-medium">{chain?.name}</span>|
        <span>{address.slice(0, 7) + "..." + address.slice(-5)}</span>
        <CopyClipboard
          className="relative -top-[1px]"
          text={address}
        ></CopyClipboard>
      </div>

      <button className="btn-styles" onClick={() => disconnect()}>
        Disconnect
      </button>
    </div>
  );
}

export default Wallet;
