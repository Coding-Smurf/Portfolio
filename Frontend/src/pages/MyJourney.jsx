// MyJourney.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import { useState, useEffect } from 'react';
import styles from './MyJourney.module.css';

export default function MyJourney() {
  const [fadeStarted, setFadeStarted] = useState(false);

  // Event that triggers fade animation
  // when the component mounts
  useEffect(() => {
    requestAnimationFrame(() => {
      setFadeStarted(true);
    });
  }, []);

  const handleEntryClick = (title) => {
    console.log(`Clicked on: ${title}`);
  };


  // Render the About Me page with navigation bar
  // and the rest of the content
  return (
    <main className={styles.container}>

      {/* Navigation Bar */}
      <NavigationBar currentPage="MyJourney" />
      {/* Navigation Bar */}

      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        
        {/* Fullscreen Hero */}
        <section className={styles.hero}>
          <h1>MY JOURNEY</h1>
          <p>𝕰𝖝𝖕𝖑𝖔𝖗𝖊 𝖒𝖞 𝖕𝖆𝖙𝖍 𝖆𝖓𝖉 𝖊𝖝𝖕𝖊𝖗𝖎𝖊𝖓𝖈𝖊𝖘</p>
          <div className={styles.heroSeparator}></div>
          <p>Scroll</p>
        </section>
        {/* Fullscreen Hero */}
 
        {/* Timeline */}
        <section className={styles.timelineSection}>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('Journal Publication')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Nov 2025</div>
                        <div className={styles.timelineEntryTitle}>Journal Publication</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>SAUC</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('Article Presentation')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Nov 2025</div>
                        <div className={styles.timelineEntryTitle}>Article Presentation</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>FIRA BARCELONA</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('AI Engineer')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Jun 2025 - ...</div>
                        <div className={styles.timelineEntryTitle}>AI Engineer</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>Cephalgo</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('University Diploma in Cybersecurity')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Jun 2025</div>
                        <div className={styles.timelineEntryTitle}>University Diploma in Cybersecurity</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>UFV</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('Bachelor’s in Computer Science')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Jun 2025</div>
                        <div className={styles.timelineEntryTitle}>Bachelor’s in Computer Science</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>UFV</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('Data & Analytics Internship')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Sept 2024 - Jun 2025</div>
                        <div className={styles.timelineEntryTitle}>Data & Analytics Internship</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>NTTDATA</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('Academic excellence Recognition')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Jul 2024</div>
                        <div className={styles.timelineEntryTitle}>Academic excellence Recognition</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>UFV</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('International Conference Presentation')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Jun 2024</div>
                        <div className={styles.timelineEntryTitle}>International Conference Presentation</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>CISTI</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('Hackathon HackForGood')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Mar 2024</div>
                        <div className={styles.timelineEntryTitle}>Hackathon HackForGood</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>Telefónica</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('Competitive Programming “AdaByron”')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Mar 2024</div>
                        <div className={styles.timelineEntryTitle}>Competitive Programming “AdaByron”</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>uc3m</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('Volunteer Program “Unidiversidad”')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Sept 2022 - Jun 2023</div>
                        <div className={styles.timelineEntryTitle}>Volunteer Program “Unidiversidad”</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>ONCE</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('English C2 Proficiency')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Mar 2021</div>
                        <div className={styles.timelineEntryTitle}>English C2 Proficiency</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>Cambridge</div>
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineEntry} onClick={() => handleEntryClick('French B1 DELF')}>
                    <div className={styles.timelineContentWrapper}>
                        <div className={styles.timelineEntryDate}>Mar 2019</div>
                        <div className={styles.timelineEntryTitle}>French B1 DELF</div>
                    </div>
                    <div className={styles.timelineEntryOrganization}>République Française</div>
                </div>
            </div>
        </section>
        {/* Timeline */}

        {/* Footer */}
        <section className={styles.footer}>
            <p>Want to contact me?</p>
            <div className={styles.contactIconsWrapper}>
                <a href="https://www.linkedin.com/in/adri-ortiz" target="_blank" className={styles.contactLink}>
                    <img src="/images/icons/linkedin.png" alt="LinkedIn Icon" className={styles.contactIcon} />
                </a>
                <a href="mailto:adrian.ortiz.prof@gmail.com" className={styles.contactLink}>
                    <img src="/images/icons/outlook.png" alt="Email Icon" className={styles.contactIcon} />
                </a>
            </div>
        </section>
        {/* Footer */}

      </div>
    </main>
  );
}
