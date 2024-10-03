import { useEffect, useRef, MutableRefObject } from "react";

export function useOutsideClick(
  handler: () => void,
  listenCapturing: boolean = true
): MutableRefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
