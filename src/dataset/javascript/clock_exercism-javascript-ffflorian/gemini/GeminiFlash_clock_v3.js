//@ts-check

export class Clock {
  /** @type {number} */
  #minutes;

  constructor(hours = 0, minutes = 0) {
    this.#minutes = (hours * 60 + minutes) % (24 * 60);
    if (this.#minutes < 0) {
      this.#minutes += 24 * 60;
    }
  }

  /**
   * @param {number} hours
   * @param {number} minutes
   * @returns {Clock}
   */
  static at(hours, minutes) {
    return new Clock(hours, minutes);
  }

  /**
   * @param {Clock} clock
   * @returns {boolean}
   */
  equals(clock) {
    if (!(clock instanceof Clock)) {
      throw new TypeError('Not a valid clock');
    }
    return this.#minutes === clock.#minutes;
  }

  /**
   * @param {number} minutes
   * @returns {Clock}
   */
  minus(minutes = 0) {
    return new Clock(0, this.#minutes - minutes);
  }

  /**
   * @param {number} minutes
   * @returns {Clock}
   */
  plus(minutes = 0) {
    return new Clock(0, this.#minutes + minutes);
  }

  toString() {
    const hours = Math.floor(this.#minutes / 60);
    const minutes = this.#minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
}