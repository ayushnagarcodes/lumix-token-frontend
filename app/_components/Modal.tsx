"use client";

import Image from "next/image";
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";

import type { ReactNode, ReactElement, HTMLProps } from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "@/_hooks/useOutsideClick";
import IconXCircle from "@/_assets/icons/x-circle.svg";

interface ModalContextType {
  activeWindow: string | null;
  handleOpenModal: (window: string) => void;
  handleCloseModal: () => void;
}

interface ModalProps {
  children: ReactNode;
}

interface OpenProps {
  windowName: string;
  children: ReactElement<HTMLProps<HTMLButtonElement>>;
}

interface WindowProps {
  windowName: string;
  children: ReactElement<{ onCloseModal?: () => void }>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Modal({ children }: ModalProps) {
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const handleOpenModal = (window: string) => setActiveWindow(window);
  const handleCloseModal = () => setActiveWindow(null);

  return (
    <ModalContext.Provider
      value={{ activeWindow, handleOpenModal, handleCloseModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a <ModalContext.Provider>");
  }

  return context;
}

function Open({ windowName, children }: OpenProps) {
  const { handleOpenModal } = useModal();

  return cloneElement(children, { onClick: () => handleOpenModal(windowName) });
}

function Window({ windowName, children }: WindowProps) {
  const { activeWindow, handleCloseModal } = useModal();
  const ref = useOutsideClick<HTMLDivElement>(handleCloseModal, true);

  if (activeWindow !== windowName) return null;

  return createPortal(
    <div className="fixed inset-0 p-2 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        ref={ref}
        className="bg-white max-h-screen overflow-auto rounded-lg shadow-lg mx-4 p-6 relative"
      >
        <button
          type="button"
          className="absolute top-[1.375rem] right-5 p-1 text-gray-600 hover:text-gray-900 transition"
          onClick={handleCloseModal}
        >
          <IconXCircle height={22} width={22} />
        </button>

        {cloneElement(children, {
          onCloseModal: handleCloseModal,
        })}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
