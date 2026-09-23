// AboutMe.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import { useState, useEffect } from 'react';
import styles from './AboutMe.module.css';

export default function AboutMe() {
  const [fadeStarted, setFadeStarted] = useState(false);
  const [scrolled, setScrolled] = useState(false);


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
    };}, []);

  // Event that detects scrolling 
  // to hide scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 10) {
        setScrolled(true);
    }};
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };}, [scrolled]);

  // Render the About Me page with navigation bar
  // and the rest of the content
  return (
    <main className={styles.container}>

      {/* Navigation Bar */}
      <NavigationBar currentPage="AboutMe" />
      {/* Navigation Bar */}

      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        
        {/* Fullscreen Hero */}
        <section className={styles.hero}>
          <h1>ABOUT ME</h1>
          <p>𝕲𝖊𝖙 𝖙𝖔 𝖐𝖓𝖔𝖜 𝖒𝖔𝖗𝖊 𝖆𝖇𝖔𝖚𝖙 𝖒𝖞 𝖇𝖆𝖈𝖐𝖌𝖗𝖔𝖚𝖓𝖉, 𝖘𝖐𝖎𝖑𝖑𝖘, 𝖆𝖓𝖉 𝖕𝖆𝖘𝖘𝖎𝖔𝖓𝖘</p>
          <div className={`${styles.heroSeparator} ${scrolled ? styles.hidden : ''}`}></div>
          <p className={scrolled ? styles.hidden : ''}>Scroll</p>
        </section>
        {/* Fullscreen Hero */}

        {/* Page Content */}
        <section className={styles.contentSection}>

          {/* Intro Section */}
          <section className={styles.introSection}>
            <div className={styles.imageWrapper}>
              <img src={`${import.meta.env.BASE_URL}images/other/AdrianOrtizRamirez.png`} alt="Adrián Ortiz Ramírez" className={styles.profileImage}/>
            </div>
            <div className={styles.textColumn}>
              <p>Computer Scientist</p>
              <h2>Adrián Ortiz Ramírez</h2>
              <p>Hi there! I’m Adrián and I’m currently working as an AI engineer. Lately, I’ve been focused on bringing Speech Emotion Recognition, AI Compliance Evaluation and Psychology AI into the real world.</p>
              <p>I love making things look simple.</p>
            </div>
          </section>
          {/* Intro Section */}

          {/* Personal Info Section */}
          <section className={styles.personalInfoSection}>
            <h3>About Me</h3>
            <div>
              <span className="material-symbols-rounded">person</span>
              <p>22 Years old.</p>
            </div>
            <div>
              <span className="material-symbols-rounded">school</span>
              <p>BSc in Computer Science. Specialty in Cybersecurity.</p>
            </div>
            <div>
              <span className="material-symbols-rounded">language_chinese_dayi</span>
              <p>Spanish (Native). English (C2).</p>
            </div>
            <div>
              <span className="material-symbols-rounded">location_on</span>
              <p>Madrid, Spain.</p>
            </div>
          </section>
          {/* Personal Info Section */}

          {/* Hashtags Section */}
          <section className={styles.hashtagsSection}>
            <h3>Hashtags i love</h3>
            <div className={styles.hashtagsContainer}>
              <div>
                <p>#Data Science</p>
              </div>
              <div>
                <p>#Machine Learning</p>
              </div>
              <div>
                <p>#Deep Learning</p>
              </div>
              <div>
                <p>#Solving Real Problems</p>
              </div>
              <div>
                <p>#Always Learning</p>
              </div>
            </div>
          </section>
          {/* Hashtags Section */}

        </section>
        {/* Page Content */}
      </div>
    </main>
  );
}
