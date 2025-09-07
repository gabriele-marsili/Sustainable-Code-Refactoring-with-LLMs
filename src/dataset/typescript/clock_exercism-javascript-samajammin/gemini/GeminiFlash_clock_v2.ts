export default class Clock {
  private static MINUTES_PER_HOUR = 60;
  private static MINUTES_PER_DAY = Clock.MINUTES_PER_HOUR * 24;
  private totalMinutes: number;

  constructor(hours: number, minutes: number = 0) {
    this.totalMinutes = (minutes + hours * Clock.MINUTES_PER_HOUR) % Clock.MINUTES_PER_DAY;
    if (this.totalMinutes < 0) {
      this.totalMinutes += Clock.MINUTES_PER_DAY;
    }
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  public toString(): string {
    let hours = Math.floor(this.totalMinutes / Clock.MINUTES_PER_HOUR);
    let minutes = this.totalMinutes % Clock.MINUTES_PER_HOUR;

    hours = hours % 24;
    if (hours < 0) {
      hours += 24;
    }
    if (minutes < 0) {
      minutes += 60;
    }
    minutes = minutes % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}`;
  }

  public plus(minutes: number): Clock {
    this.totalMinutes = (this.totalMinutes + minutes) % Clock.MINUTES_PER_DAY;
    if (this.totalMinutes < 0) {
      this.totalMinutes += Clock.MINUTES_PER_DAY;
    }
    return this;
  }

  public minus(minutes: number): Clock {
    this.totalMinutes = (this.totalMinutes - minutes) % Clock.MINUTES_PER_DAY;
     if (this.totalMinutes < 0) {
      this.totalMinutes += Clock.MINUTES_PER_DAY;
    }
    return this;
  }

  public equals(that: Clock): boolean {
    return this.totalMinutes === that.totalMinutes;
  }
}