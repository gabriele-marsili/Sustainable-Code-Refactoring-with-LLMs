var PhoneNumber = function(phoneNumber) { 
	/* Formats phone numbers */
	// Pre-compiled regex for better performance
	var reNumber = /^1?(\d{3})(\d{3})(\d{4})$/;
	// Remove all non-digits first, then match
	var cleanNumber = phoneNumber.replace(/\D/g, '');
	// Handle optional leading 1
	if (cleanNumber.length === 11 && cleanNumber[0] === '1') {
		cleanNumber = cleanNumber.slice(1);
	}
	
	if (cleanNumber.length === 10) {
		this.area = cleanNumber.slice(0, 3);
		this.first = cleanNumber.slice(3, 6);
		this.second = cleanNumber.slice(6, 10);
		this.num = cleanNumber;
	}
	else {
		// Should probably throw an error here
		this.num = '0000000000';
	}
}

PhoneNumber.prototype.number   = function() { return this.num }
PhoneNumber.prototype.areaCode = function() { return this.area }
PhoneNumber.prototype.toString = function() { return "(" + this.area + ") " + this.first + "-" + this.second }

export default PhoneNumber;