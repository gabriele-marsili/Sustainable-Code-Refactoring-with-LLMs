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
  }

  get scores() {
    return this._scores;
  }

  get latest() {
    return this._scores[this._scores.length - 1];
  }

  get personalBest() {
    let best = -Infinity;
    for (let i = 0; i < this._scores.length; i++) {
      if (this._scores[i] > best) {
        best = this._scores[i];
      }
    }
    return best;
  }

  get personalTopThree() {
    const sortedScores = [...this._scores];
    sortedScores.sort((a, b) => b - a);
    return sortedScores.slice(0, 3);
  }
}