export default class Gigasecond {
  private readonly gigasecondTimestamp: number;

  constructor(initDate: Date) {
    this.gigasecondTimestamp = initDate.getTime() + 1000000000000;
  }

  date(): Date {
    return new Date(this.gigasecondTimestamp);
  }
}