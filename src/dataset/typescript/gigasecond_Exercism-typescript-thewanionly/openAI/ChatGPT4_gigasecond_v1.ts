export class Gigasecond {
  private readonly gigasecondInMs = 1e12;

  constructor(private readonly moment: Date) {}

  public date(): Date {
    return new Date(this.moment.getTime() + this.gigasecondInMs);
  }
}