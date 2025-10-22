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

      {/* Navigation Bar */}
      <NavigationBar currentPage="ContactMe" />
      {/* Navigation Bar */}

      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        
        {/* Fullscreen Hero */}
        <section className={styles.hero}>
          <h1>CONTACT ME</h1>
          <p>𝕲𝖊𝖙 𝖎𝖓 𝖙𝖔𝖚𝖈𝖍 𝖜𝖎𝖙𝖍 𝖒𝖊 𝖋𝖔𝖗 𝖈𝖔𝖑𝖑𝖆𝖇𝖔𝖗𝖆𝖙𝖎𝖔𝖓 𝖔𝖗 𝖏𝖚𝖘𝖙 𝖆 𝖋𝖗𝖎𝖊𝖓𝖉𝖑𝔂 𝖈𝖍𝖆𝖙!</p>
          <div className={styles.heroSeparator}></div>
          <p>Scroll</p>
        </section>
        {/* Fullscreen Hero */}

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
