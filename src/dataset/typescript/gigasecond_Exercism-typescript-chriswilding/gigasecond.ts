const GIGASECOND = 1_000_000_000

class Gigasecond {
  input: Date

  constructor(input: Date) {
    this.input = input
  }

  date(): Date {
    return new Date(this.input.getTime() + GIGASECOND * 1000)
  }
}

export default Gigasecond
