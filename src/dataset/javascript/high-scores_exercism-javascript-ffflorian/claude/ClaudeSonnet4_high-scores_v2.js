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
      this._cachedMax = this._scores.length > 0 ? Math.max(...this._scores) : undefined;
    }
    return this._cachedMax;
  }

  get personalTopThree() {
    if (this._cachedTopThree === null) {
      if (this._scores.length <= 3) {
        this._cachedTopThree = [...this._scores].sort((a, b) => b - a);
      } else {
        this._cachedTopThree = [...this._scores].sort((a, b) => b - a).slice(0, 3);
      }
    }
    return this._cachedTopThree;
  }
}