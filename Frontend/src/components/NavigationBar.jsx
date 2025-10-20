import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationBar.module.css';

export default function NavigationBar({currentPage}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkClass = (page) => {
    return `${styles.navLink} ${currentPage === page ? styles.active : ''}`;
  };

  return (
    <nav className={styles.navContainer}>
      
      {/* Hamburger menu icon (mobile only via CSS) */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={`${styles.line} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${isOpen ? styles.open : ''}`}></div>
      </div>

      {/* Menu links */}
      <div className={`${styles.navbar} ${isOpen ? styles.open : ''}`}>

        {/* Left */}
        <div className={styles.leftLinks}>
          <Link to="/AboutMe" className={linkClass("AboutMe")} onClick={() => setIsOpen(false)}>About Me</Link>
          <div className={styles.separator}></div>
          <Link to="/Projects" className={linkClass("Projects")} onClick={() => setIsOpen(false)}>Projects</Link>
          <div className={styles.separator}></div>
          <Link to="/MyJourney" className={linkClass("MyJourney")} onClick={() => setIsOpen(false)}>My Journey</Link>
        </div>

        {/* Right */}
        <div className={styles.rightLink}>
          <Link to="/ContactMe" className={linkClass("ContactMe")} onClick={() => setIsOpen(false)}>Contact Me</Link>
        </div>

      </div>
    </nav>
  );
}
