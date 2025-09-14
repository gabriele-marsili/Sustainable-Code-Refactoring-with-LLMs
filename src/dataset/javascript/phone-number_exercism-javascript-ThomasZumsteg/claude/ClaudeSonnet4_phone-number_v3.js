import { format as sprintf } from 'util';

const PHONE_REGEX = /^1?(\d{3})\D*(\d{3})\D*(\d{4})$/;
const DEFAULT_NUMBER = '00000000000';

var PhoneNumber = function(phoneNumber) {
    const match = phoneNumber.match(PHONE_REGEX);
    if (match) {
        this.area = match[1];
        this.first = match[2];
        this.second = match[3];
        this.num = match[1] + match[2] + match[3];
    } else {
        this.num = DEFAULT_NUMBER;
    }
}

PhoneNumber.prototype.number = function() { return this.num }
PhoneNumber.prototype.areaCode = function() { return this.area }
PhoneNumber.prototype.toString = function() { return sprintf("(%s) %s-%s", this.area, this.first, this.second) }

export default PhoneNumber;