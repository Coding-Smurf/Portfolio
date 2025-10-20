// Projects.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import { useState, useEffect } from 'react';
import styles from './Projects.module.css';

export default function Projects() {
  const [fadeStarted, setFadeStarted] = useState(false);

  // Event that triggers fade animation
  // when the component mounts
  useEffect(() => {
    requestAnimationFrame(() => {
      setFadeStarted(true);
    });
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
          <p>Explore my work and the projects I've contributed to.</p>
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
