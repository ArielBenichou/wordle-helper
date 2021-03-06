import React from "react";
import BoxRow from "../BoxRow";
import styles from "./index.module.css";

function Grid({ guessedWords, changeLetterStatus, language }) {
  return (
    <div className={styles.grid}>
      {guessedWords.map((word, idx) => (
        <BoxRow
          key={idx}
          guessedWord={word}
          onLetterClick={changeLetterStatus}
          language={language}
        />
      ))}
    </div>
  );
}

export default Grid;
