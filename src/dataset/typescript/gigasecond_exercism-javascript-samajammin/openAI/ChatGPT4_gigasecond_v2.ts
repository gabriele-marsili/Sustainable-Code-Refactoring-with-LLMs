export default class Gigasecond {
  private readonly gigasecondInMs = 1e12;

  constructor(private readonly initDate: Date) {}

  date(): Date {
    return new Date(this.initDate.getTime() + this.gigasecondInMs);
  }
}