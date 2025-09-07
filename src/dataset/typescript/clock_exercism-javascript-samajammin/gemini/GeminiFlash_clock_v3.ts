export default class Clock {
  private static MINUTES_PER_HOUR = 60;
  private static MINUTES_PER_DAY = Clock.MINUTES_PER_HOUR * 24;
  private totalMinutes: number;

  constructor(hours: number, minutes: number = 0) {
    this.totalMinutes = (hours * Clock.MINUTES_PER_HOUR + minutes) % Clock.MINUTES_PER_DAY;
    if (this.totalMinutes < 0) {
      this.totalMinutes += Clock.MINUTES_PER_DAY;
    }
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  public toString(): string {
    let adjustedMinutes = this.totalMinutes;
    if (adjustedMinutes < 0) {
      adjustedMinutes = (adjustedMinutes % Clock.MINUTES_PER_DAY + Clock.MINUTES_PER_DAY) % Clock.MINUTES_PER_DAY;
    } else {
      adjustedMinutes = adjustedMinutes % Clock.MINUTES_PER_DAY;
    }

    const hours = Math.floor(adjustedMinutes / Clock.MINUTES_PER_HOUR);
    const minutes = adjustedMinutes % Clock.MINUTES_PER_HOUR;
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