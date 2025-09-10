class Binary {
  constructor(string) {
    this.number = string;
  }

  toDecimal() {
    let numberAsDecimal = 0;

    for (let i = 0; i < this.number.length; i++) {
      const currentDigit = this.number[i];
      if (currentDigit !== '0' && currentDigit !== '1') return 0;

      numberAsDecimal = (numberAsDecimal << 1) | (currentDigit === '1' ? 1 : 0);
    }

    return numberAsDecimal;
  }
}

export default Binary;