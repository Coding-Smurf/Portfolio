// AboutMe.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import Seo from '../components/Seo.jsx';
import ScrollHint from '../components/ScrollHint.jsx';
import { useState, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './AboutMe.module.css';

// The photo of Lady below the text is hidden for now; set to true to show it again
const SHOW_CAT = false;

export default function AboutMe() {
  const { t } = useTranslation('about');
  const [fadeStarted, setFadeStarted] = useState(false);


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
          <p>{t('hero.subtitle')}</p>
          <ScrollHint label={t('hero.scroll')} />
        </section>
        {/* Fullscreen Hero */}

        {/* Page Content */}
        <section className={styles.contentSection}>

          {/* Portrait, under the name set as a headline, with place and age below */}
          <figure className={styles.portrait}>
            <figcaption>Adrián Ortiz Ramírez</figcaption>
            <div className={styles.photo}>
              <img
                src={`${import.meta.env.BASE_URL}images/other/AdrianOrtizRamirez_Prado.webp`}
                alt={t('photo.alt')}
                width="895"
                height="1199"
                loading="lazy"
                decoding="async"
              />
              {/* runs down the outside of the right edge, from the top corner */}
              <span className={styles.photoSide}>{t('photo.side')}</span>
            </div>
            <div className={styles.photoMeta}>
              <span>
                <span className="material-symbols-rounded" role="img" aria-label={t('photo.locationLabel')}>location_on</span>
                {t('photo.location')}
              </span>
              <span>{t('photo.age')}</span>
            </div>
          </figure>

          {/* A short text about the way I see things, below the portrait */}
          <div className={styles.story}>
            {/* the text marks the role with <strong> */}
            <p><Trans t={t} i18nKey="story.p1" components={{ strong: <strong /> }} /></p>
            <p>{t('story.p2')}</p>
            {/* a photo of Lady, the cat, closing the text (hidden for now, see SHOW_CAT) */}
            {SHOW_CAT && (
              <img
                className={styles.storyImage}
                src={`${import.meta.env.BASE_URL}images/other/Gata_Lady.webp`}
                alt={t('story.catAlt')}
                width="833"
                height="833"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>

          {/* What I am doing right now, in a boxed note with its title set on the top rule */}
          <aside className={styles.currently} aria-labelledby="currently-title">
            <h2 id="currently-title">{t('currently.title')}</h2>
            {/* the link to the CV runs on at the end of the text; the CV lives on My Journey
                and #cv scrolls straight to it */}
            <p>
              {t('currently.text')}{' '}
              <Link to="/MyJourney#cv" className={styles.cvLink}>{t('cvLink')}</Link>
            </p>
          </aside>

          {/* The text goes on after the box, in the same column but without a new drop cap */}
          <div className={`${styles.story} ${styles.storyContinued}`}>
            <p>{t('story.p3')}</p>
            <p>
              {t('story.p4')}{' '}
              <a href="https://orcid.org/0009-0001-2059-2424" target="_blank" rel="noopener noreferrer" className={styles.cvLink}>{t('researchLink')}</a>
            </p>
          </div>

          {/* Colophon: who made the site, then a rule running to the right edge that ends
              in a printer's ornament. The Claude Code logo comes from
              public/images/icons/claude-code.svg */}
          <footer className={styles.colophon}>
            <span className={styles.colophonText}>
              {t('colophon.createdBy')}{' '}
              {/* the logo file is used as a mask, so it takes the colour of the text */}
              <span
                className={styles.colophonLogo}
                role="img"
                aria-label="Claude Code"
                style={{ '--logo': `url(${import.meta.env.BASE_URL}images/icons/claude-code.svg)` }}
              />
            </span>
            <span className={styles.colophonRule} aria-hidden="true" />
            <span className={styles.colophonOrnament} aria-hidden="true">❧</span>
          </footer>

        </section>
        {/* Page Content */}
      </div>
    </main>
  );
}
