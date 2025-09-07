const GIGASECONDS_MILLISECONDS = 1000000000000;

export class Gigasecond {
  private readonly resultDate: Date;

  constructor(initialDate: Date) {
    this.resultDate = new Date(initialDate.getTime() + GIGASECONDS_MILLISECONDS);
  }

  public date(): Date {
    return new Date(this.resultDate);
  }
}