import { useTranslation } from 'react-i18next';
import styles from './CurriculumVitae.module.css';

// Entries of the CV, grouped by section. Dates, titles and organisations are the same texts
// as the My Journey timeline (journey.json "entries"), so the two never disagree; the short
// summaries and the rest of the CV are under "cv" and "hashtags" in journey.json.
const CV_SECTIONS = [
  { id: 'experience', entries: ['cephalgo', 'nttdata', 'mentor'] },
  { id: 'education', entries: ['bachelor', 'cybersecurityDiploma'] },
  { id: 'publications', entries: ['journalPublication', 'articlePresentation', 'cisti'] },
  { id: 'honors', entries: ['excellence', 'hackforgood', 'adabyron'] },
];

// Curriculum Vitae, set like a newspaper page: a headline between rules, then two columns
// split by a thin rule (details on the left, dated entries on the right).
export default function CurriculumVitae() {
  const { t } = useTranslation('journey');

  return (
    <section id="cv" className={styles.cv} aria-labelledby="cv-title">
      <h2 id="cv-title" className={styles.cvTitle}>{t('cv.title')}</h2>

      <div className={styles.cvBody}>
        <aside className={styles.cvSide}>
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
          {/* one line of text, the tags separated by middle dots */}
          <p className={styles.cvTags}>{t('hashtags.items', { returnObjects: true }).join(' · ')}</p>
        </aside>

        <div className={styles.cvMain}>
          {CV_SECTIONS.map((section) => (
            <section key={section.id} className={styles.cvSection}>
              <h4>{t(`cv.sections.${section.id}`)}</h4>
              {section.entries.map((id) => (
                <article key={id} className={styles.cvEntry}>
                  <p className={styles.cvDate}>{t(`entries.${id}.date`)}</p>
                  <div>
                    <h5>{t(`entries.${id}.title`)}</h5>
                    <p className={styles.cvOrg}>{t(`entries.${id}.organization`)}</p>
                    <p className={styles.cvSummary}>{t(`cv.summaries.${id}`)}</p>
                  </div>
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
