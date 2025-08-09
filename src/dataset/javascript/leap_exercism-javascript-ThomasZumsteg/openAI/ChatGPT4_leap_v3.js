class Year {
  constructor(year) {
    this.year = year;
  }

  isLeap() {
    const y = this.year;
    return (y & 3) === 0 && ((y % 25 !== 0) || (y % 16 === 0));
  }
}

export default Year;