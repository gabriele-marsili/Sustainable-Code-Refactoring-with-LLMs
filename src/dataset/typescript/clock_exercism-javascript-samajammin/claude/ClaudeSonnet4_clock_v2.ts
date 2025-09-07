export default class Clock {
  private static readonly MINUTES_PER_HOUR = 60
  private static readonly MINUTES_PER_DAY = 1440
  private totalMinutes: number

  constructor(hours: number, minutes: number = 0) {
    this.totalMinutes = minutes + hours * 60
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`
  }

  public toString(): string {
    let adjustedMinutes = this.totalMinutes % 1440
    if (adjustedMinutes < 0) {
      adjustedMinutes += 1440
    }

    const hours = Math.floor(adjustedMinutes / 60)
    const minutes = adjustedMinutes % 60
    return `${this.pad(hours)}:${this.pad(minutes)}`
  }

  public plus(minutes: number): Clock {
    this.totalMinutes += minutes
    return this
  }

  public minus(minutes: number): Clock {
    this.totalMinutes -= minutes
    return this
  }

  public equals(that: Clock): boolean {
    let thisAdjusted = this.totalMinutes % 1440
    let thatAdjusted = that.totalMinutes % 1440
    
    if (thisAdjusted < 0) thisAdjusted += 1440
    if (thatAdjusted < 0) thatAdjusted += 1440
    
    return thisAdjusted === thatAdjusted
  }
}