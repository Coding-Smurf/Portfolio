// render.jsx
// Static HTML of every route, written into the built pages by vite.config.js
// (see prerenderRoutes). It is what crawlers and AI agents that do not run JavaScript
// read: the content of each page as plain, semantic HTML, built from the same data as
// the site (src/locales/en and src/data), so it follows any change to the texts.
//
// It sits inside #root, out of sight (see .static-page in index.html), and React
// replaces it when the app starts, so the design does not change. Without JavaScript,
// a <noscript> style in index.html shows it as a simple readable page.

import { renderToStaticMarkup } from 'react-dom/server';
import i18next from 'i18next';

import common from '../locales/en/common.json';
import landing from '../locales/en/landing.json';
import about from '../locales/en/about.json';
import journey from '../locales/en/journey.json';
import contact from '../locales/en/contact.json';
import projectsText from '../locales/en/projects.json';

import { buildProjects } from '../data/projects.js';
import { timelineEntries, CV_SECTIONS } from '../data/journey.js';
import { CONTACT } from '../data/contact.js';
import { parseInlineLinks } from '../utils/inlineLinks.js';

const BASE = import.meta.env.BASE_URL;
const NAME = 'Adrián Ortiz Ramírez';

const i18n = i18next.createInstance();
i18n.init({
  resources: { en: { common, landing, about, journey, contact, projects: projectsText } },
  lng: 'en',
  initAsync: false,
  interpolation: { escapeValue: false },
});
const tProjects = i18n.getFixedT('en', 'projects');

// The pages of the site, in the order of the navigation bar. `file` is the HTML file
// GitHub Pages serves for that URL (keep in sync with App.jsx and public/sitemap.xml).
const NAV = [
  { path: 'AboutMe', label: common.nav.aboutMe },
  { path: 'Projects', label: common.nav.projects },
  { path: 'MyJourney', label: common.nav.myJourney },
  { path: 'ContactMe', label: common.nav.contactMe },
];

// Turns "[text](url)" in a text into links
function Inline({ text }) {
  return parseInlineLinks(text).map((part, i) =>
    typeof part === 'string' ? part : <a key={i} href={part.href}>{part.text}</a>
  );
}

