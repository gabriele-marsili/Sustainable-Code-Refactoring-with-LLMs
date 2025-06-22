export class Clock {

  private _minutes: number;
  private _hours: number;
  
  constructor(hour: number, minute?: number) {
    this._hours = hour;
    this._minutes = minute ?? 0;
    this.adjustClock();
  }

  private plusHours(hour: number) {
    this._hours += hour;
    this.adjustClock();
  }

  private adjustClock(): void {
    let hoursFromMinutes = Math.trunc(this._minutes / 60);
    this._hours += hoursFromMinutes;
    
    this._minutes %= 60;
    if(this._minutes < 0) {
      this._hours -= 1
      this._minutes += 60
    }

    this._hours %= 24
    if(this._hours < 0) {
      this._hours += 24
    }
  }

  public toString(): string {
    return `${this._hours.toString().padStart(2, '0')}:${this._minutes.toString().padStart(2, '0')}`
  }

  public plus(minutes: number): Clock {
    this._minutes += minutes;
    this.adjustClock();
    return this;
  }

  public minus(minutes: number): Clock {
    this._minutes -= minutes;
    this.adjustClock();
    return this;
  }

  public equals(other: Clock): boolean {
    return this._hours === other._hours && this._minutes === other._minutes
  }
}
