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
      this._cachedMax = this._scores.length === 0 ? undefined : 
        this._scores.reduce((max, score) => score > max ? score : max, this._scores[0]);
    }
    return this._cachedMax;
  }

  get personalTopThree() {
    if (this._cachedTopThree === null) {
      if (this._scores.length <= 3) {
        this._cachedTopThree = [...this._scores].sort((a, b) => b - a);
      } else {
        this._cachedTopThree = this._scores
          .reduce((top3, score) => {
            if (top3.length < 3) {
              top3.push(score);
              top3.sort((a, b) => b - a);
            } else if (score > top3[2]) {
              top3[2] = score;
              top3.sort((a, b) => b - a);
            }
            return top3;
          }, []);
      }
    }
    return this._cachedTopThree;
  }
}