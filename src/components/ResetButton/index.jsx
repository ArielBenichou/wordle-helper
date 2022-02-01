import React from "react";
import styles from "./index.module.css";

function ResetButton({onClickButton}) {
  return (
    <div className={styles.resetButton} onClick={onClickButton}>
      Reset
    </div>
  );
}

export default ResetButton;
