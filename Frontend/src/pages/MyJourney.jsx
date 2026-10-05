import NavigationBar from '../components/NavigationBar.jsx';
import Seo from '../components/Seo.jsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MyJourney.module.css';

// Language-independent data of each entry (URLs, DOI). Its texts live in
// src/locales/<language>/journey.json under "entries.<id>".
const UFV_URL = 'https://www.ufv.es/estudiar-grado-informatica-madrid/';

const timelineEntries = [
  { id: 'journalPublication', doi: '10.62161/sauc.v11.6010', url: 'https://doi.org/10.62161/sauc.v11.6010' },
  { id: 'articlePresentation', linkUrl: 'https://www.smartcityexpo.com/' },
  { id: 'cephalgo', linkUrl: 'https://cephalgo.com/' },
  { id: 'cybersecurityDiploma', linkUrl: UFV_URL },
  { id: 'bachelor', linkUrl: UFV_URL },
  { id: 'nttdata', linkUrl: 'https://www.nttdata.com/' },
  { id: 'excellence', linkUrl: UFV_URL },
  {
    id: 'cisti',
    linkUrl: 'https://itmasoc.org/cisti2024/modules/request.php?module=oc_program&action=summary.php&id=326',
    secondaryLinkUrl: 'https://itmasoc.org/cisti2024/modules/request.php?module=oc_program&action=program.php',
  },
  { id: 'hackforgood', linkUrl: 'https://www.fundaciontelefonica.com/noticias/campus-42-sedes-mayor-hackathon-espana/' },
  { id: 'adabyron', linkUrl: 'https://ada-byron.es/2024/reg/madrid/equipos.php' },
  { id: 'mentor', linkUrl: 'https://www.fundaciononce.es/es/que-hacemos/universidad-y-discapacidad' },
  { id: 'english' },
  { id: 'french' },
];

export default function MyJourney() {
  const { t } = useTranslation('journey');
  const [fadeStarted, setFadeStarted] = useState(false);
  const [openEntry, setOpenEntry] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    requestAnimationFrame(() => setFadeStarted(true));
    const timer = setTimeout(() => {
      document.body.style.overflowY = 'auto';
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflowY = 'auto';
    };
  }, []);

  // Hide the scroll hint once the page is scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entries joined with the texts of the current language
  const entries = timelineEntries.map((base) => ({
    ...base,
    ...t(`entries.${base.id}`, { returnObjects: true }),
  }));

  const toggleEntry = (id) => {
    setOpenEntry((currentEntry) => currentEntry === id ? null : id);
  };

  return (
    <main className={styles.container}>
      <Seo title={t('seo.title')} path="MyJourney" description={t('seo.description')} />
      <NavigationBar currentPage="MyJourney" />

      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        <section className={styles.hero}>
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          <div className={`${styles.heroSeparator} ${scrolled ? styles.hidden : ''}`}></div>
          <p className={`${styles.heroScroll} ${scrolled ? styles.hidden : ''}`}>{t('hero.scroll')}</p>
        </section>

        <section className={styles.timelineSection} aria-label={t('timelineLabel')}>
          {entries.map((entry) => {
            const isOpen = openEntry === entry.id;
            const detailsId = `timeline-details-${entry.id.toLowerCase()}`;

            return (
              <div className={`${styles.timelineContainer} ${isOpen ? styles.timelineContainerOpen : ''}`} key={entry.id}>
                <button
                  className={styles.timelineEntry}
                  type="button"
                  onClick={() => toggleEntry(entry.id)}
                  aria-expanded={isOpen}
                  aria-controls={detailsId}
                >
                  <span className={styles.timelineContentWrapper}>
                    <span className={styles.timelineEntryDate}>{entry.date}</span>
                    <span className={styles.timelineEntryTitle}>{entry.title}</span>
                  </span>
                  <span className={styles.timelineEntryOrganization}>{entry.organization}</span>
                </button>
                <div className={styles.timelineDetails} id={detailsId} aria-hidden={!isOpen}>
                  <div className={styles.timelineDetailsInner}>
                    <p>{entry.description}</p>
                    {entry.citation && <p className={styles.timelineCitation}>{entry.citation}</p>}
                    {entry.doi && (
                      <a className={styles.timelineDoi} href={entry.url} target="_blank" rel="noreferrer">
                        {t('doi')}: {entry.doi} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {entry.linkLabel && entry.linkUrl && (
                      <a className={styles.timelineDoi} href={entry.linkUrl} target="_blank" rel="noreferrer">
                        {entry.linkLabel} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {entry.secondaryLinkLabel && entry.secondaryLinkUrl && (
                      <a className={styles.timelineDoi} href={entry.secondaryLinkUrl} target="_blank" rel="noreferrer">
                        {entry.secondaryLinkLabel} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className={styles.footer}>
          <p>{t('footer.contact')}</p>
          <div className={styles.contactIconsWrapper}>
            <a href="https://www.linkedin.com/in/adri-ortiz" target="_blank" rel="noreferrer" className={styles.contactLink}>
              <img src={`${import.meta.env.BASE_URL}images/icons/linkedin.png`} alt={t('footer.linkedinAlt')} className={styles.contactIcon} />
            </a>
            <a href="mailto:adrian.ortiz.prof@gmail.com" className={styles.contactLink}>
              <img src={`${import.meta.env.BASE_URL}images/icons/outlook.png`} alt={t('footer.emailAlt')} className={styles.contactIcon} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
