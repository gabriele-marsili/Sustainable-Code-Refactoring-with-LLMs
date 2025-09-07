export class Gigasecond {
  private readonly _timestamp: number;
  private static readonly GIGASECOND_MS = 1000000000000;
    
  constructor(date: Date) {
    this._timestamp = date.getTime();
  }
  
  public date(): Date {
    return new Date(this._timestamp + Gigasecond.GIGASECOND_MS);
  }
}