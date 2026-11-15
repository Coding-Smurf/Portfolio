import NavigationBar from '../components/NavigationBar.jsx';
import Seo from '../components/Seo.jsx';
import ScrollHint from '../components/ScrollHint.jsx';
import CurriculumVitae from '../components/CurriculumVitae.jsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { timelineEntries } from '../data/journey.js';
import styles from './MyJourney.module.css';

// Language-independent data of each entry (URLs, DOI, dates): see data/journey.js.
// Its texts live in src/locales/<language>/journey.json under "entries.<id>".

// Graph geometry, in px: width of a lane and height of the commit dot inside its row
const LANE = 20;
// Colour of each side (--tone): green for education, blue for experience
const tone = { left: styles.toneLeft, right: styles.toneRight };
const DOT_Y = 34;
// How far a leader goes past the graph into the gap before the card (the gap is 1.25rem)
const LEADER_REACH = 14;
// How far the lines run past the edges of their row (see verticalStyle in GraphCell)
const OVERLAP = 2;

// Turns the entries into the rows of the graph, newest first. A branch gives two rows:
// its card (at its end, or at the top if it is ongoing) and a small fork row at its start.
// Within the same month, forks go above commits and commits above merges, so a branch
// that starts the month another one ends sits above it.
// Lanes are numbered from the main line (0): negative to the left, positive to the right.
function buildGraph(entries) {
  const rows = [];
  entries.forEach((entry, index) => {
    if (entry.start) {
      rows.push({ kind: 'branch', entry, index, key: entry.end ?? '9999-99', tier: 2 });
      rows.push({ kind: 'fork', entry, index, key: entry.start, tier: 0 });
    } else {
      rows.push({ kind: 'commit', entry, index, key: entry.when, tier: 1 });
    }
  });
  rows.sort((a, b) => b.key.localeCompare(a.key) || a.tier - b.tier || a.index - b.index);

  // Time scale: each row is as tall as the months until the next row (see --gap in the
  // CSS), so a long stage looks long. An ongoing branch counts up to today.
  const today = new Date();
  const toMonths = (key) => {
    if (key === '9999-99') return today.getFullYear() * 12 + today.getMonth();
    const [year, month] = key.split('-').map(Number);
    return year * 12 + month - 1;
  };
  rows.forEach((row) => { row.months = toMonths(row.key); });
  rows.forEach((row, i) => { row.gap = i < rows.length - 1 ? row.months - rows[i + 1].months : 0; });

  // Each branch takes the free lane closest to the main line on its side
  const laneEnds = { left: [], right: [] };
  const branches = {};
  rows.forEach((row, i) => {
    if (row.kind !== 'branch') return;
    const { side, id } = row.entry;
    const forkRow = rows.findIndex((r) => r.kind === 'fork' && r.entry.id === id);
    const ends = laneEnds[side];
    let depth = 1;
    while (ends[depth] !== undefined && ends[depth] >= i) depth += 1;
    ends[depth] = forkRow;
    const lane = side === 'left' ? -depth : depth;
    branches[id] = { lane, side, from: i, to: forkRow, open: row.entry.end == null };
  });
  rows.forEach((row) => {
    row.lane = row.kind === 'commit' ? 0 : branches[row.entry.id].lane;
  });

  const left = Math.max(0, laneEnds.left.length - 1);
  const right = Math.max(0, laneEnds.right.length - 1);
  return { rows, branches: Object.values(branches), left, lanes: left + 1 + right };
}

