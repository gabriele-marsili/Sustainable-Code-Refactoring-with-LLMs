var PhoneNumber = function(phone) {
  this.phone = phone;
}

PhoneNumber.prototype.number = function() {
  var phone = this.phone;

  // Return early if number contains unacceptable characters
  for (var i = 0; i < phone.length; i++) {
    var char = phone[i];
    if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || 
        char === '!' || char === '?' || char === '@' || char === '"' || char === "'") {
      console.log("Returning null, phone number cannot contain letters or unacceptable characters.");
      return null;
    }
  }

  // Remove acceptable characters before validating number
  var candidate = '';
  for (var i = 0; i < phone.length; i++) {
    var char = phone[i];
    if (char >= '0' && char <= '9') {
      candidate += char;
    }
  }

  // Validate number against pre-defined ruleset
  candidate = this.validate(candidate);

  return candidate;
}

PhoneNumber.prototype.validate = function(phone) {
  // Remove the leading country code if it's there
  if (phone[0] === '1') {
    phone = phone.substring(1);
  }

  // Verify that the phone number is 10 digits long
  if (phone.length !== 10) {
    console.log("Formatted phone number is " + phone.length + " digits long.");
    return null;
  }

  var firstDigit = phone[0];
  var fourthDigit = phone[3];

  // Verify that the phone number has a good area code
  if (firstDigit < '2' || firstDigit > '9') {
    console.log("Area code is invalid. Area codes must begin with a digit between 2 and 9");
    return null;
  }

  // Verify that the phone number has a good exchange code
  if (fourthDigit < '2' || fourthDigit > '9') {
    console.log("Exchange code is invalid. Exchange codes must begin with a digit between 2 and 9.");
    return null;
  }

  return phone;
}

export default PhoneNumber;