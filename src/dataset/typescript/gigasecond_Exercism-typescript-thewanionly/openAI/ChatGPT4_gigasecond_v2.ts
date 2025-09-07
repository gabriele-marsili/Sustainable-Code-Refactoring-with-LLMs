const GIGASECOND_IN_MS = 1e12; // Precomputed gigasecond in milliseconds

export class Gigasecond {
  private readonly targetDate: Date;

  constructor(moment: Date) {
    this.targetDate = new Date(moment.getTime() + GIGASECOND_IN_MS);
  }

  public date(): Date {
    return this.targetDate;
  }
}