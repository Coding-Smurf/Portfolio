// Project data that does not depend on the language: images, ratings, years and link URLs.
// All the text (titles, descriptions, link labels...) lives in
// src/locales/<language>/projects.json under "items.<id>", and buildProjects() joins both.
//
// To add a project: add its entry here, then add the same id under "items" in each language.
// Links inside the description of a project that has a "tag" (the important ones) shimmer gold,
// except those written as [text](url 'plain').

// Files in public/ are served under the site's base path (/Portfolio/ on GitHub Pages)
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const KAGGLE_BASE = [
  {
    id: 'titanic',
    image: asset('images/projects/Kaggle/Titanic/card.png'),
    rating: 3,
    links: [
      { key: 'notebook', href: 'https://www.kaggle.com/code/codingsmurf/competition-titanic-simple-xgboost-0-78' },
      { key: 'competition', href: 'https://www.kaggle.com/competitions/titanic' },
    ],
  },
  {
    id: 'electricVehicles',
    image: asset('images/projects/Kaggle/electricVehicles/card.png'),
    rating: 3,
    links: [
      { key: 'notebook', href: 'https://www.kaggle.com/code/codingsmurf/competition-electric-vehicles-xgboost-0-94119auc' },
      { key: 'competition', href: 'https://www.kaggle.com/competitions/playground-series-s6e9' },
    ],
  },
  // Placeholders until the real projects arrive
  { id: 'kagglePlaceholder1', textKey: 'kagglePlaceholder', year: '2024', rating: 3.5, image: null, links: [] },
  { id: 'kagglePlaceholder2', textKey: 'kagglePlaceholder', year: '2024', rating: 4, image: null, links: [] },
];

const PROJECTS_BASE = [
  {
    id: 'museum',
    image: asset('images/projects/museum/card.png'),
    year: '2025',
    rating: 5,
    links: [
      { key: 'doi', href: 'https://doi.org/10.62161/sauc.v11.6010' },
      { key: 'pdf', href: 'https://visualcompublications.es/SAUC/article/view/6010/4435' },
    ],
  },
  {
    id: 'robustBiomarkers',
    image: asset('images/projects/robustBiomarkers/card.png'),
    year: '2026',
    rating: 5,
    links: [
      { key: 'publications', href: 'https://www.cephalgo.com/speech-analysis/research-publications#methodology' },
    ],
  },
  {
    id: 'explainableAlzheimer',
    image: asset('images/projects/explainableAlzheimer/card.png'),
    year: '2026',
    rating: 5,
    links: [],
  },
  {
    id: 'explainableParkinson',
    image: asset('images/projects/explainableParkinson/card.png'),
    year: '2026',
    rating: 5,
    links: [
      { key: 'parkinson', href: 'https://www.cephalgo.com/speech-analysis/parkinson#evidence' },
    ],
  },
  {
    id: 'alpaca',
    image: asset('images/projects/Alpaca/card.png'),
    year: '2024',
    rating: 3.5,
    links: [],
  },
];

// Joins a base entry with its translated text. `t` is the translate function of the "projects" namespace.
function withText(t, base, extra = {}) {
  const text = t(`items.${base.textKey ?? base.id}`, { returnObjects: true, ...extra });
  const labels = text.links ?? {};
  return {
    ...base,
    ...text,
    links: (base.links ?? []).map((link) => ({ label: labels[link.key] ?? link.key, href: link.href })),
  };
}

// Returns { projects, kaggle }: the main carousel (ending with the Kaggle collection) and the Kaggle carousel
export function buildProjects(t) {
  const kaggle = KAGGLE_BASE.map((base) => withText(t, base));

  const collection = withText(
    t,
    { id: 'kaggleStudies', collection: 'kaggle', image: null },
    { n: kaggle.length }
  );
  collection.members = kaggle;

  const projects = [...PROJECTS_BASE.map((base) => withText(t, base)), collection];

  return { projects, kaggle };
}
