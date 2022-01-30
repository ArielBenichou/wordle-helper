import { useState, useEffect } from "react";
import styles from "./App.module.css";
import BoxRow from "./components/BoxRow";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import WordsList from "./components/WordsList";
import { ALPHABET } from "./constants/abc";
import { LetterStatus } from "./constants/letter-status";
import wordsData from "./data/words.json";
import useKeyboard from "./hooks/useKeyboard";

const DEFAULT_PAGE_SIZE = 10;

const WORDS_NUMBER = 6;
const LETTERS_NUMBER = 5;

const initPossibleWords = () => [];

const initGuessedWords = () => {
  return Array(WORDS_NUMBER)
    .fill(null)
    .map((word, i) =>
      Array(LETTERS_NUMBER)
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
  const [possibleWords, setPossibleWords] = useState(initPossibleWords());
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const onKeyDown = (keyName, event) => {
    if (keyName === "Backspace") {
      eraseLetter();
    } else if (keyName === " ") {
      event.preventDefault();
      const getLastLetterIndex = (letterIndex) => {
        if (
          (letterIndex[0] === 0 && letterIndex[1] === 0) ||
          (letterIndex[0] === WORDS_NUMBER - 1 &&
            letterIndex[1] === LETTERS_NUMBER - 1)
        )
          return null;
        return letterIndex[1] <= LETTERS_NUMBER - 1 && letterIndex[1] > 0
          ? [letterIndex[0], letterIndex[1] - 1]
          : [letterIndex[0] - 1, LETTERS_NUMBER - 1];
      };

      const lastLetterPointer = getLastLetterIndex(letterPointer);
      if (!lastLetterPointer) return;
      changeLetterStatus(
        guessedWords[lastLetterPointer[0]][lastLetterPointer[1]]
      );
    } else if (keyName === "Enter") {
      filterResult();
    } else if (!event.ctrlKey && ALPHABET.includes(keyName.toLowerCase())) {
      writeLetter(keyName.toLowerCase());
    }
  };

  useKeyboard(onKeyDown);

  useEffect(() => {
    loadStateToLocalStorage();
  }, []);

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
      if (status === LetterStatus.PRESENT) return LetterStatus.CORRECT;
      if (status === LetterStatus.CORRECT) return LetterStatus.ABSENT;
      if (status === LetterStatus.ABSENT) return LetterStatus.PRESENT;
    };
    const newGuessedWords = [...guessedWords];
    const foundLetter = newGuessedWords[letter.id[0]][letter.id[1]];
    foundLetter.status = getNextStatus(foundLetter.status);
    setGuessedWords(newGuessedWords);
    saveStateToLocalStorage();
  };

  const writeLetter = (letterContent) => {
    if (letterPointer[0] > WORDS_NUMBER - 1) {
      console.log("max letters!");
      return;
    }

    const newGuessedWords = [...guessedWords];
    const foundLetter = newGuessedWords[letterPointer[0]][letterPointer[1]];
    foundLetter.content = letterContent;
    foundLetter.status = LetterStatus.ABSENT;
    // check if the letter in the same column but a row higher is the same as this one
    // if yes set the status to the same one 
    if (
      letterPointer[0] > 0 &&
      guessedWords[letterPointer[0] - 1][letterPointer[1]].content ===
        foundLetter.content
    ) {
      foundLetter.status =
        guessedWords[letterPointer[0] - 1][letterPointer[1]].status;
    }
    setGuessedWords(newGuessedWords);

    const newLetterPointer = letterPointer;
    newLetterPointer[1] += 1;
    if (newLetterPointer[1] > LETTERS_NUMBER - 1) {
      newLetterPointer[0] += 1;
      newLetterPointer[1] = 0;
    }
    setLetterPointer(newLetterPointer);
    saveStateToLocalStorage();
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
      newLetterPointer[1] = LETTERS_NUMBER - 1;
    }
    console.log(newLetterPointer);
    setLetterPointer(newLetterPointer);

    const newGuessedWords = [...guessedWords];
    const foundLetter =
      newGuessedWords[newLetterPointer[0]][newLetterPointer[1]];
    foundLetter.content = "";
    foundLetter.status = null;
    setGuessedWords(newGuessedWords);
    saveStateToLocalStorage();
  };

  const saveStateToLocalStorage = () => {
    localStorage.setItem("guessedWords", JSON.stringify(guessedWords));
    localStorage.setItem("letterPointer", JSON.stringify(letterPointer));
  };

  const loadStateToLocalStorage = () => {
    setGuessedWords(
      JSON.parse(localStorage.getItem("guessedWords")) || initGuessedWords()
    );
    setLetterPointer(
      JSON.parse(localStorage.getItem("letterPointer")) || initLetterPointer()
    );
  };

  const clearStateToLocalStorage = () => {
    localStorage.setItem("guessedWords", JSON.stringify(initGuessedWords()));
    localStorage.setItem("letterPointer", JSON.stringify(initLetterPointer()));
  };

  const resetGrid = () => {
    setGuessedWords(initGuessedWords());
    setLetterPointer(initLetterPointer());
    setPossibleWords(initPossibleWords());
    setPageSize(DEFAULT_PAGE_SIZE);
    clearStateToLocalStorage();
  };

  const filterResult = () => {
    console.time("filterResult");

    setPageSize(DEFAULT_PAGE_SIZE);

    const allAbsentLetters = guessedWords
      .reduce((acc, word) => {
        return [
          ...acc,
          ...word.filter((letter) => letter.status === LetterStatus.ABSENT),
        ];
      }, [])
      .map((letter) => letter.content);

    const allPresentLetters = guessedWords.reduce((acc, word) => {
      return [
        ...acc,
        ...word.filter((letter) => letter.status === LetterStatus.PRESENT),
      ];
    }, []);

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
          //the present letter can't be in its place
          if (w[l.id[1]] === l.content) return false;

          //but it must be in the word
          const regex = new RegExp(`${l.content}`, "gi");
          const found = w.match(regex);
          return found;
        });
      })
      .filter((w) => {
        return guessedWords.every((word) => {
          const pattern = word
            .map((l) => (l.status === LetterStatus.CORRECT ? l.content : "."))
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
