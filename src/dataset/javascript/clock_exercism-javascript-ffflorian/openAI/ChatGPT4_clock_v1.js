//@ts-check

export class Clock {
  constructor(hours = 0, minutes = 0) {
    const totalMinutes = (hours * 60 + minutes) % 1440;
    this.hours = ((Math.floor(totalMinutes / 60) + 24) % 24);
    this.minutes = ((totalMinutes % 60) + 60) % 60;
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
    return clock instanceof Clock && this.hours === clock.hours && this.minutes === clock.minutes;
  }

  /**
   * @param {number} minutes
   * @returns {Clock}
   */
  minus(minutes = 0) {
    return this.plus(-minutes);
  }

  /**
   * @param {number} minutes
   * @returns {Clock}
   */
  plus(minutes = 0) {
    return new Clock(this.hours, this.minutes + minutes);
  }

  toString() {
    return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}`;
  }
}