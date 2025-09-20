const GIGASECOND_MS = 1_000_000_000_000;

class Gigasecond {
  private readonly birthTimeMs: number;

  constructor(birthDate: Date) {
    this.birthTimeMs = birthDate.getTime();
  }

  date(): Date {
    return new Date(this.birthTimeMs + GIGASECOND_MS);
  }
}

export default Gigasecond