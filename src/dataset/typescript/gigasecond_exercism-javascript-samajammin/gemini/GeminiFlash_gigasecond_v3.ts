export default class Gigasecond {
  private readonly initDate: Date;
  private static readonly GIGASECOND_MS = 1000000000000;

  constructor(initDate: Date) {
    this.initDate = initDate;
  }

  date(): Date {
    return new Date(this.initDate.getTime() + Gigasecond.GIGASECOND_MS);
  }
}