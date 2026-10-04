# Portfolio

React + Vite site in `Frontend/`. Texts live in `Frontend/src/locales/{en,es}/*.json` and the project data in `Frontend/src/data/projects.js`.

## Keep `llms.txt` in sync with the site

`Frontend/public/llms.txt` is the plain-text version of the site for crawlers and AI agents. The pages are rendered with JavaScript, so many of them cannot read the site itself and rely on this file. The site tells them to read it (see the note in `Frontend/index.html` and in `Frontend/src/pages/Projects.jsx`).

Whenever you add information to the site, or correct information that is already there, make the same change in `Frontend/public/llms.txt` in the same piece of work. This covers:

- a new, removed or edited project (`projects.js` and the `projects.json` locales): title, role, year, status, description, stack, links, rating;
- changes to the About me, My journey, Contact or landing texts (`locales/*`);
- new pages or sections, and changed links, contact details or the site structure.

Write `llms.txt` in English, as plain facts and without markup that depends on the layout. If something is removed from the site, remove it from `llms.txt` too, so the two never disagree.
