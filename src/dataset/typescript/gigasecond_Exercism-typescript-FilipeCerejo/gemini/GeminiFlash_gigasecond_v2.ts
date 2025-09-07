export class Gigasecond {

  private _date: Date;
    
  constructor(date: Date) {
    this._date = new Date(date.getTime());
  }
  
  public date(): Date {
    const gigasecondInMs = 1000000000000;
    return new Date(this._date.getTime() + gigasecondInMs);
  }
}