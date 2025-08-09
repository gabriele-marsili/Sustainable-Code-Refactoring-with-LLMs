var Year = function(input) {
    this.year = input;
};

Year.prototype.isLeap = function() {
    return this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0);
};

export default Year;