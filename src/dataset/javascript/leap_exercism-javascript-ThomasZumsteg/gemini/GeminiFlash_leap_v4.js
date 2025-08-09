class Year {
  constructor(year) {
    this.year = year;
  }

  isLeap() { 
    // Test if year is a leap year based on the standard Gregorian calendar rules.
    // A year is a leap year if it is divisible by 4, 
    // unless it is divisible by 100 but not by 400.
    return (this.year % 4 === 0) && (this.year % 100 !== 0 || this.year % 400 === 0);
  }
}

export default Year;