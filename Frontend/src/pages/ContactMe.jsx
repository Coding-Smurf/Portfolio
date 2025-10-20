// ContactMe.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import { useState, useEffect } from 'react';
import styles from './ContactMe.module.css';

export default function ContactMe() {
  const [fadeStarted, setFadeStarted] = useState(false);

  // Event that triggers fade animation
  // when the component mounts
  useEffect(() => {
    requestAnimationFrame(() => {
      setFadeStarted(true);
    });
  }, []);


  // Render the ContactMe page with navigation bar
  // and the rest of the content
  return (
    <main className={styles.container}>
      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        {/* Navigation Bar */}
        <NavigationBar currentPage="ContactMe" />

        {/* Page Content */}
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>
        <p>Contact Me</p>

      </div>
    </main>
  );
}
