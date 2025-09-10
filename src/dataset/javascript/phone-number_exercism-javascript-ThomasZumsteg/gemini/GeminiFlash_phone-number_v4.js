var PhoneNumber = function(phoneNumber) {
    let cleanedNumber = phoneNumber.replace(/\D/g, '');

    if (cleanedNumber.length === 11 && cleanedNumber[0] === '1') {
        cleanedNumber = cleanedNumber.slice(1);
    }

    if (cleanedNumber.length !== 10 || !/^[2-9]\d{2}[2-9]\d{6}$/.test(cleanedNumber)) {
        this.numberString = '0000000000';
        return;
    }

    this.numberString = cleanedNumber;
};

PhoneNumber.prototype.number = function() {
    return this.numberString;
};

PhoneNumber.prototype.areaCode = function() {
    return this.numberString.slice(0, 3);
};

PhoneNumber.prototype.toString = function() {
    const areaCode = this.numberString.slice(0, 3);
    const prefix = this.numberString.slice(3, 6);
    const lineNumber = this.numberString.slice(6, 10);
    return `(${areaCode}) ${prefix}-${lineNumber}`;
};

export default PhoneNumber;