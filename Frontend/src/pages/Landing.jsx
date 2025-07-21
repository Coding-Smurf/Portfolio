import React, { useState, useEffect } from 'react';
import styles from './Landing.module.css';
import Typing from '../components/Typing.jsx';

export default function Landing() {
  const [typingFinished, setTypingFinished] = useState(false);
  const [fadeStarted, setFadeStarted] = useState(false);

  useEffect(() => {
    if (typingFinished) {
      // Trigger fade after next animation frame
      requestAnimationFrame(() => {
        setFadeStarted(true);
      });
    }
  }, [typingFinished]);

  return (
    <main className={styles.container}>
      {!typingFinished ? (
        <Typing onTypingEnd={() => setTypingFinished(true)} />
      ) : (
        <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
          <h1>Welcome to My Portfolio</h1>
          <p>Explore my projects and skills.</p>
        </div>
      )}
    </main>
  );
}
