import { describe, expect, it } from 'vitest';
import { formatChord, parseChord } from './parse';

describe('parseChord', () => {
  it('reads naturals, sharps and flats', () => {
    expect(parseChord('C')).toEqual({ root: 0, quality: '', bass: null });
    expect(parseChord('F#')).toEqual({ root: 6, quality: '', bass: null });
    expect(parseChord('Bb')).toEqual({ root: 10, quality: '', bass: null });
  });

  it('accepts unicode accidentals', () => {
    expect(parseChord('F♯m')).toEqual({ root: 6, quality: 'm', bass: null });
    expect(parseChord('B♭')).toEqual({ root: 10, quality: '', bass: null });
  });

  it('carries quality through verbatim', () => {
    expect(parseChord('Am7')?.quality).toBe('m7');
    expect(parseChord('Cmaj7')?.quality).toBe('maj7');
    expect(parseChord('Dsus4')?.quality).toBe('sus4');
    expect(parseChord('G7sus4')?.quality).toBe('7sus4');
    expect(parseChord('F#m7b5')?.quality).toBe('m7b5');
    expect(parseChord('C9(add13)')?.quality).toBe('9(add13)');
  });

  it('reads slash chords', () => {
    expect(parseChord('C/G')).toEqual({ root: 0, quality: '', bass: 7 });
    expect(parseChord('Am7/E')).toEqual({ root: 9, quality: 'm7', bass: 4 });
    expect(parseChord('Ab/Eb')).toEqual({ root: 8, quality: '', bass: 3 });
  });

  // PRD FR-11: anything unparseable is displayed unchanged rather than guessed at.
  it('rejects tokens that are not chords', () => {
    for (const token of ['N.C.', 'Bridge', 'Chorus', 'Verse', 'x2', '%', '', '   ', 'Intro']) {
      expect(parseChord(token)).toBeNull();
    }
  });

  it('rejects a section label that starts with a note letter', () => {
    // "Bridge" would otherwise parse as B plus "ridge".
    expect(parseChord('Bridge')).toBeNull();
    expect(parseChord('Guitar')).toBeNull();
    expect(parseChord('End')).toBeNull();
  });

  it('rejects a malformed slash bass', () => {
    expect(parseChord('C/H')).toBeNull();
  });
});

describe('formatChord', () => {
  it('spells according to the requested accidental', () => {
    const chord = { root: 10, quality: 'm7', bass: null };
    expect(formatChord(chord, 'flat')).toBe('Bbm7');
    expect(formatChord(chord, 'sharp')).toBe('A#m7');
  });

  it('spells the bass note too', () => {
    expect(formatChord({ root: 8, quality: '', bass: 3 }, 'flat')).toBe('Ab/Eb');
  });

  it('round-trips a parsed chord', () => {
    const parsed = parseChord('Am7/E');
    expect(parsed).not.toBeNull();
    expect(formatChord(parsed!, 'sharp')).toBe('Am7/E');
  });
});
