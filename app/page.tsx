import IconCoin from "@/_assets/icons/coin.svg";
import IconSend from "@/_assets/icons/send.svg";
import IconBank from "@/_assets/icons/bank.svg";
import TokenInfo from "@/_components/tokenInfo/TokenInfo";
import SectionTitle from "@/_components/SectionTitle";
import CheckBalance from "@/_components/queries/CheckBalance";
import CheckAllowance from "@/_components/queries/CheckAllowance";
import Transfer from "@/_components/transactions/Transfer";
import Header from "@/_components/Header";
import ApproveAllowance from "@/_components/transactions/ApproveAllowance";
import TransferFrom from "@/_components/transactions/TransferFrom";
import Faucet from "@/_components/transactions/Faucet";
import Mint from "@/_components/transactions/Mint";
import Burn from "@/_components/transactions/Burn";
import TransferOwnership from "@/_components/transactions/TransferOwnership";
import ChangeStatus from "@/_components/transactions/ChangeStatus";

export default function App() {
  return (
    <>
      <Header />

      <main className="space-y-12 max-w-[90rem] mx-auto px-4 pb-8 md:p-8 md:pt-6">
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

        <section className="section-styles">
          <div className="flex gap-3 items-center mb-7">
            <SectionTitle title="Transactions">
              <IconSend height={24} width={24} />
            </SectionTitle>
          </div>
          <div className="section-grid">
            <Transfer />
            <ApproveAllowance />
            <TransferFrom />
            <Faucet />
          </div>
        </section>

        <section className="section-styles">
          <div className="flex gap-3 items-center mb-7">
            <SectionTitle title="Owner Actions">
              <IconBank height={24} width={24} />
            </SectionTitle>
          </div>
          <div className="section-grid">
            <Mint />
            <Burn />
            <TransferOwnership />
            <ChangeStatus />
          </div>
        </section>
      </main>
    </>
  );
}
