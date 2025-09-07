export default class Clock {
  private static readonly MINUTES_PER_HOUR = 60
  private static readonly MINUTES_PER_DAY = 1440
  private totalMinutes: number

  constructor(hours: number, minutes: number = 0) {
    this.totalMinutes = this.normalizeMinutes(minutes + hours * Clock.MINUTES_PER_HOUR)
  }

  private normalizeMinutes(minutes: number): number {
    const result = minutes % Clock.MINUTES_PER_DAY
    return result < 0 ? result + Clock.MINUTES_PER_DAY : result
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`
  }

  public toString(): string {
    const hours = Math.floor(this.totalMinutes / Clock.MINUTES_PER_HOUR)
    const minutes = this.totalMinutes % Clock.MINUTES_PER_HOUR
    return `${this.pad(hours)}:${this.pad(minutes)}`
  }

  public plus(minutes: number): Clock {
    this.totalMinutes = this.normalizeMinutes(this.totalMinutes + minutes)
    return this
  }

  public minus(minutes: number): Clock {
    this.totalMinutes = this.normalizeMinutes(this.totalMinutes - minutes)
    return this
  }

  public equals(that: Clock): boolean {
    return this.totalMinutes === that.totalMinutes
  }
}