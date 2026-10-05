// Preferences.jsx
// Language selector (EN / ES) and light / dark theme toggle,
// shown at the top right, level with the navigation bar (inside its menu on phones).

import { useTranslation } from 'react-i18next';
import useTheme from '../hooks/useTheme.js';
import { LANGUAGES } from '../i18n/index.js';
import styles from './Preferences.module.css';

export default function Preferences() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const current = i18n.resolvedLanguage ?? i18n.language;
  const isDark = theme === 'dark';

  return (
    <div className={styles.preferences} role="group" aria-label={t('preferences.label')}>

      {/* Language selector */}
      <div className={styles.languages} role="group" aria-label={t('preferences.language')}>
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
        className={styles.themeButton}
        onClick={toggleTheme}
        aria-label={t(isDark ? 'preferences.switchToLight' : 'preferences.switchToDark')}
      >
        <span className="material-symbols-rounded" aria-hidden="true">
          {isDark ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

    </div>
  );
}
