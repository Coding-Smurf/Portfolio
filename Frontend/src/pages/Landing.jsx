import React, { useState, useEffect } from 'react';
import styles from './Landing.module.css';
import Typing from '../components/Typing.jsx';
import NavigationBar from '../components/NavigationBar.jsx';

export default function Landing() {
  const [typingFinished, setTypingFinished] = useState(false);
  const [fadeStarted, setFadeStarted] = useState(false);

  useEffect(() => {
    if (typingFinished) {
      requestAnimationFrame(() => {
        setFadeStarted(true);
      });
    }
  }, [typingFinished]);

  return (
    <main className={styles.container}>
      {
        // LOAD TYPING ANIMATION AT START //
      }
      {!typingFinished ? (
        <Typing onTypingEnd={() => setTypingFinished(true)} />
      ) : (
        <>
          {
            // FADE IN CONTENT AFTER TYPING ENDS //
          }
          <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
            {
              // LOAD NAVIGATION BAR ON TOP OF THE PAGE //
            }
            <NavigationBar />



          </div>
        </>
      )}
    </main>
  );
}
