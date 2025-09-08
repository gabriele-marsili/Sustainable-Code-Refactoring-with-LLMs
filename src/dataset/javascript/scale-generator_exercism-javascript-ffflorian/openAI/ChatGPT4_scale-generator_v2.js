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
    this._tonic = tonic[0].toUpperCase() + tonic.slice(1);
    this._scale = usesFlatsSet.has(this._tonic) ? flats : sharps;
  }

  chromatic() {
    return this._scale;
  }

  /**
   * @param {string} intervals
   */
  interval(intervals) {
    let scalePosition = this._scale.indexOf(this._tonic);
    return intervals.split('').map(step => {
      const note = this._scale[scalePosition];
      scalePosition = (scalePosition + steps[step]) % this._scale.length;
      return note;
    });
  }
}