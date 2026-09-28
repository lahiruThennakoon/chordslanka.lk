import { accidentalForKey, mod12, transposeKey } from './notes';
import { formatChord, parseChord } from './parse';
import type { Chord, KeyName, Voicing } from './types';

export interface RenderedSheetKeys {
  /** The key the Sheet was transcribed in. */
  originalKey: KeyName;
  /** The key that will actually be heard. */
  soundingKey: KeyName;
  /**
   * The key whose shapes the player forms. Equal to the Sounding Key when no
   * capo is set; PRD FR-12 requires both to be labelled distinctly when one is.
   */
  shapeKey: KeyName;
}

export function transposeChord(chord: Chord, semitones: number): Chord {
  return {
    root: mod12(chord.root + semitones),
    quality: chord.quality,
    bass: chord.bass === null ? null : mod12(chord.bass + semitones),
  };
}

/**
 * Resolves a transpose amount and a capo position into the keys a Sheet is
 * presented with. Transpose raises the sounding pitch; a capo raises the
 * sounding pitch too, which means the shapes the player forms drop by the
 * capo's fret. PRD FR-12 requires these to compose rather than be applied one
 * after the other by the caller.
 */
export function resolveKeys(originalKey: KeyName, voicing: Voicing): RenderedSheetKeys {
  const soundingKey = transposeKey(originalKey, voicing.transpose);
  return {
    originalKey,
    soundingKey,
    shapeKey: transposeKey(soundingKey, -voicing.capo),
  };
}

/**
 * Renders one chord token as it should appear on screen.
 *
 * The chord shown is the shape the player forms, so a capo shifts it down
 * (PRD FR-12). Spelling follows the key of the chords actually displayed —
 * the shape key — because those are the names being read. Spelling shapes
 * against the Sounding Key instead produces results like "A#" for a chord
 * every guitarist writes as "Bb".
 *
 * Tokens that are not chords come back untouched (PRD FR-11).
 */
export function renderChordToken(
  token: string,
  originalKey: KeyName,
  voicing: Voicing,
): string {
  const chord = parseChord(token);
  if (chord === null) return token;

  const shift = voicing.transpose - voicing.capo;
  const shifted = transposeChord(chord, shift);
  return formatChord(shifted, accidentalForKey(transposeKey(originalKey, shift)));
}

/** Convenience for rendering a whole Sheet's chord events in one pass. */
export function renderChordTokens(
  tokens: readonly string[],
  originalKey: KeyName,
  voicing: Voicing,
): string[] {
  return tokens.map((token) => renderChordToken(token, originalKey, voicing));
}

export const NO_VOICING: Voicing = { transpose: 0, capo: 0 };
