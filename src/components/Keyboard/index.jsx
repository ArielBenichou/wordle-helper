import React from "react";
import { LANGUAGES } from "../../constants/languages";
import KeyLetter from "../KeyLetter";
import KeysRow from "../KeysRow";
import styles from "./index.module.css";

const keyboardRowsEn = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];
const keyboardRowsHe = [
  ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
  ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
  ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'],
];

function Keyboard({ onWriteLetter, onEraseLetter, onEnterClick, language }) {
  const keyboardRows = language === LANGUAGES.ENGLISH ? keyboardRowsEn : keyboardRowsHe;
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
