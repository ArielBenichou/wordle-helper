import { useEffect, useState } from "react";
import { APP_ACTIONS } from "./useAppReducer";

function useLocalStorage(state, dispatch) {
  const [timeoutHandle, setTimeoutHandle] = useState(null);
  useEffect(() => {
    loadStateToLocalStorage();
  }, []);

  useEffect(() => {
    if (!timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
    const handle = setTimeout(() => {
      saveStateToLocalStorage();
    }, 1000);
    setTimeoutHandle(handle);

    return () => {
      clearTimeout(timeoutHandle);
    };
  }, [state]);

  const saveStateToLocalStorage = () => {
    localStorage.setItem("guessedWords", JSON.stringify(state.guessedWords));
    localStorage.setItem("letterPointer", JSON.stringify(state.letterPointer));
  };

  const loadStateToLocalStorage = () => {
    const guessedWords = JSON.parse(localStorage.getItem("guessedWords"));
    const letterPointer = JSON.parse(localStorage.getItem("letterPointer"));
    if (guessedWords) {
      dispatch({
        type: APP_ACTIONS.SET_GUESSED_WORDS,
        payload: guessedWords,
      });
    }
    if (letterPointer) {
      dispatch({
        type: APP_ACTIONS.SET_LETTER_POINTER,
        payload: letterPointer,
      });
    }
  };

  return;
}

export default useLocalStorage;
