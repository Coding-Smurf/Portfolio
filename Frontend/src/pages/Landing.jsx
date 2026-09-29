// Landing.jsx

import { useNavigate } from 'react-router-dom';
import Typing from '../components/Typing.jsx';
import { useState, useEffect } from 'react';
import styles from './Landing.module.css';

const INTRO_SEEN_KEY = 'introSeen';

// localStorage can throw (private mode, blocked storage), so fail silently
function hasSeenIntro() {
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) === 'true';
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, 'true');
  } catch {
    // ignore
  }
}

export default function Landing() {
  // Skip the intro if the visitor has already watched it
  const [typingFinished, setTypingFinished] = useState(hasSeenIntro);
  const navigate = useNavigate();

  // Event that navigates to About Me page
  // when typing animation is finished
  useEffect(() => {
    if (typingFinished) {
      markIntroSeen();
      navigate('/AboutMe', { replace: true });
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
