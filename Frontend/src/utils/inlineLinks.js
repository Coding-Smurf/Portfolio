// Splits a text with "[text](url)" links into pieces: plain strings and
// { text, href, plain } links. Write [text](url 'plain') for a link that should stay plain
// even where links are highlighted. Used by pages/Projects.jsx and src/prerender.
export function parseInlineLinks(text) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)\s]+)(\s+'plain')?\)$/);
    return match ? { text: match[1], href: match[2], plain: Boolean(match[3]) } : part;
  });
}
