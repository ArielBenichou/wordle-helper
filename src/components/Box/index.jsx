import React from "react";
import styles from "./index.module.css";

import styled from "styled-components";
import { LetterStatus } from "../../constants/letter-status";

const StyledBox = styled.div`
  background-color: ${({ bgColor }) => {
    if (!bgColor) return "none";
    else if (bgColor === LetterStatus.ABSENT) return "var(--color-absent)";
    else if (bgColor === LetterStatus.CORRECT) return "var(--color-correct)";
    else if (bgColor === LetterStatus.PRESENT) return "var(--color-present)";
  }};
`;

function Box({ letter, onLetterClick }) {
  return (
    <StyledBox
      bgColor={letter.status}
      className={styles.box}
      onClick={() => onLetterClick(letter)}
    >
      {letter.content}
    </StyledBox>
  );
}

export default Box;
