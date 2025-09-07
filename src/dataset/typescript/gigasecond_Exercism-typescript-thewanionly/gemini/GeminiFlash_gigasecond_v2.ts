const GIGASECOND_IN_MS = 10 ** 12;

export class Gigasecond {
  private readonly birthTimeMs: number;

  constructor(moment: Date) {
    this.birthTimeMs = moment.getTime();
  }

  public date(): Date {
    return new Date(this.birthTimeMs + GIGASECOND_IN_MS);
  }
}