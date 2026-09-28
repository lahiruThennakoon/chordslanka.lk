/**
 * Chord domain types.
 *
 * This module and its siblings are framework-free by rule: nothing here may
 * import from `react`, `next`, or anything that touches the DOM. PRD §8
 * requires transposition and diagram derivation to be pure, deterministic and
 * covered by tests before release, and a wrong result here is rated alongside
 * a wrong transposition in §14.
 */

/** Semitone distance above C. 0 = C, 1 = C#/Db, ... 11 = B. */
export type PitchClass = number;

/**
 * A chord, decomposed so that transposition touches pitch and nothing else.
 * `quality` is carried through verbatim (PRD FR-11: quality, extensions and
 * bass survive transposition; only pitch changes).
 */
export interface Chord {
  root: PitchClass;
  /** Everything after the root and before any slash: "m7", "sus4", "add9", "". */
  quality: string;
  /** Slash-chord bass note, or null when the chord has none. */
  bass: PitchClass | null;
}

/** Which accidental a key prefers when naming the five black notes. */
export type Accidental = 'sharp' | 'flat';

/**
 * A major key name as written, e.g. "C", "Bb", "F#". Only the twelve
 * conventional names in `CANONICAL_KEYS` are produced by this module, though
 * `Gb` is accepted as input.
 */
export type KeyName = string;

/**
 * How a Sheet is currently being presented. Transpose and Capo compose into a
 * single result rather than being applied in sequence by the caller — see
 * PRD FR-12, which requires that a visitor never has to mentally undo one to
 * apply the other.
 */
export interface Voicing {
  /** Semitones the visitor has shifted the Sheet by. May be negative. */
  transpose: number;
  /** Capo fret, 1-12, or 0 for no capo. */
  capo: number;
}

/** One guitar chord shape, low E string first. */
export interface ChordShape {
  /**
   * Six entries, low E to high E. `null` is a muted string, `0` is open, and
   * any other number is an absolute fret.
   */
  frets: (number | null)[];
  /** Absolute fret of a full barre, when the shape needs one. */
  barreFret: number | null;
  /** Lowest fretted position, used to label the diagram. 0 for open shapes. */
  baseFret: number;
}
