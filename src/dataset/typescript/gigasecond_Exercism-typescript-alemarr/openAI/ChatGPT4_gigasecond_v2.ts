const GIGASECONDS_MILLISECONDS = 1e12;

export class Gigasecond {
  constructor(private readonly initialDate: Date) {}

  public date(): Date {
    return new Date(this.initialDate.getTime() + GIGASECONDS_MILLISECONDS);
  }
}