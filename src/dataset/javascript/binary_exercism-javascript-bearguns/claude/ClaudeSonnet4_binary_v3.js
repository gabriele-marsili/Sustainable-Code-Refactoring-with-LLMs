class Binary {
  constructor(string) {
    this.number = string;
  }

  toDecimal() {
    if (!/^[01]*$/.test(this.number)) {
      return 0;
    }
    
    return parseInt(this.number, 2);
  }
}

export default Binary;