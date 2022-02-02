import React from "react";
import { LANGUAGES } from "../../constants/languages";
import Box from "../Box";
import styles from "./index.module.css";

function BoxRow({ guessedWord, onLetterClick, language }) {
  return (
    <div
      className={`${styles.boxesContainer} ${
        language === LANGUAGES.HEBREW ? styles.reverse : ""
      }`}
    >
      {guessedWord.map((letter, idx) => (
        <Box key={idx} letter={letter} onLetterClick={onLetterClick} />
      ))}
    </div>
  );
}

export default BoxRow;
