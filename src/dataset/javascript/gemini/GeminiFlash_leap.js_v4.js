var Year = function(input) {
  this.year = input;
};

Year.prototype.isLeap = function() {
  const year = this.year;
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export default Year;;