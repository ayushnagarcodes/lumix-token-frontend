import IconSpinner from "@/_assets/icons/spinner.svg";

interface SpinnerProps {
  className?: string;
  height?: number;
  width?: number;
}

function Spinner({ className, height, width }: SpinnerProps) {
  return (
    <IconSpinner
      className={`animate-spin ${className}`}
      height={height}
      width={width}
    />
  );
}

export default Spinner;
