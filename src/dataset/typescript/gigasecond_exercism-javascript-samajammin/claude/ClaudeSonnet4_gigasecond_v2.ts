export default class Gigasecond {
  private readonly gigasecondMs = 1000000000000; // Pre-calculated 10^12
  private readonly futureTime: number;

  constructor(initDate: Date) {
    this.futureTime = initDate.getTime() + this.gigasecondMs;
  }

  date(): Date {
    return new Date(this.futureTime);
  }
}