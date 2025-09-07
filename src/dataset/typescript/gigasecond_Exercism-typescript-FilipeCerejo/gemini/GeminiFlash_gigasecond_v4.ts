export class Gigasecond {

  private _date: Date;
  private static readonly GIGASECOND_MS = 1000000000000;

  constructor(date: Date) {
    this._date = new Date(date.getTime());
  }

  public date(): Date {
    return new Date(this._date.getTime() + Gigasecond.GIGASECOND_MS);
  }
}