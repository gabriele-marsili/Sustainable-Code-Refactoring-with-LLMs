const GIGASECONDS_MILLISECONDS = 10**12;

export class Gigasecond {
  private readonly initialTime: number;

  constructor(initialDate: Date) {
    this.initialTime = initialDate.getTime();
  }

  public date(): Date {
    return new Date(this.initialTime + GIGASECONDS_MILLISECONDS);
  }
}