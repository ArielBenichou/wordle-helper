import React from "react";
import KeyLetter from "../KeyLetter";
import KeysRow from "../KeysRow";
import styles from "./index.module.css";

const keyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

function Keyboard({ onWriteLetter, onEraseLetter, onEnterClick }) {
  return (
    <div className={styles.keyboardContainer}>
      {keyboardRows.map((row, i) => (
        <KeysRow key={i}>
          {i === 2 ? (
            <KeyLetter
              letter={"Enter"}
              onLetterClick={onEnterClick}
              isBigLetter
            />
          ) : null}
          {row.map((letter) => (
            <KeyLetter
              key={letter}
              letter={letter}
              onLetterClick={onWriteLetter}
            />
          ))}
          {i === 2 ? (
            <KeyLetter
              letter={"Back"}
              onLetterClick={onEraseLetter}
              isBigLetter
            />
          ) : null}
        </KeysRow>
      ))}
    </div>
  );
}

export default Keyboard;
