export class Gigasecond {

  private _dateMs: number;
    
  constructor(date: Date) {
    this._dateMs = date.getTime();
  }
  
  public date(): Date {
    return new Date(this._dateMs + 1000000000000);
  }
}