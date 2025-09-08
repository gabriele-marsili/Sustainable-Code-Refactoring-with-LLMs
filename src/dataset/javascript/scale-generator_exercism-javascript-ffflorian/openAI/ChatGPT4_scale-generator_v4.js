//@ts-check

const sharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const flats = ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E'];
const usesFlatsSet = new Set(['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'd', 'g', 'c', 'f', 'bb', 'eb']);
const steps = { A: 3, M: 2, m: 1 };

export class Scale {
  /**
   * @param {string} tonic
   */
  constructor(tonic) {
    this._tonic = tonic;
    this._isFlat = usesFlatsSet.has(tonic);
    this._chromatic = this._isFlat ? flats : sharps;
  }

  chromatic() {
    return this._chromatic;
  }

  /**
   * @param {string} intervals
   */
  interval(intervals) {
    const currentTonic = this._tonic[0].toUpperCase() + this._tonic.slice(1);
    let scalePosition = this._chromatic.indexOf(currentTonic);
    const chromaticLength = this._chromatic.length;
    return Array.from(intervals, step => {
      const nextNote = this._chromatic[scalePosition];
      scalePosition = (scalePosition + steps[step]) % chromaticLength;
      return nextNote;
    });
  }
}