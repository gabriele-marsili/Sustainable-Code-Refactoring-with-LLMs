const GIGASECOND = 1000000000000;

class Gigasecond {
  constructor(day) {
    this.dayTime = day.getTime();
  }

  date() {
    return new Date(this.dayTime + GIGASECOND);
  }
}

export default Gigasecond;