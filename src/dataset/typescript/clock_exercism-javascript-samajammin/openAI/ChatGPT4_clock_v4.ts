export default class Clock {
  private static readonly MINUTES_PER_HOUR = 60;
  private static readonly MINUTES_PER_DAY = 1440; // 60 * 24
  private totalMinutes: number;

  constructor(hours: number, minutes: number = 0) {
    this.totalMinutes = ((hours * Clock.MINUTES_PER_HOUR + minutes) % Clock.MINUTES_PER_DAY + Clock.MINUTES_PER_DAY) % Clock.MINUTES_PER_DAY;
  }

  private static pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  public toString(): string {
    const hours = Math.floor(this.totalMinutes / Clock.MINUTES_PER_HOUR);
    const minutes = this.totalMinutes % Clock.MINUTES_PER_HOUR;
    return `${Clock.pad(hours)}:${Clock.pad(minutes)}`;
  }

  public plus(minutes: number): Clock {
    this.totalMinutes = (this.totalMinutes + minutes + Clock.MINUTES_PER_DAY) % Clock.MINUTES_PER_DAY;
    return this;
  }

  public minus(minutes: number): Clock {
    this.totalMinutes = (this.totalMinutes - minutes + Clock.MINUTES_PER_DAY) % Clock.MINUTES_PER_DAY;
    return this;
  }

  public equals(that: Clock): boolean {
    return this.totalMinutes === that.totalMinutes;
  }
}