//@ts-check

export class Clock {
  /** @type {number} */
  hours;
  /** @type {number} */
  minutes;

  constructor(hours = 0, minutes = 0) {
    let totalMinutes = hours * 60 + minutes;
    totalMinutes = totalMinutes % (24 * 60);

    if (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }

    this.hours = Math.floor(totalMinutes / 60);
    this.minutes = totalMinutes % 60;
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
    return this.hours === clock.hours && this.minutes === clock.minutes;
  }

  /**
   * @param {number} minutes
   * @returns {Clock}
   */
  minus(minutes = 0) {
    return new Clock(this.hours, this.minutes - minutes);
  }

  /**
   * @param {number} minutes
   * @returns {Clock}
   */
  plus(minutes = 0) {
    return new Clock(this.hours, this.minutes + minutes);
  }

  toString() {
    const hoursStr = String(this.hours).padStart(2, '0');
    const minutesStr = String(this.minutes).padStart(2, '0');
    return `${hoursStr}:${minutesStr}`;
  }
}