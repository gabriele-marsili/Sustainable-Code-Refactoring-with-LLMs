const GIGASECOND_MS = 1_000_000_000_000

class Gigasecond {
  private readonly futureTime: number

  constructor(input: Date) {
    this.futureTime = input.getTime() + GIGASECOND_MS
  }

  date(): Date {
    return new Date(this.futureTime)
  }
}

export default Gigasecond