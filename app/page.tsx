import Wallet from "@/_components/wallet/Wallet";

export default function App() {
  return (
    <>
      <header className="flex items-center justify-between gap-x-4 gap-y-6 my-8 sm:my-12 flex-wrap">
        <h1 className="text-3xl text-slate-700 text-center font-bold md:w-fit w-full">
          # Lumix Token
        </h1>
        <Wallet />
      </header>

      <main className="space-y-12"></main>
    </>
  );
}
