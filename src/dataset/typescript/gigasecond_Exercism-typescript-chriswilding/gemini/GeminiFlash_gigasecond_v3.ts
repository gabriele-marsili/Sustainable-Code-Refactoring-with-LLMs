const GIGASECOND_MS = 1_000_000_000_000;

class Gigasecond {
  private readonly timestamp: number;

  constructor(input: Date) {
    this.timestamp = input.getTime();
  }

  date(): Date {
    return new Date(this.timestamp + GIGASECOND_MS);
  }
}

export default Gigasecond