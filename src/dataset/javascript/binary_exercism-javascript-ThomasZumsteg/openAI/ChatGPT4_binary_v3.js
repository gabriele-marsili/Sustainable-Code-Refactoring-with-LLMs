class Binary {
  constructor(binString) {
    this.binString = binString;
  }

  toDecimal() {
    if (/[^10]/.test(this.binString)) return 0;

    let decimal = 0;
    for (let i = 0; i < this.binString.length; i++) {
      decimal = decimal * 2 + Number(this.binString[i]);
    }
    return decimal;
  }
}

export default Binary;