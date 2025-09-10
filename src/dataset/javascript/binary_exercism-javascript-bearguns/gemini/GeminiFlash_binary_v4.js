class Binary {
  constructor(string) {
    this.number = string;
  }

  toDecimal() {
    let numberAsDecimal = 0;
    const number = this.number;
    const length = number.length;

    for (let i = 0; i < length; i++) {
      const currentDigit = number.charCodeAt(i) - 48;

      if (currentDigit !== 0 && currentDigit !== 1) {
        return 0;
      }

      numberAsDecimal = (numberAsDecimal << 1) | currentDigit;
    }

    return numberAsDecimal;
  }
}

export default Binary;