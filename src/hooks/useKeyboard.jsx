import React from "react";
import { useEffect, useState } from "react";

function useKeyboard(callback) {
  useEffect(() => {
    const eventLis = window.addEventListener("keydown", (event) => {
      callback(event.key, event.ctrlKey);
    });

    return () => {
      document.removeEventListener("keydown", eventLis);
    };
  }, []);

  return;
}

export default useKeyboard;
