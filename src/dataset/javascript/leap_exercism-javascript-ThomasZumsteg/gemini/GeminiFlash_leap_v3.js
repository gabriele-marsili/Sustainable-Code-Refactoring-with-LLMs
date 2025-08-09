class Year {
  constructor(year) {
    this.year = year;
  }

  isLeap() {
    // The Gregorian calendar leap year rule is already an optimal mathematical expression.
    // No further algorithmic optimization is typically possible or beneficial for CPU/energy
    // given its simplicity.
    return (this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0));
  }
}

export default Year;