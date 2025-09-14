class PhoneNumber {
  constructor(phone) {
    this.phone = phone;
  }

  number() {
    const notallowed = /[a-zA-Z!?@"']/;
    if (notallowed.test(this.phone)) {
      console.log("Returning null, phone number cannot contain letters or unacceptable characters.");
      return null;
    }

    const candidate = this.phone.replace(/[+.\-\s()]/g, '');
    return this.validate(candidate);
  }

  validate(phone) {
    const cleanPhone = phone.charAt(0) === '1' ? phone.substring(1) : phone;

    if (cleanPhone.length !== 10) {
      console.log("Formatted phone number is " + cleanPhone.length + " digits long.");
      return null;
    }

    const areaCode = cleanPhone.charAt(0);
    if (areaCode < '2' || areaCode > '9') {
      console.log("Area code is invalid. Area codes must begin with a digit between 2 and 9");
      return null;
    }

    const exchangeCode = cleanPhone.charAt(3);
    if (exchangeCode < '2' || exchangeCode > '9') {
      console.log("Exchange code is invalid. Exchange codes must begin with a digit between 2 and 9.");
      return null;
    }

    return cleanPhone;
  }
}

export default PhoneNumber;