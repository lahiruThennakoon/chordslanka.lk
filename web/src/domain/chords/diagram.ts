import { mod12 } from './notes';
import { parseChord } from './parse';
import type { Chord, ChordShape, Voicing } from './types';
import { transposeChord } from './transpose';

/**
 * Chord shape derivation.
 *
 * PRD FR-40 requires a diagram for any chord without one being authored per
 * Song, so shapes are derived from the chord's structure against a shared
 * library. Two rules from that requirement shape this module:
 *
 *   - Diagrams show the shape the player forms, not the chord that sounds. A
 *     capo is drawn as the nut, so derivation works from the shape chord.
 *   - A chord whose shape cannot be derived returns null. Nothing is guessed.
 */

type ShapeKind = 'maj' | 'min' | 'dom7' | 'min7' | 'maj7' | 'sus4' | 'sus2';

/**
 * Exact-match only. A prefix match would silently hand back a major shape for
 * an altered or extended chord, which is the guessing FR-40 forbids.
 */
const QUALITY_KINDS: Record<string, ShapeKind> = {
  '': 'maj',
  M: 'maj',
  maj: 'maj',
  m: 'min',
  min: 'min',
  '-': 'min',
  '7': 'dom7',
  dom7: 'dom7',
  m7: 'min7',
  min7: 'min7',
  '-7': 'min7',
  maj7: 'maj7',
  M7: 'maj7',
  'Δ': 'maj7',
  'Δ7': 'maj7',
  sus: 'sus4',
  sus4: 'sus4',
  sus2: 'sus2',
};

/** Open positions, preferred over a barre wherever one exists. */
const OPEN_SHAPES: Record<string, (number | null)[]> = {
  '0:maj': [null, 3, 2, 0, 1, 0],
  '2:maj': [null, null, 0, 2, 3, 2],
  '4:maj': [0, 2, 2, 1, 0, 0],
  '7:maj': [3, 2, 0, 0, 0, 3],
  '9:maj': [null, 0, 2, 2, 2, 0],
  '2:min': [null, null, 0, 2, 3, 1],
  '4:min': [0, 2, 2, 0, 0, 0],
  '9:min': [null, 0, 2, 2, 1, 0],
  '0:dom7': [null, 3, 2, 3, 1, 0],
  '2:dom7': [null, null, 0, 2, 1, 2],
  '4:dom7': [0, 2, 0, 1, 0, 0],
  '7:dom7': [3, 2, 0, 0, 0, 1],
  '9:dom7': [null, 0, 2, 0, 2, 0],
  '11:dom7': [null, 2, 1, 2, 0, 2],
  '2:min7': [null, null, 0, 2, 1, 1],
  '4:min7': [0, 2, 0, 0, 0, 0],
  '9:min7': [null, 0, 2, 0, 1, 0],
  '0:maj7': [null, 3, 2, 0, 0, 0],
  '2:maj7': [null, null, 0, 2, 2, 2],
  '4:maj7': [0, 2, 1, 1, 0, 0],
  '5:maj7': [null, null, 3, 2, 1, 0],
  '7:maj7': [3, 2, 0, 0, 0, 2],
  '9:maj7': [null, 0, 2, 1, 2, 0],
  '2:sus4': [null, null, 0, 2, 3, 3],
  '4:sus4': [0, 2, 2, 2, 0, 0],
  '9:sus4': [null, 0, 2, 2, 3, 0],
  '2:sus2': [null, null, 0, 2, 3, 0],
  '9:sus2': [null, 0, 2, 2, 0, 0],
};

/** Movable shapes, as offsets from the barre fret. */
const E_SHAPES: Partial<Record<ShapeKind, (number | null)[]>> = {
  maj: [0, 2, 2, 1, 0, 0],
  min: [0, 2, 2, 0, 0, 0],
  dom7: [0, 2, 0, 1, 0, 0],
  min7: [0, 2, 0, 0, 0, 0],
  maj7: [0, 2, 1, 1, 0, 0],
  sus4: [0, 2, 2, 2, 0, 0],
};

const A_SHAPES: Partial<Record<ShapeKind, (number | null)[]>> = {
  maj: [null, 0, 2, 2, 2, 0],
  min: [null, 0, 2, 2, 1, 0],
  dom7: [null, 0, 2, 0, 2, 0],
  min7: [null, 0, 2, 0, 1, 0],
  maj7: [null, 0, 2, 1, 2, 0],
  sus4: [null, 0, 2, 2, 3, 0],
  sus2: [null, 0, 2, 2, 0, 0],
};

const OPEN_PITCH_STRING_6 = 4;
const OPEN_PITCH_STRING_5 = 9;

export function classifyQuality(quality: string): ShapeKind | null {
  return QUALITY_KINDS[quality] ?? null;
}

/**
 * Derives a shape for a chord. Slash-chord bass notes are ignored — the
 * diagram answers "how do I form this chord", and the bass note is already
 * visible in the chord symbol itself.
 */
export function shapeForChord(chord: Chord): ChordShape | null {
  const kind = classifyQuality(chord.quality);
  if (kind === null) return null;

  const open = OPEN_SHAPES[`${mod12(chord.root)}:${kind}`];
  if (open) {
    return { frets: open, barreFret: null, baseFret: 0 };
  }

  const candidates: ChordShape[] = [];
  const eTemplate = E_SHAPES[kind];
  if (eTemplate) {
    candidates.push(buildBarre(eTemplate, barreFretFor(chord.root, OPEN_PITCH_STRING_6)));
  }
  const aTemplate = A_SHAPES[kind];
  if (aTemplate) {
    candidates.push(buildBarre(aTemplate, barreFretFor(chord.root, OPEN_PITCH_STRING_5)));
  }
  if (candidates.length === 0) return null;

  return candidates.reduce((lowest, candidate) =>
    candidate.baseFret < lowest.baseFret ? candidate : lowest,
  );
}

/**
 * Derives the shape to show for a chord token as it currently appears on a
 * Sheet. Mirrors `renderChordToken`: the capo shifts the shape down, and the
 * diagram is drawn with the capo standing in for the nut.
 */
export function shapeForToken(token: string, voicing: Voicing): ChordShape | null {
  const chord = parseChord(token);
  if (chord === null) return null;
  return shapeForChord(transposeChord(chord, voicing.transpose - voicing.capo));
}

function barreFretFor(root: number, openStringPitch: number): number {
  const fret = mod12(root - openStringPitch);
  return fret === 0 ? 12 : fret;
}

function buildBarre(template: (number | null)[], barreFret: number): ChordShape {
  return {
    frets: template.map((offset) => (offset === null ? null : offset + barreFret)),
    barreFret,
    baseFret: barreFret,
  };
}
