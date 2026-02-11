import { useEffect, useRef } from 'react';

type DOMEvent = MouseEvent | TouchEvent;

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: (event: DOMEvent) => void,
): { current: T | null } => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: DOMEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);

  return ref;
};

export default useClickOutside;
