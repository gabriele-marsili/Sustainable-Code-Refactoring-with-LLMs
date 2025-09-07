export default class Gigasecond {
  private readonly gigasecondMs = 1000000000000;
  private readonly resultDate: Date;

  constructor(initDate: Date) {
    this.resultDate = new Date(initDate.getTime() + this.gigasecondMs);
  }

  date(): Date {
    return new Date(this.resultDate.getTime());
  }
}