var Gigasecond = function(date) {
  this.start = date.getTime();
};

Gigasecond.prototype.date = function() {
  return new Date(this.start + 1000000000000);
};

export default Gigasecond;