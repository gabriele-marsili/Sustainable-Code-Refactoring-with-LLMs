export default class Gigasecond {
  private static readonly GIGASECOND_MS = 1e12;
  private readonly initTime: number;

  constructor(initDate: Date) {
    this.initTime = initDate.getTime();
  }

  date(): Date {
    return new Date(this.initTime + Gigasecond.GIGASECOND_MS);
  }
}