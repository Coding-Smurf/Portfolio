import { useEffect, useState } from 'react';
import styles from './ScrollHint.module.css';

// "Scroll" hint at the bottom of a page's opening screen: a caption over an ink line with
// a printed arrowhead. It fades out once the page is
// scrolled down and comes back when the reader returns to the top.
// It goes inside the hero, which has to be position: relative.
export default function ScrollHint({ label }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHidden(window.scrollY > 150);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.hint} ${hidden ? styles.hidden : ''}`} aria-hidden="true">
      <span className={styles.caption}>{label}</span>
      <span className={styles.arrow} />
    </div>
  );
}
