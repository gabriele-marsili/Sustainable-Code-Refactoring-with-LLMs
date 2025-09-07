export default class Gigasecond {
  private readonly initDateMilliseconds: number;

  constructor(initDate: Date) {
    this.initDateMilliseconds = initDate.getTime();
  }

  date(): Date {
    return new Date(this.initDateMilliseconds + 1000000000000);
  }
}