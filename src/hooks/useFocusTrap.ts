import { useEffect, useRef, type RefObject } from "react";

const useFocusTrap = (
  containerRef: RefObject<HTMLElement | null>,
  isContainerOpen: boolean,
  wasContainerOpenRef: RefObject<boolean>,
  closeBtnRef: RefObject<HTMLButtonElement | null>,
  closeMethod: () => void
) => {
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !closeBtnRef.current) return;

    if (isContainerOpen) {
      prevFocusRef.current = document.activeElement as HTMLElement | null;
      closeBtnRef.current.focus();
    } else if (wasContainerOpenRef.current) {
      prevFocusRef.current?.focus();
    }

    wasContainerOpenRef.current = isContainerOpen;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || !isContainerOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeMethod();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = container.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, isContainerOpen, closeBtnRef, wasContainerOpenRef, closeMethod]);

};

export { useFocusTrap };