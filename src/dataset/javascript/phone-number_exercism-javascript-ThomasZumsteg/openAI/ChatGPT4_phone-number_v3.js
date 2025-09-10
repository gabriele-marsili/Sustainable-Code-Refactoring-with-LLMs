class PhoneNumber {
  constructor(phoneNumber) {
    const reNumber = /^1?\D*(\d{3})\D*(\d{3})\D*(\d{4})$/;
    const match = phoneNumber.match(reNumber);
    if (match) {
      this.area = match[1];
      this.first = match[2];
      this.second = match[3];
      this.num = `${this.area}${this.first}${this.second}`;
    } else {
      this.area = this.first = this.second = '000';
      this.num = '0000000000';
    }
  }

  number() {
    return this.num;
  }

  areaCode() {
    return this.area;
  }

  toString() {
    return `(${this.area}) ${this.first}-${this.second}`;
  }
}

export default PhoneNumber;