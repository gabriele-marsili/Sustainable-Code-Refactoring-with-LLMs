//@ts-check

const sharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const flats = ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E'];
const usesFlatsSet = new Set(['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'd', 'g', 'c', 'f', 'bb', 'eb']);
const steps = {A: 3, M: 2, m: 1};

export class Scale {
  /**
   * @param {string} tonic
   */
  constructor(tonic) {
    /**
     * @private
     * @type {string}
     */
    this._tonic = tonic;
    this._useFlats = usesFlatsSet.has(this._tonic);
    this._notes = this._useFlats ? flats : sharps;
  }

  chromatic() {
    return this._notes;
  }

  /**
   * @param {string} intervals
   */
  interval(intervals) {
    const currentTonic = `${this._tonic[0].toUpperCase()}${this._tonic.slice(1)}`;
    let scalePosition = this._notes.indexOf(currentTonic);
    const scale = [];
    for (let i = 0; i < intervals.length; i++) {
      const step = intervals[i];
      const nextNote = this._notes[scalePosition];
      scale.push(nextNote);
      scalePosition = (scalePosition + steps[step]) % this._notes.length;
    }
    return scale;
  }
}