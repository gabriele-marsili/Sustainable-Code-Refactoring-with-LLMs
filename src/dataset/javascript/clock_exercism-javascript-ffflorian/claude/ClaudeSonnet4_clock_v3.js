//@ts-check

export class Clock {
  constructor(hours = 0, minutes = 0) {
    const totalMinutes = hours * 60 + minutes;
    const normalizedMinutes = ((totalMinutes % 1440) + 1440) % 1440;
    /** @type {number} */
    this.hours = Math.floor(normalizedMinutes / 60);
    /** @type {number} */
    this.minutes = normalizedMinutes % 60;
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
    return this.hours === clock.hours && this.minutes === clock.minutes;
  }

  /**
   * @param {number} minutes
   * @returns {Clock}
   */
  minus(minutes = 0) {
    return Clock.at(this.hours, this.minutes - minutes);
  }

  /**
   * @param {number} minutes
   * @returns {Clock}
   */
  plus(minutes = 0) {
    return Clock.at(this.hours, this.minutes + minutes);
  }

  toString() {
    return `${this.hours < 10 ? '0' : ''}${this.hours}:${this.minutes < 10 ? '0' : ''}${this.minutes}`;
  }
}