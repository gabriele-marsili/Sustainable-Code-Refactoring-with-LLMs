var PhoneNumber = function(phone) {
  this.phone = phone;
}

PhoneNumber.prototype.number = function() {
  let candidate = this.phone;

  const notAllowedRegex = /[a-zA-Z!\?@"']/g;
  if (notAllowedRegex.test(candidate)) {
    return null;
  }

  const allowedRegex = /[+.\-\s()]/g;
  candidate = candidate.replace(allowedRegex, '');

  return this.validate(candidate);
}

PhoneNumber.prototype.validate = function(phone) {
  if (phone.length === 11 && phone[0] === '1') {
    phone = phone.substring(1);
  }

  if (phone.length !== 10) {
    return null;
  }

  const areaCode = phone[0];
  if (areaCode < '2' || areaCode > '9') {
    return null;
  }

  const exchangeCode = phone[3];
  if (exchangeCode < '2' || exchangeCode > '9') {
    return null;
  }

  return phone;
}

export default PhoneNumber;