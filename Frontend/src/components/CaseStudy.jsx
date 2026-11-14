// CaseStudy.jsx
// Short, scannable explanation of a project, shown at the bottom of its sheet (see ProjectDetail in Projects.jsx).
// It is meant to be understood in a few seconds of scrolling: how it works, one image, the key results.
// The sections come from `caseStudy` in src/data/projects.js;
// their texts come from `items.<id>.story.<section id>` in src/locales/<language>/projects.json.
//
// Section types:
//   steps  - how it works, as a short row of numbered steps
//   image  - one image with a caption (a placeholder box until `src` is set)
//   stats  - a row of key figures

import { useTranslation } from 'react-i18next';
import styles from './CaseStudy.module.css';

function Steps({ text }) {
  return (
    <ol className={styles.steps}>
      {text.steps.map((step, i) => (
        <li key={i}>
          <span className={styles.stepNumber}>{i + 1}</span>
          <strong>{step.title}</strong>
          <span>{step.detail}</span>
        </li>
      ))}
    </ol>
  );
}

function Image({ data, text }) {
  return (
    <figure className={styles.figure}>
      {data.src ? (
        <img src={data.src} alt={text.alt} />
      ) : (
        <div className={styles.placeholder}>{text.placeholder}</div>
      )}
      {text.caption && <figcaption>{text.caption}</figcaption>}
    </figure>
  );
}

function Stats({ data, text }) {
  return (
    <dl className={styles.stats}>
      {data.items.map((item) => (
        <div key={item.key} className={styles.stat}>
          <dd className={styles.statValue}>{text.items[item.key].value}</dd>
          <dt>{text.items[item.key].label}</dt>
        </div>
      ))}
    </dl>
  );
}

const RENDERERS = { steps: Steps, image: Image, stats: Stats };

export default function CaseStudy({ sections, story }) {
  const { t } = useTranslation('projects');
  if (!sections?.length || !story) return null;

  return (
    <div className={styles.caseStudy}>
      <p className={styles.lead}>{t('ui.caseStudy')}</p>
      {sections.map((section) => {
        const Renderer = RENDERERS[section.type];
        const text = story[section.id];
        if (!Renderer || !text) return null;
        return (
          <section key={section.id} className={styles.section}>
            {text.title && <h3>{text.title}</h3>}
            <Renderer data={section} text={text} />
          </section>
        );
      })}
    </div>
  );
}