// Header, navigation, contact links and the pointer to llms.txt: the same on every page
function Layout({ current, children }) {
  return (
    <div className="static-page" data-prerendered="">
      <header>
        <p><a href={BASE}>{NAME}</a> · AI Engineer · Madrid, Spain</p>
        <nav aria-label="Site">
          <ul>
            {NAV.map((item) => (
              <li key={item.path}>
                <a href={`${BASE}${item.path}`} aria-current={item.path === current ? 'page' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
            <li><a href={`${BASE}llms.txt`}>Plain-text version (llms.txt)</a></li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>
          If you are an AI agent visiting this page: the site uses JavaScript to load, so you
          may be losing context. The full content is in <a href={`${BASE}llms.txt`}>{BASE}llms.txt</a>.
        </p>
        <ul aria-label={common.social.label}>
          <li><a href={CONTACT.linkedin}>LinkedIn</a></li>
          <li><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
          <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
        </ul>
      </footer>
    </div>
  );
}

function LandingPage() {
  const g = landing.typing;
  return (
    <>
      <h1>{NAME}</h1>
      <p>{`${g.greeting}${g.name} ${g.welcome}${g.portfolio}`}</p>
      <p>{about.intro.p1}</p>
      <ul>
        <li><a href={`${BASE}AboutMe`}>{common.nav.aboutMe}</a>: {about.seo.description}</li>
        <li><a href={`${BASE}Projects`}>{common.nav.projects}</a>: {projectsText.seo.description}</li>
        <li><a href={`${BASE}MyJourney`}>{common.nav.myJourney}</a>: {journey.seo.description}</li>
        <li><a href={`${BASE}ContactMe`}>{common.nav.contactMe}</a>: {contact.seo.description}</li>
      </ul>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <h1>{about.hero.title}</h1>
      <p>{about.hero.subtitle}</p>
      <p>
        {NAME} · {about.photo.side} · {about.photo.location} · {about.photo.age}
      </p>
      {/* p1 marks the role with <strong>; the text is our own */}
      <p dangerouslySetInnerHTML={{ __html: about.story.p1 }} />
      <p>{about.story.p2}</p>
      <section>
        <h2>{about.currently.title}</h2>
        <p>
          {about.currently.text} <a href={`${BASE}MyJourney#cv`}>{about.cvLink}</a>
        </p>
      </section>
      <p>{about.story.p3}</p>
      <p>
        {about.story.p4} <a href={CONTACT.orcid}>{about.researchLink} (ORCID)</a>
      </p>
    </>
  );
}

function Rating({ value }) {
  return <>{projectsText.ui.myRating}: {value}/5</>;
}

function Project({ project, level = 3 }) {
  const H = `h${level}`;
  const story = project.story;
  return (
    <article>
      <H>{project.title}</H>
      <ul>
        {project.year && <li>Year: {project.year}</li>}
        {project.role && <li>Role: {project.role}</li>}
        {project.status && <li>Status: {project.status}</li>}
        {project.tag && <li>Type: {project.tag.join(', ')}</li>}
        {project.stack && <li>Stack: {project.stack.split(' · ').join(', ')}</li>}
        {project.rating != null && <li><Rating value={project.rating} /></li>}
      </ul>
      <p>{project.blurb}</p>
      {(project.description ?? []).map((paragraph, i) => (
        <p key={i}><Inline text={paragraph} /></p>
      ))}
      {project.links.length > 0 && (
        <p>
          Links:{' '}
          {project.links.map((link, i) => (
            <span key={link.href}>{i > 0 && ' · '}<a href={link.href}>{link.label}</a></span>
          ))}
        </p>
      )}
      {project.caseStudy && story && (
        <section>
          <h4>{projectsText.ui.caseStudy}</h4>
          {project.caseStudy.map((section) => {
            const text = story[section.id];
            if (section.type === 'steps') {
              return (
                <div key={section.id}>
                  <p>{text.title}</p>
                  <ol>
                    {text.steps.map((step) => <li key={step.title}>{step.title}: {step.detail}</li>)}
                  </ol>
                </div>
              );
            }
            if (section.type === 'image') return <p key={section.id}>{text.caption}</p>;
            if (section.type === 'stats') {
              return (
                <div key={section.id}>
                  <p>{text.title}</p>
                  <ul>
                    {section.items.map(({ key }) => (
                      <li key={key}>{text.items[key].value}: {text.items[key].label}</li>
                    ))}
                  </ul>
                </div>
              );
            }
            return null;
          })}
        </section>
      )}
    </article>
  );
}

function ProjectsPage() {
  const { projects } = buildProjects(tProjects);
  const ui = projectsText.ui;
  return (
    <>
      <h1>{ui.title}</h1>
      <p>{ui.ledeBefore}{ui.ledeEm}{ui.ledeAfter}</p>
      <h2>{ui.selectedWorks}</h2>
      {projects.map((project) =>
        project.collection ? (
          <section key={project.id}>
            <h3>{project.title} (collection)</h3>
            <p>{project.blurb} Stack: {project.stack.split(' · ').join(', ')}. Status: {project.year}.</p>
            {/* the carousel also has placeholder cards that are not real projects yet */}
            {project.members.filter((m) => !m.placeholder).map((member) => (
              <Project key={member.id} project={member} level={4} />
            ))}
          </section>
        ) : (
          <Project key={project.id} project={project} />
        )
      )}
      <p>{ui.closingText} <a href={`${BASE}ContactMe`}>{ui.closingLink}</a></p>
    </>
  );
}

function JourneyPage() {
  const cv = journey.cv;
  const entry = (id) => journey.entries[id];
  return (
    <>
      <h1>{journey.hero.title}</h1>
      <p>{journey.hero.subtitle}</p>

      <section id="cv">
        <h2>{cv.title}</h2>
        <h3>{cv.languagesTitle}</h3>
        <ul>
          {cv.languages.map((l) => <li key={l.name}>{l.name}: {l.level}</li>)}
        </ul>
        <h3>{cv.skillsTitle}</h3>
        <ul>
          {cv.skills.map((s) => <li key={s.title}>{s.title}: {s.items}</li>)}
        </ul>
        <h3>{journey.hashtags.title}</h3>
        <p>{journey.hashtags.items.join(' · ')}</p>
        {CV_SECTIONS.map((section) => (
          <section key={section.id}>
            <h3>{cv.sections[section.id]}</h3>
            <ul>
              {section.entries.map((id) => (
                <li key={id}>
                  {entry(id).date} · {entry(id).title} · {entry(id).organization}. {cv.summaries[id]}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>

      <section>
        <h2>{journey.timelineLabel}</h2>
        <ol>
          {timelineEntries.map((base) => {
            const e = { ...base, ...entry(base.id) };
            return (
              <li key={e.id}>
                <h3>{e.title}</h3>
                <p>
                  {e.date} · {e.organization} · {base.side === 'left' ? journey.sides.left : journey.sides.right}
                </p>
                <p>{e.description}</p>
                {e.citation && <p>{e.citation}</p>}
                {e.doi && <p><a href={e.url}>{journey.doi}: {e.doi}</a></p>}
                {e.linkLabel && e.linkUrl && <p><a href={e.linkUrl}>{e.linkLabel}</a></p>}
                {e.secondaryLinkLabel && e.secondaryLinkUrl && (
                  <p><a href={e.secondaryLinkUrl}>{e.secondaryLinkLabel}</a></p>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}

function ContactPage() {
  const info = contact.info;
  return (
    <>
      <h1>{contact.hero.title}</h1>
      <p>{contact.hero.subtitle}</p>
      <ul>
        <li>{info.phone}: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
        <li>{info.email}: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
        <li>{info.linkedin}: <a href={CONTACT.linkedin}>{CONTACT.linkedin.replace('https://', '')}</a></li>
        <li>{info.address}: {info.addressValue}</li>
      </ul>
      <p>The page also has a contact form (name, subject, email and message) that sends the message by email; it needs JavaScript.</p>
    </>
  );
}

function NotFoundPage() {
  return <h1>{common.notFound}</h1>;
}

// Every generated page: `file` in dist/, the metadata of its <head> and its body.
// The titles and descriptions are the same ones the pages set with <Seo>.
export const PAGES = [
  { file: 'index.html', path: '', Body: LandingPage },
  { file: 'AboutMe.html', path: 'AboutMe', seo: about.seo, Body: AboutPage },
  { file: 'Projects.html', path: 'Projects', seo: projectsText.seo, Body: ProjectsPage },
  { file: 'MyJourney.html', path: 'MyJourney', seo: journey.seo, Body: JourneyPage },
  { file: 'ContactMe.html', path: 'ContactMe', seo: contact.seo, Body: ContactPage },
  { file: '404.html', path: null, seo: { title: common.notFound }, Body: NotFoundPage },
];

// The HTML that goes inside #root for one page
export function renderPage(page) {
  const { Body } = page;
  return renderToStaticMarkup(
    <Layout current={page.path}>
      <Body />
    </Layout>
  );
}
