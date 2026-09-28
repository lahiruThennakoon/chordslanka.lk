import { describe, expect, it } from 'vitest';
import { classifyQuality, shapeForChord, shapeForToken } from './diagram';
import { parseChord } from './parse';

const shapeFor = (token: string) => {
  const chord = parseChord(token);
  expect(chord).not.toBeNull();
  return shapeForChord(chord!);
};

describe('classifyQuality', () => {
  it('recognises the supported qualities', () => {
    expect(classifyQuality('')).toBe('maj');
    expect(classifyQuality('m')).toBe('min');
    expect(classifyQuality('7')).toBe('dom7');
    expect(classifyQuality('m7')).toBe('min7');
    expect(classifyQuality('maj7')).toBe('maj7');
    expect(classifyQuality('sus4')).toBe('sus4');
    expect(classifyQuality('sus2')).toBe('sus2');
  });

  // PRD FR-40: a chord whose shape cannot be derived shows no diagram rather
  // than a guessed one. A prefix match would hand back a major shape here.
  it('returns null rather than approximating an unsupported quality', () => {
    for (const quality of ['dim', 'aug', '9', '13', 'm7b5', '7sus4', '9(add13)']) {
      expect(classifyQuality(quality)).toBeNull();
    }
  });
});

describe('shapeForChord', () => {
  it('prefers open positions where one exists', () => {
    expect(shapeFor('C')).toEqual({ frets: [null, 3, 2, 0, 1, 0], barreFret: null, baseFret: 0 });
    expect(shapeFor('Em')).toEqual({ frets: [0, 2, 2, 0, 0, 0], barreFret: null, baseFret: 0 });
    expect(shapeFor('G7')).toEqual({ frets: [3, 2, 0, 0, 0, 1], barreFret: null, baseFret: 0 });
  });

  it('falls back to an E-shape barre', () => {
    // F major sits one fret above the open E shape.
    expect(shapeFor('F')).toEqual({ frets: [1, 3, 3, 2, 1, 1], barreFret: 1, baseFret: 1 });
  });

  it('falls back to an A-shape barre when it is the lower position', () => {
    // Bb major is fret 6 as an E shape but fret 1 as an A shape.
    expect(shapeFor('Bb')).toEqual({
      frets: [null, 1, 3, 3, 3, 1],
      barreFret: 1,
      baseFret: 1,
    });
  });

  it('never places a barre at fret zero', () => {
    for (const token of ['C', 'F', 'Bb', 'F#m', 'C#m7', 'Ab', 'Ebmaj7']) {
      const shape = shapeFor(token);
      expect(shape).not.toBeNull();
      expect(shape!.barreFret === null || shape!.barreFret >= 1).toBe(true);
    }
  });

  it('keeps every fretted position within reach', () => {
    for (const root of ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']) {
      for (const quality of ['', 'm', '7', 'm7', 'maj7']) {
        const shape = shapeFor(`${root}${quality}`);
        expect(shape, `${root}${quality} has no shape`).not.toBeNull();
        for (const fret of shape!.frets) {
          if (fret !== null) expect(fret).toBeLessThanOrEqual(15);
        }
      }
    }
  });

  it('returns null for a quality it cannot derive', () => {
    expect(shapeFor('Cdim')).toBeNull();
    expect(shapeFor('G7sus4')).toBeNull();
  });

  it('ignores the slash bass and shapes the chord itself', () => {
    expect(shapeFor('C/G')).toEqual(shapeFor('C'));
  });
});

describe('shapeForToken', () => {
  it('returns null for non-chord tokens', () => {
    expect(shapeForToken('N.C.', { transpose: 0, capo: 0 })).toBeNull();
    expect(shapeForToken('Chorus', { transpose: 0, capo: 0 })).toBeNull();
  });

  it('follows transposition', () => {
    expect(shapeForToken('C', { transpose: 2, capo: 0 })).toEqual(shapeFor('D'));
  });

  // PRD FR-40: diagrams show the shape the player forms, not the chord that
  // sounds. A diagram showing the sounding chord under a capo is a defect.
  it('shows the capo-relative shape, not the sounding chord', () => {
    const underCapo = shapeForToken('C', { transpose: 0, capo: 2 });
    expect(underCapo).toEqual(shapeFor('Bb'));
    expect(underCapo).not.toEqual(shapeFor('C'));
  });

  it('composes transpose and capo', () => {
    expect(shapeForToken('C', { transpose: 2, capo: 2 })).toEqual(shapeFor('C'));
  });
});
