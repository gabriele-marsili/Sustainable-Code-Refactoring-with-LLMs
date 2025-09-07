//@ts-check

export class Clock {
  constructor(hours = 0, minutes = 0) {
    const totalMinutes = (hours * 60 + minutes) % 1440;
    this.hours = ((Math.floor(totalMinutes / 60) + 24) % 24);
    this.minutes = ((totalMinutes % 60) + 60) % 60;
  }

  static at(hours, minutes) {
    return new Clock(hours, minutes);
  }

  equals(clock) {
    if (!(clock instanceof Clock)) {
      throw new TypeError('Not a valid clock');
    }
    return this.hours === clock.hours && this.minutes === clock.minutes;
  }

  minus(minutes = 0) {
    return this.plus(-minutes);
  }

  plus(minutes = 0) {
    return new Clock(this.hours, this.minutes + minutes);
  }

  toString() {
    return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}`;
  }
}