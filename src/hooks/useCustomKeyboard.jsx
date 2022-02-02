import { EN_ALPHABET, HE_ALPHABET } from "../constants/abc";
import { LANGUAGES } from "../constants/languages";
import { APP_ACTIONS } from "./useAppReducer";
import useKeyboard from "./useKeyboard";

function useCustomKeyboard(state, dispatch) {
  // ! letterPointer is not updating as it should so when pressing "SPACE" it doesn't work
  const { wordsNumber, lettersNumber, letterPointer, guessedWords } = state;
  const ALPHABET =
    state.language === LANGUAGES.ENGLISH ? EN_ALPHABET : HE_ALPHABET;
  const onKeyDown = (keyName, event) => {
    if (keyName === "Backspace") {
      dispatch({ type: APP_ACTIONS.ERASE_LETTER });
    } else if (keyName === " ") {
      event.preventDefault();

      const getLastLetterIndex = (letterIndex) => {
        if (
          (letterIndex[0] === 0 && letterIndex[1] === 0) ||
          (letterIndex[0] === wordsNumber - 1 &&
            letterIndex[1] === lettersNumber - 1)
        )
          return null;
        return letterIndex[1] <= lettersNumber - 1 && letterIndex[1] > 0
          ? [letterIndex[0], letterIndex[1] - 1]
          : [letterIndex[0] - 1, lettersNumber - 1];
      };
      const lastLetterPointer = getLastLetterIndex(letterPointer);
      if (!lastLetterPointer) return;

      dispatch({
        type: APP_ACTIONS.CHANGE_LETTER_STATUS,
        payload: guessedWords[lastLetterPointer[0]][lastLetterPointer[1]],
      });
    } else if (keyName === "Enter") {
      dispatch({ type: APP_ACTIONS.FILTER_POSSIBLE_WORDS });
    } else if (!event.ctrlKey && ALPHABET.includes(keyName.toLowerCase())) {
      dispatch({
        type: APP_ACTIONS.WRITE_LETTER,
        payload: keyName.toLowerCase(),
      });
    }
  };

  useKeyboard(onKeyDown);
  return;
}

export default useCustomKeyboard;
