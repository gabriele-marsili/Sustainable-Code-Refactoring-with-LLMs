const GIGASECOND_MS = 1000000000000

export class Gigasecond {
  private readonly milliseconds: number

  constructor(moment: Date) {
    this.milliseconds = moment.getTime()
  }

  public date(): Date {
    return new Date(this.milliseconds + GIGASECOND_MS)
  }
}