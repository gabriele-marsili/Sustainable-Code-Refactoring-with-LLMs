export class Gigasecond {
  private readonly gigasecondDate: Date;

  constructor(date: Date) {
    this.gigasecondDate = new Date(date.getTime() + 1e12);
  }

  public date(): Date {
    return new Date(this.gigasecondDate);
  }
}