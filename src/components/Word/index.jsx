import React from "react";
import styles from "./index.module.css";

function Word({ word }) {
  return (
    <div className={styles.wordContainer}>
      {word}
    </div>
  );
}

export default Word;
