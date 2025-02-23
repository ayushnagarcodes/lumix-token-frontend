import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import IconWallet from "@/_assets/icons/wallet.svg";
import Spinner from "@/_components/Spinner";
import { connectorLogos } from "@/_lib/utils";

interface WalletOptionsProps {
  onCloseModal?: () => void; // will be replaced by onCloseModal coming from cloneElement in Modal
}

function WalletOptions({ onCloseModal }: WalletOptionsProps) {
  const {
    connectors,
    connect,
    isPending: isAnyPending,
    isSuccess,
  } = useConnect();
  const [pendingConnectorId, setPendingConnectorId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (isSuccess) {
      setPendingConnectorId(null);
      onCloseModal?.();
    }
  }, [isSuccess, onCloseModal]);

  useEffect(() => {
    if (!isAnyPending) setPendingConnectorId(null);
  }, [isAnyPending]);

  const handleConnect = (connector: (typeof connectors)[number]) => {
    setPendingConnectorId(connector.uid);
    connect({ connector });
  };

  return (
    <div className="flex flex-col gap-4 min-w-[17rem] sm:min-w-80">
      <h2 className="mb-1 text-lg font-medium text-gray-800">Connect Wallet</h2>

      {connectors.map((connector) => {
        const isConnectorPending = pendingConnectorId === connector.uid;
        const ConnectorLogo = connectorLogos[connector.name] || IconWallet;

        return (
          <button
            className="btn-styles"
            key={connector.uid}
            onClick={() => handleConnect(connector)}
            disabled={isAnyPending}
          >
            {isConnectorPending ? (
              <Spinner height={22} width={22} />
            ) : (
              <ConnectorLogo height={24} width={24} />
            )}
            {connector.name}
          </button>
        );
      })}
    </div>
  );
}

export default WalletOptions;
