// AboutMe.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import Seo from '../components/Seo.jsx';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import fraktur from '../utils/fraktur.js';
import styles from './AboutMe.module.css';

export default function AboutMe() {
  const { t } = useTranslation('about');
  const [fadeStarted, setFadeStarted] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  // Event that triggers fade animation
  // when the component mounts
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    requestAnimationFrame(() => {
      setFadeStarted(true);
    });
    const timer = setTimeout(() => {
      document.body.style.overflowY = 'auto';
    }, 1000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflowY = 'auto';
    };}, []);

  // Event that detects scrolling 
  // to hide scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 10) {
        setScrolled(true);
    }};
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };}, [scrolled]);

  // Render the About Me page with navigation bar
  // and the rest of the content
  return (
    <main className={styles.container}>

      {/* Navigation Bar */}
      <Seo title={t('seo.title')} path="AboutMe" description={t('seo.description')} />
      <NavigationBar currentPage="AboutMe" />
      {/* Navigation Bar */}

      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        
        {/* Fullscreen Hero */}
        <section className={styles.hero}>
          <h1>{t('hero.title')}</h1>
          <p>{fraktur(t('hero.subtitle'))}</p>
          <div className={`${styles.heroSeparator} ${scrolled ? styles.hidden : ''}`}></div>
          <p className={scrolled ? styles.hidden : ''}>{t('hero.scroll')}</p>
        </section>
        {/* Fullscreen Hero */}

        {/* Page Content */}
        <section className={styles.contentSection}>

          {/* Intro Section */}
          <section className={styles.introSection}>
            <div className={styles.imageWrapper}>
              <img src={`${import.meta.env.BASE_URL}images/other/AdrianOrtizRamirez.png`} alt={t('intro.name')} className={styles.profileImage}/>
            </div>
            <div className={styles.textColumn}>
              <p>{t('intro.role')}</p>
              <h2>{t('intro.name')}</h2>
              <p>{t('intro.p1')}</p>
              <p>{t('intro.p2')}</p>
            </div>
          </section>
          {/* Intro Section */}

          {/* Personal Info Section */}
          <section className={styles.personalInfoSection}>
            <h3>{t('info.title')}</h3>
            <div>
              <span className="material-symbols-rounded">person</span>
              <p>{t('info.age')}</p>
            </div>
            <div>
              <span className="material-symbols-rounded">school</span>
              <p>{t('info.degree')}</p>
            </div>
            <div>
              <span className="material-symbols-rounded">language_chinese_dayi</span>
              <p>{t('info.languages')}</p>
            </div>
            <div>
              <span className="material-symbols-rounded">location_on</span>
              <p>{t('info.location')}</p>
            </div>
          </section>
          {/* Personal Info Section */}

          {/* Hashtags Section */}
          <section className={styles.hashtagsSection}>
            <h3>{t('hashtags.title')}</h3>
            <div className={styles.hashtagsContainer}>
              {t('hashtags.items', { returnObjects: true }).map((tag) => (
                <div key={tag}>
                  <p>{tag}</p>
                </div>
              ))}
            </div>
          </section>
          {/* Hashtags Section */}

        </section>
        {/* Page Content */}
      </div>
    </main>
  );
}
