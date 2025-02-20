import Wallet from "@/_components/wallet/Wallet";
import TokenInfo from "@/_components/tokenInfo/TokenInfo";
import IconEth from "@/_assets/icons/eth.svg";

export default function App() {
  return (
    <>
      <header className="flex justify-center lg:justify-between items-center gap-x-[92px] gap-y-6 my-8 md:my-12 flex-wrap">
        <h1 className="flex items-center gap-2.5 text-3xl text-slate-700 text-center font-bold">
          <IconEth /> Lumix Token
        </h1>
        <Wallet />
      </header>

      <main className="space-y-12">
        <TokenInfo />
      </main>
    </>
  );
}
