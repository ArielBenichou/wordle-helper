import React from "react";
import styles from "./index.module.css";

function KeysRow({children}) {
  return (
    <div className={styles.keyboardRow}>
      {children}
    </div>
  );
}

export default KeysRow;
