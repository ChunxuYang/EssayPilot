import { useEffect, useState } from "react";

/**
 * Used to count how many times the user has left the page
 * @returns {boolean} leaving - whether the user is leaving the page
 * @returns {number} count - how many times the user has left the page
 * @returns {function} clearCount - function to clear the count
 */
export const useLeavingCount = (onReturning?: () => void) => {
  const [leaving, setLeaving] = useState(false);
  const [count, setCount] = useState(0);

  const clearCount = () => {
    setCount(0);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setLeaving(true);
      } else {
        setLeaving(false);
        onReturning?.();
        setCount((count) => count + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { leaving, count, clearCount };
};
