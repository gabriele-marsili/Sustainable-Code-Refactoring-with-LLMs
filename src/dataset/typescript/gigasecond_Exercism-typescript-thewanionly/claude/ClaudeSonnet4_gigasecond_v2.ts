const GIGASECOND_MS = 1000000000000

export class Gigasecond {
  private readonly futureTime: number

  constructor(moment: Date) {
    this.futureTime = moment.getTime() + GIGASECOND_MS
  }

  public date(): Date {
    return new Date(this.futureTime)
  }
}