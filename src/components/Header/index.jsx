import React from "react";
import styles from "./index.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.title}>wordle helper</div>
    </div>
  );
}

export default Header;
