export default class Gigasecond {
  private readonly initTimeMs: number;

  constructor(initDate: Date) {
    this.initTimeMs = initDate.getTime();
  }

  date(): Date {
    return new Date(this.initTimeMs + 1000000000000);
  }
}