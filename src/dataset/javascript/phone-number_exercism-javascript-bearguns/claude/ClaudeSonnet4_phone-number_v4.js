var PhoneNumber = function(phone) {
  this.phone = phone;
}

PhoneNumber.prototype.number = function() {
  var phone = this.phone;
  
  if (/[a-zA-Z!\?@\"\']/g.test(phone)) {
    console.log("Returning null, phone number cannot contain letters or unacceptable characters.");
    return null;
  }

  var candidate = phone.replace(/[\+\.-\s\(\)]/g, '');
  
  if (candidate.charAt(0) === '1') {
    candidate = candidate.substring(1);
  }

  if (candidate.length !== 10) {
    console.log("Formatted phone number is " + candidate.length + " digits long.");
    return null;
  }

  var firstDigit = candidate.charAt(0);
  if (firstDigit < '2' || firstDigit > '9') {
    console.log("Area code is invalid. Area codes must begin with a digit between 2 and 9");
    return null;
  }

  var fourthDigit = candidate.charAt(3);
  if (fourthDigit < '2' || fourthDigit > '9') {
    console.log("Exchange code is invalid. Exchange codes must begin with a digit between 2 and 9.");
    return null;
  }

  return candidate;
}

PhoneNumber.prototype.validate = function(phone) {
  var cleanPhone = phone.charAt(0) === '1' ? phone.substring(1) : phone;

  if (cleanPhone.length !== 10) {
    console.log("Formatted phone number is " + cleanPhone.length + " digits long.");
    return null;
  }

  var firstDigit = cleanPhone.charAt(0);
  if (firstDigit < '2' || firstDigit > '9') {
    console.log("Area code is invalid. Area codes must begin with a digit between 2 and 9");
    return null;
  }

  var fourthDigit = cleanPhone.charAt(3);
  if (fourthDigit < '2' || fourthDigit > '9') {
    console.log("Exchange code is invalid. Exchange codes must begin with a digit between 2 and 9.");
    return null;
  }

  return cleanPhone;
}

export default PhoneNumber;