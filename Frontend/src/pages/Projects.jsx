// Projects.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import { useState, useEffect } from 'react';
import styles from './Projects.module.css';

export default function Projects() {
  const [fadeStarted, setFadeStarted] = useState(false);

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


  // Render the About Me page with navigation bar
  // and the rest of the content
  return (
    <main className={styles.container}>

      {/* Navigation Bar */}
      <NavigationBar currentPage="Projects" />
      {/* Navigation Bar */}

      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        
        {/* Fullscreen Hero */}
        <section className={styles.hero}>
          <h1>PROJECTS</h1>
          <p>𝕲𝖊𝖙 𝖙𝖔 𝖘𝖊𝖊 𝖙𝖍𝖊 𝖕𝖗𝖔𝖏𝖊𝖈𝖙𝖘 𝕴'𝖛𝖊 𝖈𝖔𝖓𝖙𝖗𝖎𝖇𝖚𝖙𝖊𝖉 𝖙𝖔.</p>
        </section>
        {/* Fullscreen Hero */}

        {/* Page Content */}
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>
        <p>Projects</p>

      </div>
    </main>
  );
}
