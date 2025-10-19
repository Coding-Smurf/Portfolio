// Landing.jsx

import { useNavigate } from 'react-router-dom';
import Typing from '../components/Typing.jsx';
import { useState, useEffect } from 'react';
import styles from './Landing.module.css';

export default function Landing() {
  const [typingFinished, setTypingFinished] = useState(false);
  const navigate = useNavigate();

  // Event that navigates to About Me page
  // when typing animation is finished
  useEffect(() => {
    if (typingFinished) {
      navigate('/AboutMe');
    }
  }, [typingFinished, navigate]);


  // Render the landing page with typing animation
  // and navigate to About Me page when typing is done
  return (
    <main className={styles.container}>
      {
        // LOAD TYPING ANIMATION AT START //
      }
      {!typingFinished && (
        <Typing onTypingEnd={() => setTypingFinished(true)} />
      )}
      {
        // IF TYPING IS FINISHED, NAVIGATE TO ABOUT ME PAGE //
      }
    </main>
  );
}
