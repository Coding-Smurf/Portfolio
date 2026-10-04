// i18n setup. Texts live in src/locales/<language>/<namespace>.json:
// one namespace per page (plus "common" for shared pieces such as the navigation bar).
// To add a language: create a folder with the same files and register it below.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '../locales/en/common.json';
import enLanding from '../locales/en/landing.json';
import enAbout from '../locales/en/about.json';
import enJourney from '../locales/en/journey.json';
import enContact from '../locales/en/contact.json';
import enProjects from '../locales/en/projects.json';

import esCommon from '../locales/es/common.json';
import esLanding from '../locales/es/landing.json';
import esAbout from '../locales/es/about.json';
import esJourney from '../locales/es/journey.json';
import esContact from '../locales/es/contact.json';
import esProjects from '../locales/es/projects.json';

export const LANGUAGES = ['en', 'es'];
const LANGUAGE_KEY = 'lang';

// localStorage can throw (private mode, blocked storage), so fail silently
function readStoredLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_KEY);
  } catch {
    return null;
  }
}

// Saved choice first, then the browser's language, then English
function detectLanguage() {
  const stored = readStoredLanguage();
  if (LANGUAGES.includes(stored)) return stored;
  const browser = (navigator.languages?.[0] || navigator.language || 'en').slice(0, 2);
  return LANGUAGES.includes(browser) ? browser : 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      landing: enLanding,
      about: enAbout,
      journey: enJourney,
      contact: enContact,
      projects: enProjects,
    },
    es: {
      common: esCommon,
      landing: esLanding,
      about: esAbout,
      journey: esJourney,
      contact: esContact,
      projects: esProjects,
    },
  },
  lng: detectLanguage(),
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'landing', 'about', 'journey', 'contact', 'projects'],
  interpolation: { escapeValue: false }, // React already escapes
});

// Keep <html lang> in sync (screen readers, hyphenation) and remember the choice
function applyLanguage(lng) {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem(LANGUAGE_KEY, lng);
  } catch {
    // ignore
  }
}

applyLanguage(i18n.language);
i18n.on('languageChanged', applyLanguage);

export default i18n;
