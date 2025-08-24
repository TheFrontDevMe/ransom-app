"use client";

import { useEffect } from "react";

/**
 * Custom hook to detect clicks outside a specified element.
 *
 * This hook listens for `mousedown` and `touchstart` events on the document.
 * If a click occurs outside the referenced element, the provided callback function is executed.
 *
 * @param {React.RefObject<HTMLElement>} ref - A React ref pointing to the target element.
 * @param {(event: MouseEvent | TouchEvent) => void} handleOnClickOutside - Callback function to execute when a click outside is detected.
 */

export function useClickOutside(ref, handleOnClickOutside) {
  useEffect(() => {
    // Event listener function
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // Call the provided handler if click is outside
      handleOnClickOutside(event);
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handleOnClickOutside]); // Re-run effect if ref or handler changes
}
