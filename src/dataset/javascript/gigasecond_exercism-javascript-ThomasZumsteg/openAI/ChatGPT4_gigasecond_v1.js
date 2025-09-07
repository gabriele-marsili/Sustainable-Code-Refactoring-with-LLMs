const GIGASECOND = 1e12;

class Gigasecond {
  constructor(day) {
    this.day = day;
  }

  date() {
    return new Date(this.day.getTime() + GIGASECOND);
  }
}

export default Gigasecond;