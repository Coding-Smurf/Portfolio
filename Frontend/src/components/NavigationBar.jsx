import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Preferences from './Preferences.jsx';
import styles from './NavigationBar.module.css';

export default function NavigationBar({currentPage}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkClass = (page) => {
    return `${styles.navLink} ${currentPage === page ? styles.active : ''}`;
  };

  return (
    <>
    {/* Language selector and theme toggle, top right */}
    <Preferences />

    <nav className={styles.navContainer}>

      {/* Hamburger menu icon (mobile only via CSS) */}
      <div
        className={styles.hamburger}
        onClick={toggleMenu}
        role="button"
        aria-label={t('nav.menu')}
        aria-expanded={isOpen}
      >
        <div className={`${styles.line} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${isOpen ? styles.open : ''}`}></div>
      </div>

      {/* Menu links */}
      <div className={`${styles.navbar} ${isOpen ? styles.open : ''}`}>

        {/* Left */}
        <div className={styles.leftLinks}>
          <Link to="/AboutMe" className={linkClass("AboutMe")} onClick={() => setIsOpen(false)}>{t('nav.aboutMe')}</Link>
          <div className={styles.separator}></div>
          <Link to="/Projects" className={linkClass("Projects")} onClick={() => setIsOpen(false)}>{t('nav.projects')}</Link>
          <div className={styles.separator}></div>
          <Link to="/MyJourney" className={linkClass("MyJourney")} onClick={() => setIsOpen(false)}>{t('nav.myJourney')}</Link>
        </div>

        {/* Right */}
        <div className={styles.rightLink}>
          <Link to="/ContactMe" className={linkClass("ContactMe")} onClick={() => setIsOpen(false)}>{t('nav.contactMe')}</Link>
        </div>

      </div>
    </nav>
    </>
  );
}
