var PhoneNumber = function(phone) {
  this.phone = phone;
}

PhoneNumber.prototype.number = function() {
  let candidate = this.phone.replace(/[\s().+-]/g, '');

  if (/[a-zA-Z!\?@"\']/.test(candidate)) {
    return null;
  }

  if (candidate.length === 11 && candidate[0] === '1') {
    candidate = candidate.slice(1);
  }

  if (candidate.length !== 10 || !/[2-9]/.test(candidate[0]) || !/[2-9]/.test(candidate[3])) {
    return null;
  }

  return candidate;
}

export default PhoneNumber;