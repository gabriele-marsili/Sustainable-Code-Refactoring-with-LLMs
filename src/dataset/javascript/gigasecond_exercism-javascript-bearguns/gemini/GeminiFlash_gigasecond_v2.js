const GIGASECOND = 1000000000;

var Gigasecond = function(date) {
  this.start = date.getTime();
};

Gigasecond.prototype.date = function() {
  return new Date(this.start + (GIGASECOND * 1000));
};

export default Gigasecond;