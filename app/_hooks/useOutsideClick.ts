import { useEffect, useRef } from "react";
import type { RefObject } from "react";

function useOutsideClick<T extends HTMLElement>(
  action: () => void,
  isCapturingPhase: boolean
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    }

    document.addEventListener("click", handleOutsideClick, isCapturingPhase);

    return () => {
      document.removeEventListener(
        "click",
        handleOutsideClick,
        isCapturingPhase
      );
    };
  }, [action, isCapturingPhase]);

  return ref;
}

export default useOutsideClick;
