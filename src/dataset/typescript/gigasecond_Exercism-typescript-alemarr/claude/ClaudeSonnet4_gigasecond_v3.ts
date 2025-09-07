const GIGASECONDS_MILLISECONDS = 1000000000000;

export class Gigasecond {
  private readonly targetTime: number;

  constructor(private readonly initialDate: Date) {
    this.targetTime = this.initialDate.getTime() + GIGASECONDS_MILLISECONDS;
  }

  public date(): Date {
    return new Date(this.targetTime);
  }
}