import { normalizeAccidental, parseNote, spellNote } from './notes';
import type { Accidental, Chord } from './types';

/**
 * Characters and tokens a chord suffix may contain. This is a whitelist on
 * purpose: without it, section labels parse as chords ("Bridge" would become B
 * plus "ridge"), and PRD FR-11 requires anything the system cannot parse to be
 * displayed unchanged rather than guessed at.
 */
const QUALITY_PATTERN = /^(?:maj|Maj|MAJ|min|Min|dim|Dim|aug|Aug|sus|add|alt|no|[mM]|[oø°+\-Δ]|\d|[#b]|[()]|,)*$/;

const CHORD_PATTERN = /^([A-G](?:#{1,2}|b{1,2})?)([^/]*)(?:\/([A-G](?:#{1,2}|b{1,2})?))?$/;

/**
 * Parses one chord token. Returns null for anything that is not a chord —
 * "N.C.", "x2", repeat marks, section labels — which callers must render
 * untouched (PRD FR-11).
 */
export function parseChord(token: string): Chord | null {
  const text = normalizeAccidental(token.trim());
  if (text.length === 0) return null;

  const match = CHORD_PATTERN.exec(text);
  if (!match) return null;

  const [, rootText, qualityText, bassText] = match;
  if (!QUALITY_PATTERN.test(qualityText)) return null;

  const root = parseNote(rootText);
  if (root === null) return null;

  const bass = bassText ? parseNote(bassText) : null;
  if (bassText && bass === null) return null;

  return { root, quality: qualityText, bass };
}

/** Renders a chord back to text using the given accidental preference. */
export function formatChord(chord: Chord, accidental: Accidental): string {
  const root = spellNote(chord.root, accidental);
  const bass = chord.bass === null ? '' : `/${spellNote(chord.bass, accidental)}`;
  return `${root}${chord.quality}${bass}`;
}
