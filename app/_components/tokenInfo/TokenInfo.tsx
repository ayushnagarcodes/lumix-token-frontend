import IconCashRegister from "@/_assets/icons/book-open.svg";
import IconLink from "@/_assets/icons/link.svg";
import { ETHERSCAN_URL } from "@/_lib/lumixContractConfig";
import Link from "next/link";
import TokenInfoList from "@/_components/tokenInfo/TokenInfoList";

function TokenInfo() {
  return (
    <section className="section-styles">
      <div className="flex gap-3 items-center mb-6">
        <div className="bg-slate-600 text-white rounded-lg p-3 flex items-center justify-center">
          <IconCashRegister height={24} width={24} />
        </div>

        <h2 className="text-xl font-medium">Token Info</h2>

        <Link
          className="text-slate-800 underline underline-offset-4 ml-auto flex gap-1 items-center text-lg"
          href={ETHERSCAN_URL}
          target="_blank"
        >
          <IconLink height={19} width={19} />
          Etherscan
        </Link>
      </div>

      <TokenInfoList />
    </section>
  );
}

export default TokenInfo;
