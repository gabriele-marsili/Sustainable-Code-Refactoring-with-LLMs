const GIGASECOND_IN_MS = 1_000_000_000_000;

class Gigasecond {
  constructor(private readonly input: Date) {}

  date(): Date {
    return new Date(this.input.getTime() + GIGASECOND_IN_MS);
  }
}

export default Gigasecond;