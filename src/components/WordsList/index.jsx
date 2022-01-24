import React from "react";
import Word from "../Word";
import styles from "./index.module.css";

function WordsList({ possibleWords, showMore }) {
  return (
    <div className={styles.wordsList}>
      {possibleWords.map((word) => (
        <Word key={word} word={word} />
      ))}
      <div className={styles.showMore} onClick={() => showMore()}>
        more...
      </div>
    </div>
  );
}

export default WordsList;
