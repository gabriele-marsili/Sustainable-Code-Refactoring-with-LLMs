export class Gigasecond {
  private readonly _gigasecondTime: number;
    
  constructor(date: Date) {
    this._gigasecondTime = date.getTime() + 1000000000000;
  }
  
  public date(): Date {
    return new Date(this._gigasecondTime);
  }
}