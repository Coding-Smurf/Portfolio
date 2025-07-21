// Landing.jsx
import React, { useState } from 'react';
import styles from './Landing.module.css';
import Typing from '../components/Typing.jsx';

export default function Landing() {
  const [typingFinished, setTypingFinished] = useState(false);

  return (
    <main className={styles.container}>
      {!typingFinished ? (
        <Typing onTypingEnd={() => setTypingFinished(true)} />
      ) : (
        <div className={styles.landingContent}>
          <h1>Welcome to My Portfolio</h1>
          <p>Explore my projects and skills.</p>
        </div>
      )}
    </main>
  );
}
