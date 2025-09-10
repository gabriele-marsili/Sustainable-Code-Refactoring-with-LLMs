class Binary {
  constructor(string) {
    this.number = string;
  }

  toDecimal() {
    let numberAsDecimal = 0;
    for (let i = 0; i < this.number.length; i++) {
      const currentDigit = this.number.charCodeAt(i) - '0'.charCodeAt(0);

      if (currentDigit !== 0 && currentDigit !== 1) {
        return 0;
      }

      numberAsDecimal = (numberAsDecimal * 2) + currentDigit;
    }

    return numberAsDecimal;
  }
}

export default Binary;