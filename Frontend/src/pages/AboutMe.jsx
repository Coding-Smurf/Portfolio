// AboutMe.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import { useState, useEffect } from 'react';
import styles from './AboutMe.module.css';

export default function AboutMe() {
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
      <NavigationBar currentPage="AboutMe" />
      {/* Navigation Bar */}

      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        
        {/* Fullscreen Hero */}
        <section className={styles.hero}>
          <h1>ABOUT ME</h1>
          <p>𝕲𝖊𝖙 𝖙𝖔 𝖐𝖓𝖔𝖜 𝖒𝖔𝖗𝖊 𝖆𝖇𝖔𝖚𝖙 𝖒𝖞 𝖇𝖆𝖈𝖐𝖌𝖗𝖔𝖚𝖓𝖉, 𝖘𝖐𝖎𝖑𝖑𝖘, 𝖆𝖓𝖉 𝖕𝖆𝖘𝖘𝖎𝖔𝖓𝖘</p>
          <div className={styles.heroSeparator}></div>
          <p>Scroll</p>
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
