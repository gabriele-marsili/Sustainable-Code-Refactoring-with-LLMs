const GIGASECOND = 1_000_000_000;

class Gigasecond {
  private readonly inputTime: number;

  constructor(input: Date) {
    this.inputTime = input.getTime();
  }

  date(): Date {
    return new Date(this.inputTime + GIGASECOND * 1000);
  }
}

export default Gigasecond;