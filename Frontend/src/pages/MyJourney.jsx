import NavigationBar from '../components/NavigationBar.jsx';
import Seo from '../components/Seo.jsx';
import { useEffect, useState } from 'react';
import styles from './MyJourney.module.css';

const timelineEntries = [
  {
    date: 'Nov 2025',
    title: 'Journal Publication',
    organization: 'SAUC',
    description: '“Object Recognition and Conversational AI in Real-World Contexts” is derived from my Computer Science Bachelor’s thesis. The work designs and validates an interactive museum guide that combines real-time object detection with Retrieval-Augmented Generation (RAG), enabling context-aware and personalised conversations around cultural heritage.',
    citation: 'Street Art & Urban Creativity, vol. 11, pp. 21–47 · Published 28 November 2025',
    doi: '10.62161/sauc.v11.6010',
    url: 'https://doi.org/10.62161/sauc.v11.6010',
  },
  {
    date: '6 Nov 2025',
    title: 'Article Presentation',
    organization: 'FIRA BARCELONA',
    description: 'Took the stage at Smart City Expo World Congress 2025, the world’s leading event on urban innovation, to present my work on object recognition and conversational AI for interactive museum experiences.',
    citation: 'Fira Barcelona Gran Via · Smart City Expo World Congress 2025',
    linkLabel: 'Smart City Expo World Congress 2025',
    linkUrl: 'https://www.smartcityexpo.com/',
  },
  {
    date: 'Jun 2025 - ...',
    title: 'AI Engineer',
    organization: 'Cephalgo',
    description: 'Leading the development and training of deep-learning speech models, in collaboration with clinical partners, to identify early vocal signs associated primarily with Alzheimer’s and Parkinson’s disease, as well as conditions such as ALS and Huntington’s disease. Previous work includes developing a RAG system and leading an international team on multi-agent AI model analysis and compliance.',
    citation: 'Deep learning · Speech analysis · RAG · Multi-agent systems · Model evaluation · Fine-tuning',
    linkLabel: 'cephalgo.com',
    linkUrl: 'https://cephalgo.com/',
  },
  {
    date: 'Jun 2025',
    title: 'Diploma in Cybersecurity & Ethical Hacking',
    organization: 'UFV',
    description: 'Completed a hands-on cybersecurity specialisation alongside my Computer Science degree, spanning ethical hacking and penetration testing, digital forensics, secure development with OWASP, systems administration, and security across web, mobile and IoT environments.',
    citation: 'Pentesting · Digital forensics · OWASP · Web, mobile & IoT security · Blockchain',
    linkLabel: 'Official UFV programme',
    linkUrl: 'https://www.ufv.es/estudiar-grado-informatica-madrid/',
  },
  {
    date: 'Jun 2025',
    title: 'Bachelor’s in Computer Science & Engineering',
    organization: 'UFV',
    description: 'Completed a four-year Computer Science and Engineering degree, building a solid foundation across algorithms, mathematics, databases, computer networks, operating systems, software engineering and artificial intelligence.',
    citation: 'Algorithms · Mathematics · Databases · Networks · Software engineering · Artificial intelligence',
    linkLabel: 'Official UFV degree',
    linkUrl: 'https://www.ufv.es/estudiar-grado-informatica-madrid/',
  },
  {
    date: 'Sept 2024 - Jun 2025',
    title: 'Data & Analytics Internship',
    organization: 'NTTDATA',
    description: 'Worked at the intersection of data and generative AI, turning vast collections of complex technical documents for major energy companies into accessible, reliable knowledge. Combined OCR and structured extraction with carefully engineered RAG pipelines and early-generation LLMs to produce grounded answers. Beyond project delivery, researched emerging prompt-engineering practices and distilled them into internal knowledge sessions, enabling teams to adopt more effective ways of working with LLMs.',
    citation: 'RAG · Document AI · OCR · Structured extraction · Vector databases · Advanced retrieval · Prompt engineering',
    linkLabel: 'NTT DATA',
    linkUrl: 'https://www.nttdata.com/',
  },
  {
    date: 'Jul 2024',
    title: 'Academic Excellence Recognition',
    organization: 'UFV',
    description: 'Recognised by the Computer Science and Engineering degree leadership for ranking among the top five students in my cohort during the 2023/2024 academic year, reflecting sustained academic performance, dedication and commitment to excellence.',
    citation: 'Top 5 in cohort · Academic year 2023/2024',
    linkLabel: 'Computer Science & Engineering at UFV',
    linkUrl: 'https://www.ufv.es/estudiar-grado-informatica-madrid/',
  },
  {
    date: 'Jun 2024',
    title: 'International Conference Presentation',
    organization: 'CISTI',
    description: 'Co-authored and presented ALPACA at CISTI 2024, the 19th Iberian Conference on Information Systems and Technologies. The project explored how a mobile application could reduce household food waste by turning barcode-scanned pantry data into expiration tracking and personalised recipe suggestions.',
    citation: 'University of Salamanca · 25–28 June 2024 · International research conference',
    linkLabel: 'ALPACA conference abstract',
    linkUrl: 'https://itmasoc.org/cisti2024/modules/request.php?module=oc_program&action=summary.php&id=326',
    secondaryLinkLabel: 'CISTI 2024 programme',
    secondaryLinkUrl: 'https://itmasoc.org/cisti2024/modules/request.php?module=oc_program&action=program.php',
  },
  {
    date: 'Mar 2024',
    title: 'HackForGood Hackathon',
    organization: 'Telefónica',
    description: 'Selected as one of the prize-winning projects at the Madrid edition of HackForGood 2024, Spain’s largest hackathon, hosted at Telefónica’s 42 Madrid campus. Our team conceived a technology-driven application to support people before and during meteorological disasters, transforming a social challenge into a practical digital solution.',
    citation: 'Award-winning project · 42 Madrid · Nearly 1,000 participants across 16 cities · 48 hours',
    linkLabel: 'Fundación Telefónica coverage',
    linkUrl: 'https://www.fundaciontelefonica.com/noticias/campus-42-sedes-mayor-hackathon-espana/',
  },
  {
    date: 'Mar 2024',
    title: 'Competitive Programming “AdaByron”',
    organization: 'uc3m',
    description: 'Selected as one of the students representing UFV at the 10th Madrid edition of the Ada Byron University Programming Contest, competing as a member of ByteHunters in a team-based algorithmic challenge hosted by Universidad Carlos III de Madrid.',
    citation: 'UFV representative · Team ByteHunters · 10th Madrid edition',
    linkLabel: 'Official participating teams',
    linkUrl: 'https://ada-byron.es/2024/reg/madrid/equipos.php',
  },
  {
    date: 'Sept 2022 - Jun 2023',
    title: 'Volunteer Mentor · UniDiversidad',
    organization: 'Fundación ONCE',
    description: 'Mentored young adults with intellectual disabilities as they developed the digital skills needed for future roles in web accessibility review. Helped participants build confidence with practical software tools and understand how digital interfaces are evaluated against legal requirements and recognised accessibility guidelines.',
    citation: 'Digital inclusion · Web accessibility · Mentoring · Employability',
    linkLabel: 'Fundación ONCE · University & Disability',
    linkUrl: 'https://www.fundaciononce.es/es/que-hacemos/universidad-y-discapacidad',
  },
  { date: 'Mar 2021', title: 'English C2 Proficiency', organization: 'Cambridge', description: 'Achieved C2-level English proficiency, demonstrating advanced communication skills in academic and professional contexts.' },
  { date: 'Mar 2019', title: 'French B1 DELF', organization: 'République Française', description: 'Earned the DELF B1 qualification, certifying independent French language communication skills.' },
];

