// Language-independent data of the My Journey page (URLs, DOI, dates on the graph) and of
// the CV on that page. Texts live in src/locales/<language>/journey.json under
// "entries.<id>" and "cv". Used by pages/MyJourney.jsx, components/CurriculumVitae.jsx and
// the static HTML generated at build time (src/prerender).

const UFV_URL = 'https://www.ufv.es/estudiar-grado-informatica-madrid/';

// `when` places each entry on the graph ('YYYY-MM'). Entries with a start and an end are
// drawn as branches: they leave the main line at `start` and merge back at `end`
// (`end: null` means it is still going on, so the branch stays open at the top).
// `side` says where the entry goes: 'left' is education, 'right' is experience. Branches
// open on that side of the main line and every card sits on its side.
export const timelineEntries = [
  { id: 'journalPublication', side: 'right', when: '2025-11', doi: '10.62161/sauc.v11.6010', url: 'https://doi.org/10.62161/sauc.v11.6010' },
  { id: 'articlePresentation', side: 'right', when: '2025-11', linkUrl: 'https://www.smartcityexpo.com/' },
  { id: 'cephalgo', side: 'right', start: '2025-06', end: null, linkUrl: 'https://cephalgo.com/' },
  { id: 'cybersecurityDiploma', side: 'left', start: '2021-09', end: '2025-06', linkUrl: UFV_URL },
  { id: 'bachelor', side: 'left', start: '2021-09', end: '2025-06', linkUrl: UFV_URL },
  { id: 'nttdata', side: 'right', start: '2024-09', end: '2025-06', linkUrl: 'https://www.nttdata.com/' },
  { id: 'excellence', side: 'left', when: '2024-07', linkUrl: UFV_URL },
  {
    id: 'cisti',
    side: 'right',
    when: '2024-06',
    linkUrl: 'https://itmasoc.org/cisti2024/modules/request.php?module=oc_program&action=summary.php&id=326',
    secondaryLinkUrl: 'https://itmasoc.org/cisti2024/modules/request.php?module=oc_program&action=program.php',
  },
  { id: 'hackforgood', side: 'right', when: '2024-03', linkUrl: 'https://www.fundaciontelefonica.com/noticias/campus-42-sedes-mayor-hackathon-espana/' },
  { id: 'adabyron', side: 'left', when: '2024-03', linkUrl: 'https://ada-byron.es/2024/reg/madrid/equipos.php' },
  { id: 'mentor', side: 'right', start: '2022-09', end: '2023-06', linkUrl: 'https://www.fundaciononce.es/es/que-hacemos/universidad-y-discapacidad' },
  { id: 'english', side: 'left', when: '2021-03' },
  { id: 'french', side: 'left', when: '2019-03' },
];

// Entries of the CV, grouped by section. Dates, titles and organisations are the same texts
// as the timeline (journey.json "entries"), so the two never disagree; the short summaries
// and the rest of the CV are under "cv" and "hashtags" in journey.json.
export const CV_SECTIONS = [
  { id: 'experience', entries: ['cephalgo', 'nttdata', 'mentor'] },
  { id: 'education', entries: ['bachelor', 'cybersecurityDiploma'] },
  { id: 'publications', entries: ['journalPublication', 'articlePresentation', 'cisti'] },
  { id: 'honors', entries: ['excellence', 'hackforgood', 'adabyron'] },
];
