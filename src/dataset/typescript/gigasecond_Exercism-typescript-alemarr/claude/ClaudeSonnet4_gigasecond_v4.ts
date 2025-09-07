const GIGASECONDS_MILLISECONDS = 1000000000000;

export class Gigasecond {
  constructor(private readonly initialDate: Date) {}

  public date(): Date {
    return new Date(this.initialDate.getTime() + GIGASECONDS_MILLISECONDS);
  }
}