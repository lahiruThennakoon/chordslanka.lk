import type { Accidental, KeyName, PitchClass } from './types';

const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const NATURAL_PITCH: Record<string, PitchClass> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

/**
 * The twelve key names this module will produce. F# rather than Gb at 6,
 * following convention; Gb is still accepted as input.
 */
export const CANONICAL_KEYS: readonly KeyName[] = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
];

/**
 * PRD FR-11 fixes the respelling rule rather than leaving it to judgement,
 * because an engineer cannot test an adjective. Sharp keys spell accidentals
 * as sharps, flat keys as flats, and C uses sharps.
 */
const SHARP_KEYS = new Set(['C', 'G', 'D', 'A', 'E', 'B', 'F#']);
const FLAT_KEYS = new Set(['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']);

export function normalizeAccidental(text: string): string {
  return text.replace(/♯/g, '#').replace(/♭/g, 'b');
}

/** Parses a note name such as "C", "F#", "Bb". Returns null if not a note. */
export function parseNote(text: string): PitchClass | null {
  const normalized = normalizeAccidental(text.trim());
  const match = /^([A-G])(#{1,2}|b{1,2})?$/.exec(normalized);
  if (!match) return null;

  const natural = NATURAL_PITCH[match[1]];
  const accidentals = match[2] ?? '';
  let offset = 0;
  for (const character of accidentals) {
    offset += character === '#' ? 1 : -1;
  }
  return mod12(natural + offset);
}

export function spellNote(pitch: PitchClass, accidental: Accidental): string {
  const names = accidental === 'flat' ? FLAT_NAMES : SHARP_NAMES;
  return names[mod12(pitch)];
}

/**
 * Which accidental a key prefers. Unknown key names fall back to sharps rather
 * than throwing, so a malformed Original Key degrades to a readable Sheet
 * instead of an error page.
 */
export function accidentalForKey(key: KeyName): Accidental {
  const normalized = normalizeAccidental(key.trim());
  if (FLAT_KEYS.has(normalized)) return 'flat';
  if (SHARP_KEYS.has(normalized)) return 'sharp';
  return 'sharp';
}

/** Shifts a key name by a number of semitones, returning a canonical name. */
export function transposeKey(key: KeyName, semitones: number): KeyName {
  const pitch = parseNote(key);
  if (pitch === null) return key;
  return CANONICAL_KEYS[mod12(pitch + semitones)];
}

export function mod12(value: number): number {
  return ((value % 12) + 12) % 12;
}
