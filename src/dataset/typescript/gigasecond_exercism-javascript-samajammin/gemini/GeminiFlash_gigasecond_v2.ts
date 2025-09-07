export default class Gigasecond {
  private readonly initDateMs: number;
  private static readonly GIGASECOND_MS = 1000000000000;

  constructor(initDate: Date) {
    this.initDateMs = initDate.getTime();
  }

  date(): Date {
    return new Date(this.initDateMs + Gigasecond.GIGASECOND_MS);
  }
}