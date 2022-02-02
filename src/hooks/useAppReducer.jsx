import { useReducer } from "react";
import { filterWords } from "../algorithms/filter-words";
import { LetterStatus } from "../constants/letter-status";
import { LANGUAGES } from "../constants/languages";
import wordsData from "../data/words.json";
import { deepClone } from "../utils/clone";
import { THEMES } from "../constants/themes";

// === INIT & DEFAULT ===
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_WORDS_NUMBER = 6;
const DEFAULT_LETTERS_NUMBER = 5;

const initPossibleWords = () => [];
const initGuessedWords = (wordsNumber, letterNumber) => {
  return Array(wordsNumber)
    .fill(null)
    .map((word, i) =>
      Array(letterNumber)
        .fill(null)
        .map((letter, j) => ({ content: "", status: null, id: [i, j] }))
    );
};
const initLetterPointer = () => [0, 0];

// initialState
const initState = () => ({
  guessedWords: initGuessedWords(DEFAULT_WORDS_NUMBER, DEFAULT_LETTERS_NUMBER),
  letterPointer: initLetterPointer(),
  possibleWords: initPossibleWords(),
  pageSize: DEFAULT_PAGE_SIZE,
  wordsNumber: DEFAULT_WORDS_NUMBER,
  lettersNumber: DEFAULT_LETTERS_NUMBER,
  language: LANGUAGES.ENGLISH,
  theme: THEMES.DARK,
});

// === ACTION TYPE ===
export const APP_ACTIONS = {
  RESET_STATE: "RESET_STATE",
  INCREASE_PAGE_SIZE: "INCREASE_PAGE_SIZE",
  SET_POSSIBLE_WORDS: "SET_POSSIBLE_WORDS",
  SET_LETTER_POINTER: "SET_LETTER_POINTER",
  SET_GUESSED_WORDS: "SET_GUESSED_WORDS",
  SET_WORDS_NUMBER: "SET_WORDS_NUMBER",
  SET_LETTERS_NUMBER: "SET_LETTERS_NUMBER",
  FILTER_POSSIBLE_WORDS: "FILTER_POSSIBLE_WORDS",
  WRITE_LETTER: "WRITE_LETTER",
  ERASE_LETTER: "ERASE_LETTER",
  CHANGE_LETTER_STATUS: "CHANGE_LETTER_STATUS",
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_THEME: "SET_THEME",
  RESET_ALL: "RESET_ALL",
};

// === ACTIONS ===
const changeLetterStatus = (guessedWords, letter) => {
  const getNextStatus = (status) => {
    if (status === LetterStatus.ABSENT) return LetterStatus.PRESENT;
    if (status === LetterStatus.PRESENT) return LetterStatus.CORRECT;
    if (status === LetterStatus.CORRECT) return LetterStatus.ABSENT;
  };

  const newGuessedWords = deepClone(guessedWords);
  const foundLetter = newGuessedWords[letter.id[0]][letter.id[1]];
  foundLetter.status = getNextStatus(foundLetter.status);
  return newGuessedWords;
};

const filterResult = (state) => {
  const { guessedWords } = state;

  console.time("filterResult");
  //TODO: use the number of letters per words to load the correct pool of words
  const first5LettersWordIndex = 6963;
  const last5LettersWordIndex = 19613;
  const possibleWords = filterWords(
    wordsData.words.slice(first5LettersWordIndex, last5LettersWordIndex),
    guessedWords
  );
  console.timeEnd("filterResult");

  return possibleWords;
};

const eraseLetter = (state) => {
  const { letterPointer, guessedWords, lettersNumber } = state;
  if (letterPointer[0] === 0 && letterPointer[1] === 0) {
    console.log("min letters!");
    return {};
  }

  const newLetterPointer = deepClone(letterPointer);
  newLetterPointer[1] -= 1;
  if (newLetterPointer[1] < 0) {
    newLetterPointer[0] -= 1;
    newLetterPointer[1] = lettersNumber - 1;
  }

  const newGuessedWords = deepClone(guessedWords);
  const foundLetter = newGuessedWords[newLetterPointer[0]][newLetterPointer[1]];
  foundLetter.content = "";
  foundLetter.status = null;

  return { newLetterPointer, newGuessedWords };
};

