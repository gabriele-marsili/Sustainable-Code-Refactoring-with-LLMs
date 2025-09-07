class Gigasecond {
  constructor(date) {
    this.start = date;
  }

  date() {
    return new Date(this.start.getTime() + 1e12);
  }
}

export default Gigasecond;