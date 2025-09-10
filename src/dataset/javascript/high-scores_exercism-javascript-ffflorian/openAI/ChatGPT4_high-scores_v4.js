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
    this._sortedScores = null;
  }

  get scores() {
    return this._scores;
  }

  get latest() {
    return this._scores[this._scores.length - 1];
  }

  get personalBest() {
    return this._scores.reduce((max, score) => (score > max ? score : max), -Infinity);
  }

  get personalTopThree() {
    if (!this._sortedScores) {
      this._sortedScores = [...this._scores].sort((a, b) => b - a);
    }
    return this._sortedScores.slice(0, 3);
  }
}