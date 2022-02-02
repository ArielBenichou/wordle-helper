import React from "react";
import styles from "./index.module.css";

function PillCounter({ value, setValue, max = 10, min = 0 }) {
  const increase = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  const decrease = () => {
    if (value > min) {
      setValue(value - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.block} onClick={decrease}>
        -
      </div>
      <div className={styles.block}>{value}</div>
      <div className={styles.block} onClick={increase}>
        +
      </div>
    </div>
  );
}

export default PillCounter;
