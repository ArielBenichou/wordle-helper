import React from "react";
import styles from "./index.module.css";

const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const thirdRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

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
