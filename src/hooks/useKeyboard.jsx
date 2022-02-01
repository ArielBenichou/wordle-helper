import { useEffect } from "react";

function useKeyboard(callback) {
  useEffect(() => {
    const eventLis = window.addEventListener("keydown", (event) => {
      callback(event.key, event);
    });

    return () => {
      document.removeEventListener("keydown", eventLis);
    };
  }, []);

  return;
}

export default useKeyboard;
