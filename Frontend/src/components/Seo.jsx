// Seo.jsx
// Updates the page title, description and canonical URL declared in index.html,
// so each route gets its own metadata without duplicating tags.

import { useEffect } from 'react';

const SITE_URL = 'https://coding-smurf.github.io/Portfolio';

function setAttr(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function Seo({ title, description, path = '' }) {
  useEffect(() => {
    // Name first: it's what people search for
    const fullTitle = `Adrián Ortiz Ramírez | ${title}`;
    const url = `${SITE_URL}/${path}`;

    document.title = fullTitle;
    setAttr('meta[name="description"]', 'content', description);
    setAttr('link[rel="canonical"]', 'href', url);
    setAttr('meta[property="og:title"]', 'content', fullTitle);
    setAttr('meta[property="og:description"]', 'content', description);
    setAttr('meta[property="og:url"]', 'content', url);
  }, [title, description, path]);

  return null;
}
