class Binary {
  constructor(string) {
    this.number = string;
  }

  toDecimal() {
    if (!/^[01]+$/.test(this.number)) return 0;

    return [...this.number].reduce((decimal, digit, index) => 
      decimal + Number(digit) * (1 << (this.number.length - 1 - index)), 0
    );
  }
}

export default Binary;