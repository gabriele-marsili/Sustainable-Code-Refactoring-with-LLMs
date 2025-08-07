var Year = function(input) {
    this.year = input;
};

Year.prototype.isLeap = function() {
    const y = this.year;
    return (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0));
};

export default Year;