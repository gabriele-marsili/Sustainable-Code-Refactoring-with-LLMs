export default class Gigasecond {
  private readonly gigasecondInMs = 1e12;
  private readonly resultDate: Date;

  constructor(initDate: Date) {
    this.resultDate = new Date(initDate.getTime() + this.gigasecondInMs);
  }

  date(): Date {
    return this.resultDate;
  }
}