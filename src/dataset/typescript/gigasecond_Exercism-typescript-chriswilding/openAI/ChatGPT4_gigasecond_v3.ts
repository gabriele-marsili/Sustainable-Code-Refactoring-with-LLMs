const GIGASECOND_MS = 1_000_000_000_000;

class Gigasecond {
  constructor(private readonly input: Date) {}

  date(): Date {
    return new Date(this.input.getTime() + GIGASECOND_MS);
  }
}

export default Gigasecond;