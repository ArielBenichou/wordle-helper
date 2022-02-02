import React from "react";
import styles from "./index.module.css";
import GitHubIcon from "../../assets/github.svg?component";

function Footer() {
  const navigateToGithub = () => {
    window.open("https://github.com/ArielBenichou/wordle-helper", "_blank");
  };

  return (
    <div className={styles.container}>
      <p className={styles.copyright}>© Ariel Benichou</p>
      <GitHubIcon className={styles.github} onClick={navigateToGithub} />
    </div>
  );
}

export default Footer;
