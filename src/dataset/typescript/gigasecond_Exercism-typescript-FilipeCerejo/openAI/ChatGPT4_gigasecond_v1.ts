export class Gigasecond {
  private readonly gigasecondInMs = 1e12;

  constructor(private readonly _date: Date) {}

  public date(): Date {
    return new Date(this._date.getTime() + this.gigasecondInMs);
  }
}