var Gigasecond = function(date) {
  this.start = new Date(date.getTime() + 1000000000000);
};

Gigasecond.prototype.date = function() {
  return new Date(this.start);
};

export default Gigasecond;