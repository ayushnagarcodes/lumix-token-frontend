import Modal from "@/_components/Modal";
import WalletOptions from "@/_components/wallet/WalletOptions";
import IconPlugsConnected from "@/_assets/icons/plugs-connected.svg";

function ConnectWallet() {
  return (
    <Modal>
      <Modal.Open windowName="connect-wallet">
        <button className="btn-styles">
          <IconPlugsConnected height={20} width={20} /> Connect
        </button>
      </Modal.Open>

      <Modal.Window windowName="connect-wallet">
        <WalletOptions />
      </Modal.Window>
    </Modal>
  );
}

export default ConnectWallet;
