/* Octal number class */
class Octal {
  constructor(oct) {
    this.oct = oct;
  }

  toDecimal() {
    /* Converts octal to decimal */
    if (/[^0-7]/.test(this.oct)) return 0;
    return [...this.oct].reduce((total, elem, i) => 
      total * 8 + Number(elem), 0);
  }
}

export default Octal;