//@ts-check

const sharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const flats = ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E'];
const usesFlatsSet = new Set(['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'd', 'g', 'c', 'f', 'bb', 'eb']);
// eslint-disable-next-line sort-keys
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
    /**
     * @private
     * @type {string[]}
     */
    this._chromatic = usesFlatsSet.has(tonic) ? flats : sharps;
    /**
     * @private
     * @type {string}
     */
    this._normalizedTonic = `${tonic[0].toUpperCase()}${tonic.slice(1)}`;
  }

  chromatic() {
    return this._chromatic;
  }

  /**
   * @param {string} intervals
   */
  interval(intervals) {
    let scalePosition = this._chromatic.indexOf(this._normalizedTonic);
    const result = new Array(intervals.length);
    
    for (let i = 0; i < intervals.length; i++) {
      result[i] = this._chromatic[scalePosition];
      scalePosition = (scalePosition + steps[intervals[i]]) % 12;
    }
    
    return result;
  }
}