"use client";

import { useState } from "react";
import IconCheck from "@/_assets/icons/check.svg";
import IconCopy from "@/_assets/icons/copy.svg";

interface CopyClipboardProps {
  text: string;
  className?: string;
}

function CopyClipboard({ text, className }: CopyClipboardProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsChecked(true);
    setTimeout(() => setIsChecked(false), 1000);
  };

  return (
    <button className={className} onClick={handleCopy} type="button">
      {isChecked ? (
        <IconCheck height={20} width={20} />
      ) : (
        <IconCopy height={20} width={20} />
      )}
    </button>
  );
}

export default CopyClipboard;
