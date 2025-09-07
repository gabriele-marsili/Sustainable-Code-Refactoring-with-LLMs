export default class Gigasecond {
  private readonly initTime: number;
  private static readonly GIGASECOND = 1_000_000_000_000;

  constructor(initDate: Date) {
    this.initTime = initDate.getTime();
  }

  date(): Date {
    return new Date(this.initTime + Gigasecond.GIGASECOND);
  }
}