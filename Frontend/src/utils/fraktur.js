// Turns plain text into the bold fraktur ("gothic") Unicode letters used by the
// hero subtitles, so translations can be written as normal text.
// Accents are kept as combining marks on top of the fraktur letter.

const UPPER_START = 0x1d56c; // 𝕬
const LOWER_START = 0x1d586; // 𝖆

export default function fraktur(text) {
  return text
    .normalize('NFD')
    .replace(/[A-Za-z]/g, (ch) => {
      const code = ch.charCodeAt(0);
      return String.fromCodePoint(
        code < 97 ? UPPER_START + (code - 65) : LOWER_START + (code - 97)
      );
    })
    .normalize('NFC');
}
