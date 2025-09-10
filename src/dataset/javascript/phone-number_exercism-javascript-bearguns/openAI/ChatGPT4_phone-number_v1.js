class PhoneNumber {
  constructor(phone) {
    this.phone = phone;
  }

  number() {
    // Return early if number contains unacceptable characters
    if (/[a-zA-Z!\?@\"\']/.test(this.phone)) {
      console.log("Returning null, phone number cannot contain letters or unacceptable characters.");
      return null;
    }

    // Remove acceptable characters before validating number
    const candidate = this.validate(this.phone.replace(/[\+\.-\s\(\)]/g, ''));

    return candidate;
  }

  validate(phone) {
    // Remove the leading country code if it's there
    if (phone.startsWith('1')) phone = phone.slice(1);

    // Verify that the phone number is 10 digits long
    if (phone.length !== 10) {
      console.log(`Formatted phone number is ${phone.length} digits long.`);
      return null;
    }

    // Verify that the phone number has a good area code and exchange code
    if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(phone)) {
      console.log("Invalid phone number. Area codes and exchange codes must begin with a digit between 2 and 9.");
      return null;
    }

    return phone;
  }
}

export default PhoneNumber;