import React from "react";
import HintBar from "../HintBar";
import ResetButton from "../ResetButton";
import styles from "./index.module.css";

function TopRow({ resetGrid }) {
  return (
    <div className={styles.container}>
      <HintBar />
      <ResetButton onClickButton={resetGrid} />
    </div>
  );
}

export default TopRow;
