import { useEffect } from "react";
import styles from "./App.module.css";
import Footer from "./components/Footer";
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

  // ! there is a problem with the hebrew and the space fix before release
  // useCustomKeyboard(state, dispatch);

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
      <Header state={state} dispatch={dispatch} />
      <div className={styles.main}>
        <TopRow resetGrid={resetGrid} />
        <Grid
          guessedWords={state.guessedWords}
          changeLetterStatus={changeLetterStatus}
          language={state.language}
        />
        <WordsList
          possibleWords={state.possibleWords.slice(0, state.pageSize)}
          showMore={showMoreWords}
          isAllPossibleWordsShown={isAllPossibleWordsShown()}
        />
        <Footer />
      </div>
      <Keyboard
        onWriteLetter={writeLetter}
        onEraseLetter={eraseLetter}
        onEnterClick={filterResult}
        language={state.language}
      />
    </div>
  );
}

export default App;
