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
    this._chromaticScale = this._useFlats ? flats : sharps;
    this._currentTonic = `${this._tonic[0].toUpperCase()}${this._tonic.slice(1)}`;
    this._scalePosition = this._chromaticScale.indexOf(this._currentTonic);
  }

  chromatic() {
    return this._chromaticScale;
  }

  /**
   * @param {string} intervals
   */
  interval(intervals) {
    let scalePosition = this._scalePosition;
    const chromaticScale = this._chromaticScale;
    const scaleLength = chromaticScale.length;

    return [...intervals].map(step => {
      const nextNote = chromaticScale[scalePosition];
      scalePosition = (scalePosition + steps[step]) % scaleLength;
      return nextNote;
    });
  }
}