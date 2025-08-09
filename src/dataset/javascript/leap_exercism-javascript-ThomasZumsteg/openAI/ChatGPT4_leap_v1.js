class Year {
  constructor(year) {
    this.year = year;
  }

  isLeap() {
    const y = this.year;
    return (y & 3) === 0 && (y % 100 !== 0 || y % 400 === 0);
  }
}

export default Year;