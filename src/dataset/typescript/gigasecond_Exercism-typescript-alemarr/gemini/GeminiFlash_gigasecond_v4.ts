const GIGASECONDS_SECONDS = 1000000000;

export class Gigasecond {
  private readonly initialTime: number;

  constructor(initialDate: Date) {
    this.initialTime = initialDate.getTime();
  }

  public date(): Date {
    return new Date(this.initialTime + GIGASECONDS_SECONDS * 1000);
  }
}