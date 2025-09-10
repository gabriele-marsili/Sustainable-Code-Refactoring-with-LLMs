var PhoneNumber = function(phoneNumber) {
    let cleanedNumber = phoneNumber.replace(/\D/g, '');

    if (cleanedNumber.length === 11 && cleanedNumber[0] === '1') {
        cleanedNumber = cleanedNumber.slice(1);
    }

    if (cleanedNumber.length !== 10 || !/^[2-9]\d{2}[2-9]\d{6}$/.test(cleanedNumber)) {
        this.numberString = '0000000000';
        return;
    }

    this.areaCodeString = cleanedNumber.substring(0, 3);
    this.firstPart = cleanedNumber.substring(3, 6);
    this.secondPart = cleanedNumber.substring(6, 10);
    this.numberString = cleanedNumber;
};

PhoneNumber.prototype.number = function() {
    return this.numberString;
};

PhoneNumber.prototype.areaCode = function() {
    return this.areaCodeString;
};

PhoneNumber.prototype.toString = function() {
    return `(${this.areaCodeString}) ${this.firstPart}-${this.secondPart}`;
};

export default PhoneNumber;