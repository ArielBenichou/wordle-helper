import React from "react";
import styles from "./index.module.css";

function KeyLetter({ letter, onLetterClick, isBigLetter = false }) {
  return (
    <div
      key={letter}
      className={`${styles.keyboardLetter} ${
        isBigLetter ? styles.bigLetter : ""
      }`}
      onClick={() => onLetterClick(letter)}
    >
      {letter}
    </div>
  );
}

export default KeyLetter;
