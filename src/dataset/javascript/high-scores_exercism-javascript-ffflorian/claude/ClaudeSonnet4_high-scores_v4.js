//@ts-check

export class HighScores {
  /**
   * @param {number[]} scores
   */
  constructor(scores) {
    /**
     * @private
     * @type {number[]}
     */
    this._scores = scores;
    
    /**
     * @private
     * @type {number | null}
     */
    this._cachedMax = null;
    
    /**
     * @private
     * @type {number[] | null}
     */
    this._cachedTopThree = null;
  }

  get scores() {
    return this._scores;
  }

  get latest() {
    return this._scores[this._scores.length - 1];
  }

  get personalBest() {
    if (this._cachedMax === null) {
      this._cachedMax = this._scores.length === 0 ? 0 : this._scores.reduce((max, score) => score > max ? score : max, this._scores[0]);
    }
    return this._cachedMax;
  }

  get personalTopThree() {
    if (this._cachedTopThree === null) {
      if (this._scores.length <= 3) {
        this._cachedTopThree = this._scores.slice().sort((a, b) => b - a);
      } else {
        const sorted = this._scores.slice().sort((a, b) => b - a);
        this._cachedTopThree = sorted.slice(0, 3);
      }
    }
    return this._cachedTopThree;
  }
}