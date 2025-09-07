const GIGASECOND_MILLISECONDS = 1_000_000_000_000;

export class Gigasecond {
  private readonly milliseconds: number;

  constructor(moment: Date) {
    this.milliseconds = moment.getTime();
  }

  public date(): Date {
    return new Date(this.milliseconds + GIGASECOND_MILLISECONDS);
  }
}