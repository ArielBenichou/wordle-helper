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
    localStorage.setItem(
      "game",
      JSON.stringify({
        guessedWords: state.guessedWords,
        letterPointer: state.letterPointer,
      })
    );
    localStorage.setItem(
      "settings",
      JSON.stringify({
        language: state.language,
        lettersNumber: state.lettersNumber,
        wordsNumber: state.wordsNumber,
        theme: state.theme,
      })
    );
  };

  const loadStateToLocalStorage = () => {
    const { guessedWords, letterPointer } =
      JSON.parse(localStorage.getItem("game")) || {};
    if (guessedWords && letterPointer) {
      dispatch({
        type: APP_ACTIONS.SET_GUESSED_WORDS,
        payload: guessedWords,
      });
      dispatch({
        type: APP_ACTIONS.SET_LETTER_POINTER,
        payload: letterPointer,
      });
    }
    const { language, lettersNumber, wordsNumber, theme } =
      JSON.parse(localStorage.getItem("settings")) || {};
    if (language && lettersNumber && wordsNumber) {
      dispatch({
        type: APP_ACTIONS.SET_LANGUAGE,
        payload: language,
      });
      dispatch({
        type: APP_ACTIONS.SET_LETTERS_NUMBER,
        payload: lettersNumber,
      });
      dispatch({
        type: APP_ACTIONS.SET_WORDS_NUMBER,
        payload: wordsNumber,
      });
      dispatch({
        type: APP_ACTIONS.SET_THEME,
        payload: theme,
      });
    }
  };

  return;
}

export default useLocalStorage;
