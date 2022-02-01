import React from "react";
import styles from "./index.module.css";

function HintBar() {
  return (
    <div className={styles.container}>
      <div className={styles.hint}>
        <b>Hint!</b> tap on the square to change color
      </div>
    </div>
  );
}

export default HintBar;
