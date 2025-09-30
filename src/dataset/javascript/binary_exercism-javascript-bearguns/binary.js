class Binary {
  constructor(string) {
    this.number = string;
  }

  toDecimal() {
    let numberAsDecimal = 0;
    const length = this.number.length;
    
    for (let i = 0; i < length; i++) {
      const char = this.number[i];
      if (char !== '0' && char !== '1') {
        return 0;
      }
      if (char === '1') {
        numberAsDecimal += 1 << (length - 1 - i);
      }
    }
    
    return numberAsDecimal;
  }
}

export default Binary;