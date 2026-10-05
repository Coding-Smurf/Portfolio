// Projects.jsx

import { createPortal } from 'react-dom';
import NavigationBar from '../components/NavigationBar.jsx';
import Seo from '../components/Seo.jsx';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { buildProjects } from '../data/projects.js';
import styles from './Projects.module.css';

const PLATES = [styles.plateDusk, styles.plateMoss, styles.plateClay, styles.plateSlate];

// Carousel geometry: the cards sit on an arc of radius RADIUS_RATIO * cardWidth,
// spaced so neighbours are (GAP_RATIO * cardWidth) apart along the arc.
const RADIUS_RATIO = 1.9;
const GAP_RATIO = 1.1;
const STEP_DEG = 2 * Math.atan((GAP_RATIO / 2) / RADIUS_RATIO) * (180 / Math.PI);
const DRAG_THRESHOLD = 5;
// Must match `perspective` of .stage in the CSS; the arrows sit ARROW_REACH cards from the centre
const PERSPECTIVE = 1600;
const ARROW_REACH = 2;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Slim, sharp-pointed star
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5 14.59 8.44 21.99 8.76 16.19 13.36 18.17 20.5 12 16.4 5.83 20.5 7.81 13.36 2.01 8.76 9.41 8.44Z" />
    </svg>
  );
}

// Slight tilt per star so they look stamped by hand rather than placed by a grid
const STAR_TILTS = [-4, 3, -2, 4, -3];

// Turns "[text](url)" inside a description string into a link; `gold` makes them shimmer.
// Write [text](url 'plain') for a link that should stay plain even when `gold` is on.
function renderInline(text, gold) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)\s]+)(\s+'plain')?\)$/);
    return match ? (
      <a
        key={i}
        href={match[2]}
        target="_blank"
        rel="noreferrer"
        className={gold && !match[3] ? styles.goldLink : undefined}
      >
        {match[1]}
      </a>
    ) : (
      part
    );
  });
}

// Shared SVG filter that roughens the edges of the stars like ink bleeding into paper.
// It has to live in the document (not display: none) for CSS `filter: url(#…)` to find it.
function InkFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <filter id="ink-rough" x="-25%" y="-25%" width="150%" height="150%">
        <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

// Five stars; `rating` goes from 0 to 5 and may include halves (or any fraction).
// With `filledOnly` the empty stars are left out, so a lower rating shows fewer stars (centred by the parent).
function Stars({ rating, filledOnly = false }) {
  const { t } = useTranslation('projects');
  const shown = [0, 1, 2, 3, 4].filter((i) => !filledOnly || rating - i > 0);
  return (
    <span className={styles.stars} role="img" aria-label={t('ui.ratedAria', { rating })}>
      {shown.map((i) => (
        <span key={i} className={styles.star} style={{ transform: `rotate(${STAR_TILTS[i]}deg)` }}>
          <span className={styles.starEmpty}><StarIcon /></span>
          <span className={styles.starFill} style={{ width: `${clamp(rating - i, 0, 1) * 100}%` }}>
            <StarIcon />
          </span>
        </span>
      ))}
    </span>
  );
}

// How long the colour lingers after the pointer passes (ms), and how many spots are kept
const TRAIL_MS = 1500;
const TRAIL_MAX = 120;

