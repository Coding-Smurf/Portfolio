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


  // Render the About Me page with navigation bar
  // and the rest of the content
  return (
    <main className={styles.container}>
      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        {/* Navigation Bar */}
        <NavigationBar currentPage="MyJourney" />

        {/* Page Content */}
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>
        <p>My Journey</p>

      </div>
    </main>
  );
}
