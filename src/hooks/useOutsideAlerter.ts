import React, { useEffect } from "react";

export const useOutsideAlerter = (
  ref: React.RefObject<HTMLElement>,
  setStatus: (status: boolean) => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setStatus(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setStatus]);
};
