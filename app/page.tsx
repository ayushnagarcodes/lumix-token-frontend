import Wallet from "@/_components/wallet/Wallet";
import TokenInfo from "@/_components/tokenInfo/TokenInfo";
import IconEth from "@/_assets/icons/eth.svg";
import SectionTitle from "@/_components/SectionTitle";
import IconCoin from "@/_assets/icons/coin.svg";
import CheckBalance from "@/_components/queries/CheckBalance";
import CheckAllowance from "@/_components/queries/CheckAllowance";

export default function App() {
  return (
    <>
      <header className="flex justify-center lg:justify-between items-center gap-x-[92px] gap-y-6 my-8 md:mb-12 flex-wrap">
        <h1 className="flex items-center gap-2.5 text-3xl text-slate-700 text-center font-bold">
          <IconEth /> Lumix Token
        </h1>
        <Wallet />
      </header>

      <main className="space-y-12">
        <TokenInfo />

        <section className="section-styles">
          <div className="flex gap-3 items-center mb-7">
            <SectionTitle title="Account Holdings">
              <IconCoin height={24} width={24} />
            </SectionTitle>
          </div>

          <div className="section-grid">
            <CheckBalance />
            <CheckAllowance />
          </div>
        </section>
      </main>
    </>
  );
}
