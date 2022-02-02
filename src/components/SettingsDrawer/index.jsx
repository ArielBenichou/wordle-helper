import React from "react";
import styles from "./index.module.css";
import CloseIcon from "../../assets/close.svg?component";
import PillCounter from "../PillCounter";
import { APP_ACTIONS } from "../../hooks/useAppReducer";
import Select from "../Select";
import { LANGUAGES } from "../../constants/languages";

function SettingsDrawer({ closeSettings, state, dispatch }) {
  const setLettersNumber = (val) => {
    dispatch({ type: APP_ACTIONS.SET_LETTERS_NUMBER, payload: val });
  };

  const setWordsNumber = (val) => {
    dispatch({ type: APP_ACTIONS.SET_WORDS_NUMBER, payload: val });
  };

  const setLanguage = (val) => {
    console.log(val);
    dispatch({ type: APP_ACTIONS.SET_LANGUAGE, payload: val });
  };

  const resetAll = () => {
    dispatch({ type: APP_ACTIONS.RESET_ALL });
  };

  return (
    <>
      <div className={styles.shadow} onClick={closeSettings}></div>
      <div className={styles.container}>
        <div className={styles.contents}>
          <CloseIcon className={styles.close} onClick={closeSettings} />
          <div className={styles.title}>Menu</div>
          <div className={styles.menu}>
            <div className={styles.menuItem}>
              <div className={styles.text}>Language:</div>
              <Select
                value={state.language}
                values={Object.values(LANGUAGES)}
                setValue={setLanguage}
              />
            </div>
            {/* <div className={styles.menuItem}>
              <div className={styles.text}>Letters:</div>
              <PillCounter
                value={state.lettersNumber}
                setValue={setLettersNumber}
                min={2}
                max={10}
              />
            </div> */}
            <div className={styles.menuItem}>
              <div className={styles.text}>Words:</div>
              <PillCounter
                value={state.wordsNumber}
                setValue={setWordsNumber}
                min={1}
                max={10}
              />
            </div>
            <div className={styles.menuItem}>
              <div className={styles.resetButton} onClick={resetAll}>
                Rest All
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default SettingsDrawer;
