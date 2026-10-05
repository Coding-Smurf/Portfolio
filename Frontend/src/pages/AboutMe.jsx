// AboutMe.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import Seo from '../components/Seo.jsx';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AboutMe.module.css';

// Entries of the CV, grouped by section. Dates, titles and organisations come from the
// journey texts (so they never disagree with My Journey); the short summaries are in about.json.
const CV_SECTIONS = [
  { id: 'experience', entries: ['cephalgo', 'nttdata', 'mentor'] },
  { id: 'education', entries: ['bachelor', 'cybersecurityDiploma'] },
  { id: 'publications', entries: ['journalPublication', 'articlePresentation', 'cisti'] },
  { id: 'honors', entries: ['excellence', 'hackforgood', 'adabyron'] },
];

export default function AboutMe() {
  const { t } = useTranslation('about');
  const { t: tj } = useTranslation('journey');
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
          <p>{t('hero.subtitle')}</p>
          <div className={`${styles.heroSeparator} ${scrolled ? styles.hidden : ''}`}></div>
          <p className={scrolled ? styles.hidden : ''}>{t('hero.scroll')}</p>
        </section>
        {/* Fullscreen Hero */}

        {/* Page Content */}
        <section className={styles.contentSection}>

          {/* Curriculum Vitae */}
          <section className={styles.cv} aria-labelledby="cv-title">
            <h3 id="cv-title" className={styles.cvTitle}>{t('cv.title')}</h3>

            <div className={styles.cvBody}>
              <aside className={styles.cvSide}>
                <div className={styles.cvIdentity}>
                  <div className={styles.imageWrapper}>
                    <img src={`${import.meta.env.BASE_URL}images/other/AdrianOrtizRamirez.png`} alt={t('intro.name')} className={styles.profileImage}/>
                  </div>
                  <h2>{t('intro.name')}</h2>
                  <p className={styles.cvRole}>{t('intro.role')}</p>
                  <p className={styles.cvAge}>{t('info.age')}</p>
                </div>

                <h4>{t('cv.contactTitle')}</h4>
                <dl className={styles.cvContact}>
                  <dt>{t('cv.contact.phone')}</dt>
                  <dd><a href="tel:+34660164574">+34 660 164 574</a></dd>
                  <dt>{t('cv.contact.email')}</dt>
                  <dd><a href="mailto:adrian.ortiz.prof@gmail.com">adrian.ortiz.prof@gmail.com</a></dd>
                  <dt>{t('cv.contact.linkedin')}</dt>
                  <dd><a href="https://www.linkedin.com/in/adri-ortiz" target="_blank" rel="noreferrer">linkedin.com/in/adri-ortiz</a></dd>
                  <dt>{t('cv.contact.location')}</dt>
                  <dd>{t('cv.locationValue')}</dd>
                </dl>

                <h4>{t('cv.languagesTitle')}</h4>
                <ul className={styles.cvList}>
                  {t('cv.languages', { returnObjects: true }).map((language) => (
                    <li key={language.name}>
                      <strong>{language.name}</strong> <span>{language.level}</span>
                    </li>
                  ))}
                </ul>

                <h4>{t('cv.skillsTitle')}</h4>
                <ul className={styles.cvList}>
                  {t('cv.skills', { returnObjects: true }).map((group) => (
                    <li key={group.title}>
                      <strong>{group.title}</strong> <span>{group.items}</span>
                    </li>
                  ))}
                </ul>

                <h4>{t('hashtags.title')}</h4>
                <ul className={styles.cvTags}>
                  {t('hashtags.items', { returnObjects: true }).map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </aside>

              <div className={styles.cvMain}>
                <section className={styles.cvSection}>
                  <h4>{t('cv.profileTitle')}</h4>
                  <p className={styles.cvProfile}>{t('intro.p1')}</p>
                  <p className={`${styles.cvProfile} ${styles.cvQuote}`}>{t('intro.p2')}</p>
                </section>

                {CV_SECTIONS.map((section) => (
                  <section key={section.id} className={styles.cvSection}>
                    <h4>{t(`cv.sections.${section.id}`)}</h4>
                    {section.entries.map((id) => (
                      <article key={id} className={styles.cvEntry}>
                        <p className={styles.cvDate}>{tj(`entries.${id}.date`)}</p>
                        <div>
                          <h5>{tj(`entries.${id}.title`)}</h5>
                          <p className={styles.cvOrg}>{tj(`entries.${id}.organization`)}</p>
                          <p className={styles.cvSummary}>{t(`cv.summaries.${id}`)}</p>
                        </div>
                      </article>
                    ))}
                  </section>
                ))}
              </div>
            </div>
          </section>
          {/* Curriculum Vitae */}

        </section>
        {/* Page Content */}
      </div>
    </main>
  );
}
