var PhoneNumber = function (phone) {
  this.phone = phone;
};

PhoneNumber.prototype.number = function () {
  const notAllowed = /[a-zA-Z!?@"']/;
  if (notAllowed.test(this.phone)) {
    console.log("Returning null, phone number cannot contain letters or unacceptable characters.");
    return null;
  }

  const candidate = this.phone.replace(/[\+\.\-\s\(\)]/g, '');
  return this.validate(candidate);
};

PhoneNumber.prototype.validate = function (phone) {
  if (phone.startsWith('1')) phone = phone.slice(1);

  if (phone.length !== 10) {
    console.log(`Formatted phone number is ${phone.length} digits long.`);
    return null;
  }

  if (!/[2-9]/.test(phone[0])) {
    console.log("Area code is invalid. Area codes must begin with a digit between 2 and 9");
    return null;
  }

  if (!/[2-9]/.test(phone[3])) {
    console.log("Exchange code is invalid. Exchange codes must begin with a digit between 2 and 9.");
    return null;
  }

  return phone;
};

export default PhoneNumber;