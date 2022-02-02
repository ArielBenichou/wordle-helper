import React from "react";
import styles from "./index.module.css";
import SettingsIcon from "../../assets/settings.svg?component";
import SettingsDrawer from "../SettingsDrawer";
import { useState } from "react";

function Header({ state, dispatch }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.title}>wordle helper</div>
      <SettingsIcon className={styles.settings} onClick={openSettings} />
      {isSettingsOpen ? (
        <SettingsDrawer
          closeSettings={closeSettings}
          state={state}
          dispatch={dispatch}
        />
      ) : null}
    </div>
  );
}

export default Header;
