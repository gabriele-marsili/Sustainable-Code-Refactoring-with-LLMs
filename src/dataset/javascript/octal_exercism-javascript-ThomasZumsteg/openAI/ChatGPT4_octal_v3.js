class Octal {
  constructor(oct) {
    this.oct = oct;
  }

  toDecimal() {
    if (/[^0-7]/.test(this.oct)) return 0;
    return [...this.oct].reduce((total, elem, i, arr) => 
      total + elem * 8 ** (arr.length - 1 - i), 0);
  }
}

export default Octal;