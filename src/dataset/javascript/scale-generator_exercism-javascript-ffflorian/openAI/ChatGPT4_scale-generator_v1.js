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
    /**
     * @private
     * @type {string}
     */
    this._tonic = tonic;
    /**
     * @private
     * @type {string[]}
     */
    this._chromaticScale = usesFlatsSet.has(tonic) ? flats : sharps;
  }

  chromatic() {
    return this._chromaticScale;
  }

  /**
   * @param {string} intervals
   */
  interval(intervals) {
    const currentTonic = `${this._tonic[0].toUpperCase()}${this._tonic.slice(1)}`;
    let scalePosition = this._chromaticScale.indexOf(currentTonic);
    const scaleLength = this._chromaticScale.length;
    return [...intervals].map(step => {
      const nextNote = this._chromaticScale[scalePosition];
      scalePosition = (scalePosition + steps[step]) % scaleLength;
      return nextNote;
    });
  }
}