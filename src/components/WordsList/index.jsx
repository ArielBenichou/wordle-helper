import React from "react";
import Word from "../Word";
import styles from "./index.module.css";

function WordsList({ possibleWords, showMore, isAllPossibleWordsShown }) {
  return (
    <div className={styles.wordsList}>
      {possibleWords.map((word) => (
        <Word key={word} word={word} />
      ))}
      {!isAllPossibleWordsShown ? (
        <div className={styles.showMore} onClick={() => showMore()}>
          more...
        </div>
      ) : null}
    </div>
  );
}

export default WordsList;
