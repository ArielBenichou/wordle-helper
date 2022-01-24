import { useState, useEffect } from "react";
import styles from "./App.module.css";
import BoxRow from "./components/BoxRow";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import WordsList from "./components/WordsList";
import wordsData from "./data/words.json";

const DEFAULT_PAGE_SIZE = 10;

const initGuessedWords = () => {
  return Array(1)
    .fill(null)
    .map((word, i) =>
      Array(5)
        .fill(null)
        .map((letter, j) => ({ content: "", status: null, id: [i, j] }))
    );
};

function initLetterPointer() {
  return [0, 0];
}

function App() {
  const [guessedWords, setGuessedWords] = useState(initGuessedWords());
  const [letterPointer, setLetterPointer] = useState(initLetterPointer());
  const [possibleWords, setPossibleWords] = useState([]);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    if (guessedWords[0][0].content === "") {
      return;
    }
    filterResult();
  }, [guessedWords]);

  const changeLetterStatus = (letter) => {
    if (!letter.content) {
      return;
    }

    const getNextStatus = (status) => {
      if (status === "present") return "correct";
      if (status === "correct") return "absent";
      if (status === "absent") return "present";
    };
    const newGuessedWords = [...guessedWords];
    const foundLetter = newGuessedWords[letter.id[0]][letter.id[1]];
    foundLetter.status = getNextStatus(foundLetter.status);
    setGuessedWords(newGuessedWords);
  };

  const writeLetter = (letterContent) => {
    if (letterPointer[0] > 5) {
      console.log("max letters!");
      return;
    }

    const newGuessedWords = [...guessedWords];
    const foundLetter = newGuessedWords[letterPointer[0]][letterPointer[1]];
    foundLetter.content = letterContent;
    foundLetter.status = "absent";
    setGuessedWords(newGuessedWords);

    const newLetterPointer = letterPointer;
    newLetterPointer[1] += 1;
    if (newLetterPointer[1] > 4) {
      newLetterPointer[0] += 1;
      newLetterPointer[1] = 0;
    }
    setLetterPointer(newLetterPointer);
  };

  const eraseLetter = () => {
    if (letterPointer[0] === 0 && letterPointer[1] === 0) {
      console.log("min letters!");
      return;
    }

    const newLetterPointer = letterPointer;
    newLetterPointer[1] -= 1;
    if (newLetterPointer[1] < 0) {
      newLetterPointer[0] -= 1;
      newLetterPointer[1] = 4;
    }
    console.log(newLetterPointer);
    setLetterPointer(newLetterPointer);

    const newGuessedWords = [...guessedWords];
    const foundLetter =
      newGuessedWords[newLetterPointer[0]][newLetterPointer[1]];
    foundLetter.content = "";
    foundLetter.status = null;
    setGuessedWords(newGuessedWords);
  };

  const resetGrid = () => {
    setGuessedWords(initGuessedWords());
    setLetterPointer(initLetterPointer());
    setPageSize(DEFAULT_PAGE_SIZE);
  };

  const filterResult = () => {
    console.time("filterResult");

    setPageSize(DEFAULT_PAGE_SIZE);

    const allAbsentLetters = guessedWords
      .reduce((acc, word) => {
        return [...acc, ...word.filter((letter) => letter.status === "absent")];
      }, [])
      .map((letter) => letter.content);

    const allPresentLetters = guessedWords
      .reduce((acc, word) => {
        return [
          ...acc,
          ...word.filter((letter) => letter.status === "present"),
        ];
      }, [])
      .map((letter) => letter.content);
    console.log(allPresentLetters);

    const first5LettersWordIndex = 6963;
    const last5LettersWordIndex = 19613;

    const newPossibleWords = wordsData.words
      .slice(first5LettersWordIndex, last5LettersWordIndex)
      .filter((w) => {
        const regex = new RegExp(`[${allAbsentLetters.join("|")}]`, "gi");
        const found = w.match(regex);
        return !found;
      })
      .filter((w) => {
        return allPresentLetters.every((l) => {
          const regex = new RegExp(`[${l}]`, "gi");
          const found = w.match(regex);
          return found;
        });
      })
      .filter((w) => {
        return guessedWords.every((word) => {
          const pattern = word
            .map((l) => (l.status === "correct" ? l.content : "."))
            .join("");
          const regex = new RegExp(`${pattern}`, "gi");
          const found = w.match(regex);
          return found;
        });
      });

    setPossibleWords(newPossibleWords);
    console.timeEnd("filterResult");
  };

  const showMoreWords = () => {
    setPageSize(pageSize + DEFAULT_PAGE_SIZE);
  };

  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.main}>
        <div className={styles.resetContainer}>
          <div className={styles.hintContainer}>
            <div className={styles.hint}>
              <b>Hint!</b> tap on the square to change color
            </div>
          </div>
          <div className={styles.resetButton} onClick={resetGrid}>
            Reset
          </div>
        </div>
        <div className={styles.boxesGrid}>
          {guessedWords.map((word, idx) => (
            <BoxRow
              key={idx}
              guessedWord={word}
              onLetterClick={changeLetterStatus}
            />
          ))}
        </div>
        {possibleWords.length ? (
          <WordsList
            possibleWords={possibleWords.slice(0, pageSize)}
            showMore={showMoreWords}
            isAllPossibleWordsShown={pageSize >= possibleWords.length}
          />
        ) : null}
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
