import React from 'react';
import styles from './NavigationBar.module.css';

export default function NavigationBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftLinks}>
        <a href="#journey">My Journey</a>
        <div className={styles.separator}></div>
        <a href="#projects">Projects</a>
        <div className={styles.separator}></div>
        <a href="#about">About Me</a>
      </div>
      <div className={styles.rightLink}>
        <a href="#contact">Contact Me</a>
      </div>
    </nav>
  );
}