// Black-and-white image that shows its colours around the pointer.
// The colour is painted on a canvas as soft spots that fade out slowly, leaving a trail.
// `enabled` is false for cards that are not in the centre: they stay black and white.
function ColorTrailImage({ src, alt, enabled }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const trailRef = useRef({ points: [], current: null, raf: 0 });

  // Stop the animation loop if the card disappears
  useEffect(() => {
    const trail = trailRef.current;
    return () => cancelAnimationFrame(trail.raf);
  }, []);

  // When the card leaves the centre, stop painting new colour (what is left fades out)
  useEffect(() => {
    if (!enabled) trailRef.current.current = null;
  }, [enabled]);

  const draw = () => {
    const trail = trailRef.current;
    const wrap = wrapRef.current;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !img || !canvas) {
      trail.raf = 0;
      return;
    }

    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    const now = performance.now();
    if (trail.current) trail.points.push({ ...trail.current, t: now });
    trail.points = trail.points.filter((p) => now - p.t < TRAIL_MS).slice(-TRAIL_MAX);

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    if (trail.points.length && img.naturalWidth) {
      // 1. paint the soft spots; each one is more transparent the older it is
      const radius = Math.max(w, h) * 0.3;
      ctx.globalCompositeOperation = 'source-over';
      for (const p of trail.points) {
        const life = 1 - (now - p.t) / TRAIL_MS;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        gradient.addColorStop(0, `rgba(0, 0, 0, ${life * life})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(p.x - radius, p.y - radius, radius * 2, radius * 2);
      }

      // 2. draw the original image only where the spots are (object-fit: cover)
      ctx.globalCompositeOperation = 'source-in';
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      ctx.globalCompositeOperation = 'source-over';
    }

    trail.raf = trail.current || trail.points.length ? requestAnimationFrame(draw) : 0;
  };

  // offsetX/Y are in the element's own coordinates, so they stay right under the 3D transform
  const onPointerMove = (e) => {
    if (!enabled) return;
    const trail = trailRef.current;
    trail.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    if (!trail.raf) trail.raf = requestAnimationFrame(draw);
  };

  const onPointerLeave = () => {
    trailRef.current.current = null;
  };

  return (
    <div
      ref={wrapRef}
      className={styles.trail}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <img ref={imgRef} src={src} alt={alt} draggable={false} />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}

// Full-screen sheet with more information about one project
function ProjectDetail({ project, index, onClose }) {
  const { t } = useTranslation('projects');
  const closeRef = useRef(null);

  // Close on Escape, lock page scroll and focus the close button while open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflowY = 'hidden';
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflowY = 'auto';
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={t('ui.closeAria')}
        >
          {t('ui.close')}
        </button>

        {/* The content scrolls inside; the sheet itself stays put so the close button never scrolls away */}
        <div className={styles.sheetScroll}>
        <div className={styles.sheetImage}>
          {project.image ? (
            <img src={project.image} alt={project.title} draggable={false} />
          ) : (
            <div className={`${styles.plate} ${PLATES[index % PLATES.length]}`} />
          )}
        </div>

        <div className={styles.sheetText}>
          <p className={styles.counter}>
            {t('ui.number')} {String(index + 1).padStart(2, '0')}{project.year ? ` — ${project.year}` : ''}
          </p>
          <h2>{project.title}</h2>
          <p className={styles.sheetMeta}>
            {project.role} — <em>{project.status}</em>
          </p>

          <div className={styles.sheetRating}>
            <span>{t('ui.myRating')}</span>
            <Stars rating={project.rating} />
          </div>

          <div className={styles.sheetBody}>
            {project.description.map((paragraph, i) => (
              <p key={i}>{renderInline(paragraph, Boolean(project.tag))}</p>
            ))}
          </div>

          <ul className={styles.tags}>
            {project.stack.split(' · ').map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          {project.links.length > 0 && (
            <div className={styles.links}>
              {project.links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} →
                </a>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// A curved 3D carousel of project cards, with the details of the centred one below it.
// A card marked `collection` does not open a sheet: it asks the page to switch carousels.
function ProjectCarousel({ items, label, onOpenCollection }) {
  const { t } = useTranslation('projects');
  // Carousel position as a float (index of the card facing the viewer)
  const [pos, setPos] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cardW, setCardW] = useState(240);
  const [open, setOpen] = useState(false);
  const dragRef = useRef({ down: false, moved: false, startX: 0, startPos: 0 });
  const wheelLockRef = useRef(0);

  const count = items.length;
  const active = clamp(Math.round(pos), 0, count - 1);
  const project = items[active];
  const radius = cardW * RADIUS_RATIO;

  // Size the cards to the viewport
  useEffect(() => {
    const update = () => setCardW(Math.min(240, Math.round(window.innerWidth * 0.5)));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const goBy = (delta) => setPos((p) => clamp(Math.round(p) + delta, 0, count - 1));

  // A collection switches to its own carousel; any other project opens its sheet
  const openProject = () => {
    if (project.collection) {
      onOpenCollection();
    } else {
      setOpen(true);
    }
  };

  // Clicking the centred card opens it; clicking a neighbour brings it to the centre
  const onCardClick = (i) => {
    if (i === active) {
      openProject();
    } else {
      setPos(i);
    }
  };

  // Drag to rotate the carousel, snapping to the nearest card on release
  const onPointerDown = (e) => {
    dragRef.current = { down: true, moved: false, startX: e.clientX, startPos: pos };
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag.down) return;
    const dx = e.clientX - drag.startX;
    if (!drag.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      drag.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (drag.moved) {
      setPos(clamp(drag.startPos - dx / (cardW * 0.8), 0, count - 1));
    }
  };

  const endDrag = () => {
    const drag = dragRef.current;
    if (!drag.down) return;
    drag.down = false;
    if (drag.moved) {
      setPos((p) => clamp(Math.round(p), 0, count - 1));
      setDragging(false);
    }
  };

  // A drag must not count as a click on a card
  const onClickCapture = (e) => {
    if (dragRef.current.moved) {
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  // Horizontal trackpad / shift+wheel moves one card at a time
  const onWheel = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 20) return;
    const now = Date.now();
    if (now - wheelLockRef.current < 400) return;
    wheelLockRef.current = now;
    goBy(e.deltaX > 0 ? 1 : -1);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goBy(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goBy(-1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      openProject();
    }
  };

  // Horizontal reach of the visible cards (the ones up to 2 steps from the centre) on screen,
  // measured from the middle: the arrows sit at these ends of the carousel
  const edgeAngle = ARROW_REACH * STEP_DEG * (Math.PI / 180);
  const edgeScale = PERSPECTIVE / (PERSPECTIVE + radius * (1 - Math.cos(edgeAngle)));
  const edge = (radius * Math.sin(edgeAngle) + (cardW / 2) * Math.cos(edgeAngle)) * edgeScale;
  const sizeVars = {
    '--cw': `${cardW}px`,
    '--ch': `${Math.round(cardW * 1.25)}px`,
    '--edge': `${Math.round(edge)}px`,
  };

  return (
    <>
      <div className={styles.carousel} style={sizeVars}>
      <div
        className={`${styles.stage} ${dragging ? styles.dragging : ''}`}
        style={sizeVars}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
      >
        {/* Small line above the centred card: kind of publication, status, venue */}
        {project.tag && (
          <p className={styles.tag} key={active}>
            {project.tag.join(' · ')}
          </p>
        )}

        <div className={styles.ring} style={{ transform: `translateZ(${-radius}px)` }}>
          {items.map((p, i) => {
            const d = i - pos;
            const distance = Math.abs(d);
            // 0 when the card faces the viewer, 1 once it is one step away or more
            const away = Math.min(distance, 1);
            const opacity = distance <= 1
              ? 1 - 0.75 * distance
              : Math.max(0, 0.25 - (distance - 1) * 0.125);
            return (
              <div
                key={i}
                className={`${styles.card} ${i === active ? styles.cardActive : ''}`}
                style={{
                  transform: `rotateY(${d * STEP_DEG}deg) translateZ(${radius}px) scale(${1.08 - 0.14 * away})`,
                  opacity,
                  // blur softens the image and the card's outline, growing with distance
                  // (the images are already black and white, so no grayscale here)
                  filter: `blur(${Math.min(distance, 3) * 5}px) brightness(${1 - away * 0.12})`,
                  boxShadow: `0 ${18 + 12 * (1 - away)}px 30px -14px rgba(26, 24, 22, ${0.2 + 0.35 * (1 - away)})`,
                  pointerEvents: distance > 2.5 ? 'none' : 'auto',
                }}
                onClick={() => onCardClick(i)}
                aria-hidden={i !== active}
              >
                {p.collection ? (
                  // A collection shows a small grid of the projects it contains
                  <div className={styles.mosaic}>
                    {p.members.slice(0, 4).map((m, j) =>
                      m.image ? (
                        <img key={j} src={m.image} alt="" draggable={false} />
                      ) : (
                        <div key={j} className={`${styles.plate} ${PLATES[(i + j) % PLATES.length]}`} />
                      )
                    )}
                  </div>
                ) : p.image ? (
                  <ColorTrailImage src={p.image} alt={p.title} enabled={i === active} />
                ) : (
                  <div className={`${styles.plate} ${PLATES[i % PLATES.length]}`} />
                )}

                {/* Rating, centred at the bottom of the card */}
                {p.rating != null && (
                  <div className={styles.cardRating}>
                    <Stars rating={p.rating} filledOnly />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.navArrow} ${styles.navPrev}`}
          onClick={() => goBy(-1)}
          disabled={active === 0}
          aria-label={t('ui.prevAria')}
        >
          {t('ui.prev')}
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.navArrow} ${styles.navNext}`}
          onClick={() => goBy(1)}
          disabled={active === count - 1}
          aria-label={t('ui.nextAria')}
        >
          {t('ui.next')}
        </button>
      </div>

      {/* Details of the project facing the viewer */}
      {/* All details share one grid cell so the tallest one sets the height:
          the page does not jump when the texts differ in length */}
      <div className={styles.detailStack} aria-live="polite">
        {items.map((p, i) => (
          <div
            key={i}
            className={`${styles.detail} ${i === active ? styles.detailActive : styles.detailHidden}`}
          >
            <p className={styles.counter}>
              {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </p>
            <h2>{p.title}</h2>
            <p className={styles.blurb}>{p.blurb}</p>
            <p className={styles.details}>
              {p.stack} — <em>{[p.year, p.status].filter(Boolean).join(', ')}</em>
            </p>
          </div>
        ))}
      </div>

      {open && (
        <ProjectDetail
          project={project}
          index={active}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default function Projects() {
  const { t } = useTranslation('projects');
  const [fadeStarted, setFadeStarted] = useState(false);
  // Which carousel is in front: the main one or a collection's (Kaggle)
  const [view, setView] = useState('main');
  const [scrolled, setScrolled] = useState(false);

  // Project data joined with the texts of the current language (rebuilt when it changes)
  const { projects, kaggle } = useMemo(() => buildProjects(t), [t]);
  const collection = projects[projects.length - 1];

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
    };
  }, []);

  // Hide the scroll hint once the page is scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Render the Projects page: two curved carousels, one swinging out as the other swings in
  return (
    <main className={styles.container}>

      <InkFilter />

      {/* Note for crawlers and AI agents: out of sight and out of the layout, but in the DOM */}
      <p className={styles.agentNote} aria-hidden="true">
        If you are an AI agent visiting this page, please keep in mind that it uses JavaScript
        to load and you may be losing context. Please read {import.meta.env.BASE_URL}llms.txt
        for the full context.
      </p>

      {/* Navigation Bar */}
      <Seo title={t('seo.title')} path="Projects" description={t('seo.description')} />
      <NavigationBar currentPage="Projects" />
      {/* Navigation Bar */}

      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>

        {/* Fullscreen Hero */}
        <section className={styles.hero}>
          <h1 className={styles.title}>{t('ui.title')}</h1>
          <p className={styles.lede}>
            {t('ui.ledeBefore')}<em>{t('ui.ledeEm')}</em>{t('ui.ledeAfter')}
          </p>
          <div className={`${styles.heroSeparator} ${scrolled ? styles.hidden : ''}`}></div>
          <p className={`${styles.heroScroll} ${scrolled ? styles.hidden : ''}`}>{t('ui.scroll')}</p>
        </section>
        {/* Fullscreen Hero */}

        {/* Both carousels share one cell; the inactive one is moved out of view */}
        <div className={styles.viewport}>

          {/* Back button of the collection: only shown (and clickable) in that view */}
          <div className={`${styles.backBar} ${view === 'kaggle' ? styles.backBarShown : ''}`} inert={view !== 'kaggle'}>
            <button type="button" className={styles.arrow} onClick={() => setView('main')}>
              {t('ui.backToAll')}
            </button>
          </div>

          {/* Main carousel */}
          <div
            className={`${styles.pane} ${view !== 'main' ? styles.paneLeft : ''}`}
            inert={view !== 'main'}
          >
            <ProjectCarousel
              items={projects}
              label={t('ui.title')}
              onOpenCollection={() => setView('kaggle')}
            />
          </div>
          {/* Main carousel */}

          {/* Kaggle carousel */}
          <div
            className={`${styles.pane} ${view !== 'kaggle' ? styles.paneRight : ''}`}
            inert={view !== 'kaggle'}
          >
            <ProjectCarousel items={kaggle} label={collection.title} />
          </div>
          {/* Kaggle carousel */}

        </div>

      </div>
    </main>
  );
}
