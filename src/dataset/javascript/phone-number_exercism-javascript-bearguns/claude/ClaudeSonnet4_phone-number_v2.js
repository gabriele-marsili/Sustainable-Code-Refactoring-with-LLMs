var PhoneNumber = function(phone) {
  this.phone = phone;
}

PhoneNumber.prototype.number = function() {
  var phone = this.phone;
  
  // Check for unacceptable characters and clean in one pass
  var cleaned = '';
  for (var i = 0; i < phone.length; i++) {
    var char = phone[i];
    if (/[a-zA-Z!\?@\"\']/g.test(char)) {
      return null;
    }
    if (!/[\+\.-\s\(\)]/g.test(char)) {
      cleaned += char;
    }
  }

  return this.validate(cleaned);
}

PhoneNumber.prototype.validate = function(phone) {
  // Remove leading country code if present
  if (phone[0] === '1') {
    phone = phone.substring(1);
  }

  // Check length
  if (phone.length !== 10) {
    return null;
  }

  // Check area code and exchange code
  var areaCode = phone[0];
  var exchangeCode = phone[3];
  
  if (areaCode < '2' || areaCode > '9' || exchangeCode < '2' || exchangeCode > '9') {
    return null;
  }

  return phone;
}

export default PhoneNumber;