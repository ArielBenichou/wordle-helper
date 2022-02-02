import React from "react";
import styles from "./index.module.css";

function Select({ value, values, setValue }) {
  return (
    <select className={styles.select} value={ value} onChange={(e) => setValue(e.target.value)}>
      {values.map((val) => (
        <option key={val} className={styles.option} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
}

export default Select;
