import { describe, expect, it } from 'vitest';
import { transposeKey } from './notes';
import {
  NO_VOICING,
  renderChordToken,
  renderChordTokens,
  resolveKeys,
  transposeChord,
} from './transpose';

const inKey = (originalKey: string, transpose: number, capo = 0) =>
  (token: string) => renderChordToken(token, originalKey, { transpose, capo });

describe('transposeChord', () => {
  it('shifts root and bass and leaves quality alone', () => {
    expect(transposeChord({ root: 0, quality: 'm7', bass: 7 }, 2)).toEqual({
      root: 2,
      quality: 'm7',
      bass: 9,
    });
  });

  it('wraps around the octave in both directions', () => {
    expect(transposeChord({ root: 11, quality: '', bass: null }, 1).root).toBe(0);
    expect(transposeChord({ root: 0, quality: '', bass: null }, -1).root).toBe(11);
    expect(transposeChord({ root: 0, quality: '', bass: null }, -13).root).toBe(11);
  });
});

describe('transposeKey', () => {
  it('returns conventional key names', () => {
    expect(transposeKey('C', 1)).toBe('Db');
    expect(transposeKey('C', 2)).toBe('D');
    expect(transposeKey('C', 6)).toBe('F#');
    expect(transposeKey('A', -2)).toBe('G');
    expect(transposeKey('C', 0)).toBe('C');
  });
});

describe('renderChordToken', () => {
  it('transposes by semitone', () => {
    const render = inKey('C', 2);
    expect(render('C')).toBe('D');
    expect(render('Am')).toBe('Bm');
    expect(render('G7')).toBe('A7');
  });

  // PRD FR-11: spelling follows the key signature rather than defaulting to
  // sharps or flats.
  it('spells accidentals for a flat target key', () => {
    expect(renderChordToken('C', 'C', { transpose: 1, capo: 0 })).toBe('Db');
    expect(renderChordToken('F', 'C', { transpose: 1, capo: 0 })).toBe('Gb');
  });

  it('spells accidentals for a sharp target key', () => {
    expect(renderChordToken('G', 'G', { transpose: -1, capo: 0 })).toBe('F#');
    expect(renderChordToken('C', 'G', { transpose: -1, capo: 0 })).toBe('B');
  });

  it('preserves quality and extensions through transposition', () => {
    const render = inKey('C', 3);
    expect(render('Am7')).toBe('Cm7');
    expect(render('Dsus4')).toBe('Fsus4');
    expect(render('C9(add13)')).toBe('Eb9(add13)');
  });

  it('transposes both halves of a slash chord', () => {
    expect(renderChordToken('C/G', 'C', { transpose: 2, capo: 0 })).toBe('D/A');
    expect(renderChordToken('Am7/E', 'C', { transpose: 2, capo: 0 })).toBe('Bm7/F#');
  });

  it('leaves non-chord annotations untouched', () => {
    const render = inKey('C', 5);
    for (const token of ['N.C.', 'Chorus', 'x2', '%', 'Intro']) {
      expect(render(token)).toBe(token);
    }
  });

  it('is identity at zero transpose and no capo', () => {
    expect(renderChordToken('Am7/E', 'C', NO_VOICING)).toBe('Am7/E');
  });

  it('maps a whole sheet in one pass', () => {
    expect(renderChordTokens(['C', 'Am', 'N.C.', 'F', 'G7'], 'C', { transpose: 2, capo: 0 })).toEqual(
      ['D', 'Bm', 'N.C.', 'G', 'A7'],
    );
  });
});

describe('capo composition', () => {
  // PRD FR-12: transpose and capo compose into one result. A capo raises the
  // sounding pitch, so the shapes the player forms drop by its fret.
  it('lowers the shapes by the capo fret', () => {
    expect(renderChordToken('C', 'C', { transpose: 0, capo: 2 })).toBe('Bb');
    expect(renderChordToken('G', 'C', { transpose: 0, capo: 2 })).toBe('F');
  });

  it('composes transpose and capo rather than applying them in sequence', () => {
    // Up two, capo two: the shapes come back to where they started.
    expect(renderChordToken('C', 'C', { transpose: 2, capo: 2 })).toBe('C');
    expect(renderChordToken('Am', 'C', { transpose: 2, capo: 2 })).toBe('Am');
  });

  it('spells shapes for the key being displayed, not the key being heard', () => {
    // Sounding C with capo 2 means Bb shapes. "A#" would be technically
    // enharmonic and practically wrong.
    expect(renderChordToken('C', 'C', { transpose: 0, capo: 2 })).toBe('Bb');
  });

  it('a capo of zero behaves as no capo', () => {
    expect(renderChordToken('F#m', 'D', { transpose: 0, capo: 0 })).toBe('F#m');
  });
});

describe('resolveKeys', () => {
  it('reports original, sounding and shape keys distinctly', () => {
    expect(resolveKeys('C', { transpose: 2, capo: 0 })).toEqual({
      originalKey: 'C',
      soundingKey: 'D',
      shapeKey: 'D',
    });
  });

  it('separates sounding key from shape key when a capo is set', () => {
    expect(resolveKeys('C', { transpose: 0, capo: 2 })).toEqual({
      originalKey: 'C',
      soundingKey: 'C',
      shapeKey: 'Bb',
    });
  });

  it('keeps the original key visible after transposition', () => {
    expect(resolveKeys('G', { transpose: 5, capo: 3 }).originalKey).toBe('G');
  });
});
