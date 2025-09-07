export class Gigasecond {
  private static readonly GIGASECOND_MS = 1000000000000;
  private readonly _timestamp: number;
    
  constructor(date: Date) {
    this._timestamp = date.getTime();
  }
  
  public date(): Date {
    return new Date(this._timestamp + Gigasecond.GIGASECOND_MS);
  }
}