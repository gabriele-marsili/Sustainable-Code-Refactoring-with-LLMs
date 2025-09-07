const GIGASECOND_MS = 1_000_000_000_000

class Gigasecond {
  private readonly resultDate: Date

  constructor(input: Date) {
    this.resultDate = new Date(input.getTime() + GIGASECOND_MS)
  }

  date(): Date {
    return this.resultDate
  }
}

export default Gigasecond