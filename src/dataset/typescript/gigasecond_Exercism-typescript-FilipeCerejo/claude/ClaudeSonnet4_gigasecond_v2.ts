export class Gigasecond {
  private _timestamp: number;
    
  constructor(date: Date) {
    this._timestamp = date.getTime() + 1000000000000;
  }
  
  public date(): Date {
    return new Date(this._timestamp);
  }
}