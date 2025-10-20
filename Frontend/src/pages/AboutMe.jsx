// AboutMe.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import { useState, useEffect } from 'react';
import styles from './AboutMe.module.css';

export default function AboutMe() {
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
      <NavigationBar currentPage="AboutMe" />
      {/* Navigation Bar */}

      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        
        {/* Fullscreen Hero */}
        <section className={styles.hero}>
          <h1>ABOUT ME</h1>
          <p>Get to know more about my background, skills, and passions.</p>
        </section>
        {/* Fullscreen Hero */}

        {/* Page Content */}
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>
        <p>About Me</p>

      </div>
    </main>
  );
}
