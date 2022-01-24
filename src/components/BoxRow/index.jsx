import React from "react";
import Box from "../Box";
import styles from "./index.module.css";

function BoxRow({ guessedWord, onLetterClick }) {
  return (
    <div className={styles.boxesContainer}>
      {guessedWord.map((letter, idx) => (
        <Box key={idx} letter={letter} onLetterClick={onLetterClick} />
      ))}
    </div>
  );
}

export default BoxRow;
