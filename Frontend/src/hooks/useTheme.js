// Light / dark theme. The choice is stored in localStorage and applied as
// data-theme on <html>; index.html applies it before React loads to avoid a flash.

import { useCallback, useState } from 'react';

const THEME_KEY = 'theme';

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export default function useTheme() {
  const [theme, setTheme] = useState(currentTheme);

  const toggleTheme = useCallback(() => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;

    // Fade every element together (see .theme-transition in index.css), unless motion is reduced
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 450);
    }

    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // ignore (private mode, blocked storage)
    }
    setTheme(next);
  }, []);

  return { theme, toggleTheme };
}
