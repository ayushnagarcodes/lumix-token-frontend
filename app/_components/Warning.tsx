import IconWarning from "@/_assets/icons/warning.svg";

const warningColors = {
  red: "#ef4444",
  yellow: "#ca8a04",
};

interface WarningProps {
  text: string;
  color: "red" | "yellow";
  className?: string;
}

function Warning({ text, color, className }: WarningProps) {
  return (
    <span
      style={{ color: warningColors[color] }}
      className={`text-sm flex items-center gap-1.5 ${className}`}
    >
      <IconWarning height={16} width={16} />
      {text}
    </span>
  );
}

export default Warning;
