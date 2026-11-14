// Preferences.jsx
// Language selector (EN / ES) and light / dark theme toggle,
// shown at the top right, level with the navigation bar (inside its menu on phones).

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTheme from '../hooks/useTheme.js';
import { LANGUAGES } from '../i18n/index.js';
import styles from './Preferences.module.css';

export default function Preferences() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const current = i18n.resolvedLanguage ?? i18n.language;
  const currentIndex = Math.max(LANGUAGES.indexOf(current), 0);
  const isDark = theme === 'dark';
  const [pressed, setPressed] = useState(false);

  return (
    <div className={styles.preferences} role="group" aria-label={t('preferences.label')}>

      {/* Language selector: the pressed-in indicator slides under the selected language */}
      <div
        className={styles.languages}
        role="group"
        aria-label={t('preferences.language')}
        style={{ '--count': LANGUAGES.length, '--index': currentIndex }}
      >
        <span className={styles.indicator} aria-hidden="true" />
        {LANGUAGES.map((lng) => (
          <button
            key={lng}
            type="button"
            lang={lng}
            className={`${styles.languageButton} ${current === lng ? styles.active : ''}`}
            aria-pressed={current === lng}
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Theme toggle */}
      <button
        type="button"
        className={`${styles.themeButton} ${pressed ? styles.pressed : ''}`}
        onClick={() => { setPressed(true); toggleTheme(); }}
        onAnimationEnd={(e) => { if (e.target === e.currentTarget) setPressed(false); }}
        aria-label={t(isDark ? 'preferences.switchToLight' : 'preferences.switchToDark')}
      >
        {/* keyed by theme so the icon remounts and plays its turn-in animation */}
        <span key={theme} className={`material-symbols-rounded ${styles.themeIcon}`} aria-hidden="true">
          {isDark ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

    </div>
  );
}
