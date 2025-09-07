const GIGASECOND_MS = 1000000000000;

export class Gigasecond {
  private readonly birthTimeMs: number;

  constructor(moment: Date) {
    this.birthTimeMs = moment.getTime();
  }

  public date(): Date {
    return new Date(this.birthTimeMs + GIGASECOND_MS);
  }
}