// The lines and the dot of one row of the graph. Every join is a straight line at a
// right angle: a branch leaves and rejoins the main line with a horizontal rule.
function GraphCell({ rowIndex, row, graph, active }) {
  const width = graph.lanes * LANE;
  const x = (lane) => LANE / 2 + (graph.left + lane) * LANE;
  const mainX = x(0);
  const lastRow = graph.rows.length - 1;
  const vertical = [];
  const horizontal = [];

  // Main line: dashed into the top (still going on), it stops at the oldest dot
  if (rowIndex === 0) {
    vertical.push({ x: mainX, top: 0, height: DOT_Y, dashed: true });
    vertical.push({ x: mainX, top: DOT_Y });
  } else {
    vertical.push({ x: mainX, top: 0, height: rowIndex === lastRow ? DOT_Y : undefined });
  }

  graph.branches.forEach(({ lane, side, from, to, open }) => {
    const bx = x(lane);
    if (rowIndex > from && rowIndex < to) vertical.push({ x: bx, top: 0, branch: side });
    if (rowIndex === from) {
      vertical.push({ x: bx, top: DOT_Y, branch: side });
      if (open) vertical.push({ x: bx, top: 0, height: DOT_Y, branch: side, dashed: true });
      else horizontal.push({ from: bx, to: mainX, branch: side });
    }
    if (rowIndex === to) {
      vertical.push({ x: bx, top: 0, height: DOT_Y, branch: side });
      horizontal.push({ from: mainX, to: bx, branch: side });
    }
  });

  // A dotted leader from the dot to the card. On narrow screens every card is on the
  // right, so a card from the left side gets a second leader that only shows there.
  const dotX = x(row.lane);
  if (row.kind !== 'fork') {
    const left = row.entry.side === 'left';
    horizontal.push({ from: dotX, to: left ? -LEADER_REACH : width + LEADER_REACH, leader: true, desktop: left });
    if (left) horizontal.push({ from: dotX, to: width + LEADER_REACH / 2, leader: true, mobile: true });
  }

  const cls = (...names) => names.filter(Boolean).join(' ');

  // The #ink-print filter wears a pixel off the ends of every line, so the lines that
  // reach the top or bottom of the row run OVERLAP px past it and join the next row
  const verticalStyle = ({ x: left, top, height }) => {
    const start = top === 0 ? -OVERLAP : top;
    if (height === undefined) return { left, top: start, bottom: -OVERLAP };
    return { left, top: start, height: top + height - start };
  };

  return (
    <span className={styles.graphCell} style={{ width }} aria-hidden="true">
      {horizontal.map((line, i) => (
        <span
          key={`h${i}`}
          className={cls(
            styles.graphRule,
            line.branch && styles.graphLineBranch,
            line.branch && tone[line.branch],
            line.leader && styles.graphLeader,
            line.desktop && styles.graphDesktopOnly,
            line.mobile && styles.graphMobileOnly,
          )}
          style={{ left: Math.min(line.from, line.to), width: Math.abs(line.to - line.from), top: DOT_Y }}
        />
      ))}
      {vertical.map((line, i) => (
        <span
          key={`v${i}`}
          className={cls(styles.graphLine, line.branch && styles.graphLineBranch, line.branch && tone[line.branch], line.dashed && styles.graphLineDashed)}
          style={verticalStyle(line)}
        />
      ))}
      <span
        className={cls(
          styles.graphDot,
          tone[row.entry.side],
          row.kind === 'fork' && styles.graphDotFork,
          row.lane !== 0 && styles.graphDotBranch,
          active && styles.graphDotActive,
        )}
        style={{ left: dotX, top: DOT_Y }}
      />
    </span>
  );
}

export default function MyJourney() {
  const { t } = useTranslation('journey');
  const [fadeStarted, setFadeStarted] = useState(false);
  const [openEntry, setOpenEntry] = useState(null);

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

  // Coming from a link to /MyJourney#cv (the "See my CV" box on About me): go to the CV.
  // It waits a moment because ScrollToTop sends every new page to the top first.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash !== '#cv') return undefined;
    const timer = setTimeout(() => document.getElementById('cv')?.scrollIntoView(), 50);
    return () => clearTimeout(timer);
  }, [hash]);

  // Entries joined with the texts of the current language
  const entries = timelineEntries.map((base) => ({
    ...base,
    ...t(`entries.${base.id}`, { returnObjects: true }),
  }));

  const graph = buildGraph(entries);

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
          <ScrollHint label={t('hero.scroll')} />
        </section>

        <CurriculumVitae />

        <section className={styles.timelineSection} aria-label={t('timelineLabel')}>
          <div className={styles.timelineSides} style={{ '--graph-width': `${graph.lanes * LANE}px` }} aria-hidden="true">
            <span className={styles.sideLeft}>{t('sides.left')}</span>
            <span className={styles.sideRight}>{t('sides.right')}</span>
          </div>
          <ol className={styles.timelineList} style={{ '--graph-width': `${graph.lanes * LANE}px` }}>
            {graph.rows.map((row, rowIndex) => {
              const { entry } = row;
              const sideClass = `${entry.side === 'left' ? styles.sideLeft : styles.sideRight} ${tone[entry.side]}`;
              const cell = (
                <GraphCell rowIndex={rowIndex} row={row} graph={graph} active={openEntry === entry.id} />
              );

              // Where a branch starts: a small marker with its start date
              if (row.kind === 'fork') {
                return (
                  <li className={styles.forkRow} key={`${entry.id}-fork`} style={{ '--gap': row.gap }} aria-hidden="true">
                    {cell}
                    <span className={`${styles.forkLabel} ${sideClass}`}>
                      {entry.date.split(' - ')[0]} · {entry.title}
                    </span>
                  </li>
                );
              }

              const isOpen = openEntry === entry.id;
              const detailsId = `timeline-details-${entry.id.toLowerCase()}`;

              return (
                <li className={`${styles.timelineContainer} ${isOpen ? styles.timelineContainerOpen : ''}`} key={entry.id} style={{ '--gap': row.gap }}>
                  {cell}
                  <div className={`${styles.timelineCard} ${sideClass}`}>
                    <button
                      className={styles.timelineEntry}
                      type="button"
                      onClick={() => toggleEntry(entry.id)}
                      aria-expanded={isOpen}
                      aria-controls={detailsId}
                    >
                      <span className={styles.timelineEntryDate}>{entry.date}</span>
                      <span className={styles.timelineEntryTitle}>{entry.title}</span>
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
                </li>
              );
            })}
          </ol>
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