const writeLetter = (state, letterContent) => {
  const { letterPointer, guessedWords, wordsNumber, lettersNumber } = state;
  if (letterPointer[0] > wordsNumber - 1) {
    console.log("max letters!");
    return {};
  }

  const newGuessedWords = deepClone(guessedWords);
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

  const newLetterPointer = deepClone(letterPointer);
  newLetterPointer[1] += 1;
  if (newLetterPointer[1] > lettersNumber - 1) {
    newLetterPointer[0] += 1;
    newLetterPointer[1] = 0;
  }

  return { newGuessedWords, newLetterPointer };
};

// === REDUCER ===
function reducer(state, action) {
  switch (action.type) {
    case APP_ACTIONS.RESET_ALL:
      return { ...initState() };
    case APP_ACTIONS.RESET_STATE:
      return {
        ...state,
        guessedWords: initGuessedWords(state.wordsNumber, state.lettersNumber),
        letterPointer: initLetterPointer(),
        possibleWords: initPossibleWords(),
        pageSize: DEFAULT_PAGE_SIZE,
      };
    case APP_ACTIONS.INCREASE_PAGE_SIZE:
      return { ...state, pageSize: state.pageSize + DEFAULT_PAGE_SIZE };
    case APP_ACTIONS.SET_POSSIBLE_WORDS:
      return { ...state, possibleWords: action.payload };
    case APP_ACTIONS.SET_LETTER_POINTER:
      return { ...state, letterPointer: action.payload };
    case APP_ACTIONS.SET_GUESSED_WORDS:
      return { ...state, guessedWords: action.payload };
    case APP_ACTIONS.SET_WORDS_NUMBER:
      return {
        ...state,
        wordsNumber: action.payload,
        guessedWords: initGuessedWords(action.payload, state.lettersNumber),
        letterPointer: initLetterPointer(),
      };
    case APP_ACTIONS.SET_LETTERS_NUMBER:
      return {
        ...state,
        lettersNumber: action.payload,
        guessedWords: initGuessedWords(state.wordsNumber, action.payload),
        letterPointer: initLetterPointer(),
      };
    case APP_ACTIONS.CHANGE_LETTER_STATUS:
      return {
        ...state,
        guessedWords: changeLetterStatus(state.guessedWords, action.payload),
      };
    case APP_ACTIONS.FILTER_POSSIBLE_WORDS:
      return {
        ...state,
        pageSize: DEFAULT_PAGE_SIZE,
        possibleWords: filterResult(state),
      };
    case APP_ACTIONS.ERASE_LETTER:
      const eraseRes = eraseLetter(state);
      return {
        ...state,
        ...(eraseRes.newLetterPointer
          ? { letterPointer: eraseRes.newLetterPointer }
          : {}),
        ...(eraseRes.newGuessedWords
          ? { guessedWords: eraseRes.newGuessedWords }
          : {}),
      };
    case APP_ACTIONS.WRITE_LETTER:
      const writeRes = writeLetter(state, action.payload);
      return {
        ...state,
        ...(writeRes.newLetterPointer
          ? { letterPointer: writeRes.newLetterPointer }
          : {}),
        ...(writeRes.newGuessedWords
          ? { guessedWords: writeRes.newGuessedWords }
          : {}),
      };
    case APP_ACTIONS.SET_LANGUAGE:
      if (Object.values(LANGUAGES).includes(action.payload)) {
        return { ...state, language: action.payload };
      } else {
        return state;
      }
    case APP_ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    default:
      throw new Error();
  }
}

// === HOOK ===
function useAppReducer() {
  const [state, dispatch] = useReducer(reducer, initState());
  return [state, dispatch];
}

export default useAppReducer;
