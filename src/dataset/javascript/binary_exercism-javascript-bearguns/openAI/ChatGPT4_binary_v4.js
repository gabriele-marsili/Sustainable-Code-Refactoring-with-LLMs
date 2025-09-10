class Binary {
  constructor(string) {
    this.number = string;
  }

  toDecimal() {
    if (!/^[01]+$/.test(this.number)) return 0;
    return [...this.number].reduce((decimal, digit) => (decimal << 1) | Number(digit), 0);
  }
}

export default Binary;