export default function MyJourney() {
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

  const toggleEntry = (title) => {
    setOpenEntry((currentEntry) => currentEntry === title ? null : title);
  };

  return (
    <main className={styles.container}>
      <Seo title="My Journey" path="MyJourney" description="Education and professional experience of Adrián Ortiz Ramírez in AI engineering, data science and machine learning." />
      <NavigationBar currentPage="MyJourney" />

      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        <section className={styles.hero}>
          <h1>MY JOURNEY</h1>
          <p>𝕰𝖝𝖕𝖑𝖔𝖗𝖊 𝖒𝖞 𝖕𝖆𝖙𝖍 𝖆𝖓𝖉 𝖊𝖝𝖕𝖊𝖗𝖎𝖊𝖓𝖈𝖊𝖘</p>
        </section>

        <section className={styles.timelineSection} aria-label="Career and academic timeline">
          {timelineEntries.map((entry) => {
            const isOpen = openEntry === entry.title;
            const detailsId = `timeline-details-${entry.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;

            return (
              <div className={`${styles.timelineContainer} ${isOpen ? styles.timelineContainerOpen : ''}`} key={entry.title}>
                <button
                  className={styles.timelineEntry}
                  type="button"
                  onClick={() => toggleEntry(entry.title)}
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
                        DOI: {entry.doi} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {entry.linkLabel && (
                      <a className={styles.timelineDoi} href={entry.linkUrl} target="_blank" rel="noreferrer">
                        {entry.linkLabel} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {entry.secondaryLinkLabel && (
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
          <p>Want to contact me?</p>
          <div className={styles.contactIconsWrapper}>
            <a href="https://www.linkedin.com/in/adri-ortiz" target="_blank" rel="noreferrer" className={styles.contactLink}>
              <img src={`${import.meta.env.BASE_URL}images/icons/linkedin.png`} alt="LinkedIn Icon" className={styles.contactIcon} />
            </a>
            <a href="mailto:adrian.ortiz.prof@gmail.com" className={styles.contactLink}>
              <img src={`${import.meta.env.BASE_URL}images/icons/outlook.png`} alt="Email Icon" className={styles.contactIcon} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
