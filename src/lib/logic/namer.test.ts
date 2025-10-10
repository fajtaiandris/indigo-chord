// import { chordName } from '../src/namer';

// describe('ChordNamer', () => {
//   test('no notes', () => {
//     expect(chordName([])).toBe('');
//   });

//   test('one note', () => {
//     expect(chordName([60])).toBe('C');
//   });

//   test('intervals', () => {
//     expect(chordName([60, 60])).toBe('C - C (1)');
//     expect(chordName([60, 61])).toBe('C - C# (b2)');
//     expect(chordName([60, 67])).toBe('C - G (5)');
//     expect(chordName([60, 72])).toBe('C - C (1)');
//     expect(chordName([60, 112])).toBe('C - E (3)');
//   });

//   test('chords that are not really chords', () => {
//     expect(chordName([60, 60, 60])).toBe('?');
//     expect(chordName([60, 72, 84])).toBe('?');
//   });

//   test('simple triads', () => {
//     expect(chordName([60, 64, 67])).toBe('C');
//     expect(chordName([60, 64, 68])).toBe('Caug');
//     expect(chordName([60, 63, 67])).toBe('C-');
//     expect(chordName([60, 63, 66])).toBe('Cdim');
//     expect(chordName([60, 65, 67])).toBe('Csus4');
//   });

//   test('triad inversions', () => {
//     expect(chordName([64, 67, 72])).toBe('C/E');
//     expect(chordName([67, 72, 76])).toBe('C/G');
//     expect(chordName([50, 62, 66, 74, 81])).toBe('D');
//     expect(chordName([66, 74, 81])).toBe('D/F#');
//   });

//   test('seventh chords', () => {
//     expect(chordName([60, 64, 67, 71])).toBe('Cmaj7');
//     expect(chordName([60, 63, 67, 70])).toBe('C-7');
//     expect(chordName([60, 64, 67, 70])).toBe('C7');
//     expect(chordName([60, 63, 67, 71])).toBe('CmMaj7');
//     expect(chordName([60, 63, 66, 70])).toBe('C-7(b5)');
//     expect(chordName([60, 63, 66, 69])).toBe('Cdim7');

//     expect(chordName([59, 63, 66, 70])).toBe('Bmaj7');
//     expect(chordName([59, 62, 66, 69])).toBe('B-7');
//     expect(chordName([59, 63, 66, 69])).toBe('B7');
//     expect(chordName([59, 62, 66, 70])).toBe('BmMaj7');
//     expect(chordName([59, 62, 65, 69])).toBe('B-7(b5)');
//     expect(chordName([59, 62, 65, 68])).toBe('Bdim7');
//   });

//   test('seventh chords with fifth in the bass', () => {
//     expect(chordName([55, 60, 64, 67, 71])).toBe('Cmaj7/G');
//     expect(chordName([55, 60, 63, 67, 70])).toBe('C-7/G');
//     expect(chordName([55, 60, 64, 67, 70])).toBe('C7/G');
//   });

//   test('obvious extended chords', () => {
//     expect(chordName([60, 64, 67, 71, 74])).toBe('Cmaj9');
//     expect(chordName([60, 64, 67, 71, 74, 77, 81])).toBe('Cmaj13');
//     expect(chordName([60, 64, 67, 70, 74, 77, 81])).toBe('C13');
//     expect(chordName([60, 64, 67, 70, 75])).toBe('C7(#9)');
//   });

//   test('obvious extended chords with not obvious voicings', () => {
//     // expect(chordName([55, 64, 72, 74, 83])).toBe("Cmaj9/G");
//     expect(chordName([43, 48, 59, 64, 69, 74, 77])).toBe('Cmaj13/G');
//     expect(chordName([46, 52, 60, 65, 69, 74])).toBe('C13/A#');
//     // expect(chordName([43, 48, 58, 64, 70, 75])).toBe("C7(#9)/G");
//   });

//   test('not obvious chords', () => {
//     expect(chordName([40, 54, 59, 63, 76])).toBe('Badd11/E'); // ['E','F#','B','D#','E']
//     // expect(chordName([47, 50, 57, 61])).toBe("B-9");
//     expect(chordName([47, 50, 57, 61, 64, 69])).toBe('B-11');
//     // expect(chordName([47, 50, 54, 57, 61, 64, 69])).toBe("B-11");
//     expect(chordName([45, 55, 61, 66, 70])).toBe('A7(b9,13)');
//     expect(chordName([40, 55, 61, 66, 70])).toBe('Edim9');
//     expect(chordName([40, 49, 55, 61, 66])).toBe('C#dim/E');
//     expect(chordName([40, 52, 57, 62, 64, 69])).toBe('Asus4/E');
//     expect(chordName([43, 47, 53, 58, 63, 67])).toBe('G7(#9,b13)');
//     expect(chordName([38, 43, 47, 53, 58, 63, 67])).toBe('G7(#9,b13)/D');
//     expect(chordName([45, 49, 56, 59, 63, 68])).toBe('Amaj9(#11)');
//     // expect(chordName([40, 45, 49, 56, 59, 63, 68])).toBe("Amaj9(#11)/E");
//   });

//   describe.skip('undecidable without context chords', () => {
//     // could be G6 as well
//     test('E-7/G', () => {
//       expect(chordName([43, 47, 52, 59, 62])).toBe('E-7/G');
//     });
//     test('E-/G', () => {
//       expect(chordName([43, 47, 52])).toBe('E-/G');
//     });
//   });
// });
