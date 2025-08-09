class Year {
  constructor(year) {
    this.year = year;
  }

  isLeap() {
    const year = this.year;
    return (year & 3) === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
}

export default Year;