import Modal from "@/_components/Modal";
import WalletOptions from "@/_components/wallet/WalletOptions";

function ConnectWallet() {
  return (
    <Modal>
      <Modal.Open windowName="connect-wallet">
        <button className="btn-styles">Connect</button>
      </Modal.Open>

      <Modal.Window windowName="connect-wallet">
        <WalletOptions />
      </Modal.Window>
    </Modal>
  );
}

export default ConnectWallet;
