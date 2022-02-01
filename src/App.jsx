import { useEffect } from "react";
import styles from "./App.module.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import TopRow from "./components/TopRow";
import WordsList from "./components/WordsList";
import useAppReducer, { APP_ACTIONS } from "./hooks/useAppReducer";
import useCustomKeyboard from "./hooks/useCustomKeyboard";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [state, dispatch] = useAppReducer();
  useLocalStorage(state, dispatch);
  useCustomKeyboard(state, dispatch);

  useEffect(() => {
    if (state.guessedWords[0][0].content === "") {
      return;
    }
    filterResult();
  }, [state.guessedWords]);

  const changeLetterStatus = (letter) => {
    if (!letter.content) {
      return;
    }
    dispatch({ type: APP_ACTIONS.CHANGE_LETTER_STATUS, payload: letter });
  };

  const writeLetter = (letterContent) => {
    dispatch({ type: APP_ACTIONS.WRITE_LETTER, payload: letterContent });
  };

  const eraseLetter = () => {
    dispatch({ type: APP_ACTIONS.ERASE_LETTER });
  };

  const filterResult = () => {
    dispatch({ type: APP_ACTIONS.FILTER_POSSIBLE_WORDS });
  };

  const resetGrid = () => {
    dispatch({ type: APP_ACTIONS.RESET_STATE });
  };

  const showMoreWords = () => {
    dispatch({ type: APP_ACTIONS.INCREASE_PAGE_SIZE });
  };

  const isAllPossibleWordsShown = () =>
    state.pageSize >= state.possibleWords.length;

  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.main}>
        <TopRow resetGrid={resetGrid} />
        <Grid
          guessedWords={state.guessedWords}
          changeLetterStatus={changeLetterStatus}
        />
        <WordsList
          possibleWords={state.possibleWords.slice(0, state.pageSize)}
          showMore={showMoreWords}
          isAllPossibleWordsShown={isAllPossibleWordsShown()}
        />
        <p className={styles.copyright}>© Ariel Benichou</p>
      </div>
      <Keyboard
        onWriteLetter={writeLetter}
        onEraseLetter={eraseLetter}
        onEnterClick={filterResult}
      />
    </div>
  );
}

export default App;
