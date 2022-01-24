import React from "react";
import styles from "./index.module.css";

const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

function Keyboard({ onWriteLetter, onEraseLetter, onEnterClick }) {
  return (
    <div className={styles.keyboardContainer}>
      <div className={styles.keyboardRow}>
        {firstRow.map((letter) => (
          <div
            key={letter}
            className={styles.keyboardLetter}
            onClick={() => onWriteLetter(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className={styles.keyboardRow}>
        {secondRow.map((letter) => (
          <div
            key={letter}
            className={styles.keyboardLetter}
            onClick={() => onWriteLetter(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className={styles.keyboardRow}>
        <div
          className={`${styles.keyboardLetter} ${styles.bigLetter}`}
          onClick={() => onEnterClick()}
        >
          Enter
        </div>
        {thirdRow.map((letter) => (
          <div
            key={letter}
            className={styles.keyboardLetter}
            onClick={() => onWriteLetter(letter)}
          >
            {letter}
          </div>
        ))}
        <div
          className={`${styles.keyboardLetter} ${styles.bigLetter}`}
          onClick={() => onEraseLetter()}
        >
          Back
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
