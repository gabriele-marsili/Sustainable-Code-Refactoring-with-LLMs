var PhoneNumber = function(phone) {
  this.phone = phone;
}

PhoneNumber.prototype.number = function() {
  let candidate = this.phone;

  // Early return for invalid characters
  if (/[a-zA-Z!\?@"']/.test(candidate)) {
    return null;
  }

  // Remove non-digit characters
  candidate = candidate.replace(/[\s+().-]/g, '');

  return this.validate(candidate);
}

PhoneNumber.prototype.validate = function(phone) {
  let len = phone.length;

  // Remove leading 1 if present and adjust length
  if (phone[0] === '1') {
    phone = phone.substring(1);
    len--;
  }

  // Check length immediately
  if (len !== 10) {
    return null;
  }

  // Validate area code and exchange code efficiently
  if (phone[0] < '2' || phone[0] > '9' || phone[3] < '2' || phone[3] > '9') {
    return null;
  }

  return phone;
}

export default PhoneNumber;