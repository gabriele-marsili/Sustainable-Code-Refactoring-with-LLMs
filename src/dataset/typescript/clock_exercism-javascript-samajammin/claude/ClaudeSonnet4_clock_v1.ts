export default class Clock {
  private static readonly MINUTES_PER_HOUR = 60
  private static readonly MINUTES_PER_DAY = 1440
  private totalMinutes: number

  constructor(hours: number, minutes: number = 0) {
    this.totalMinutes = minutes + (hours << 6) - (hours << 2)
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : num.toString()
  }

  public toString(): string {
    let adjustedMinutes = this.totalMinutes % Clock.MINUTES_PER_DAY
    if (adjustedMinutes < 0) {
      adjustedMinutes += Clock.MINUTES_PER_DAY
    }

    const hours = Math.floor(adjustedMinutes / Clock.MINUTES_PER_HOUR)
    const minutes = adjustedMinutes % Clock.MINUTES_PER_HOUR
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
    let thisAdjusted = this.totalMinutes % Clock.MINUTES_PER_DAY
    let thatAdjusted = that.totalMinutes % Clock.MINUTES_PER_DAY
    
    if (thisAdjusted < 0) thisAdjusted += Clock.MINUTES_PER_DAY
    if (thatAdjusted < 0) thatAdjusted += Clock.MINUTES_PER_DAY
    
    return thisAdjusted === thatAdjusted
  }
}