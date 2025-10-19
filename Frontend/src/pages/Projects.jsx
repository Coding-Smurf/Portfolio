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
      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        {/* Navigation Bar */}
        <NavigationBar currentPage="Projects" />

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
