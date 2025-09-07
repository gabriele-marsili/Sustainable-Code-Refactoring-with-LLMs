var Gigasecond = function(date) {
  this.startDate = date;
};

Gigasecond.prototype.date = function() {
  const gigasecondInMilliseconds = 1000000000 * 1000;
  return new Date(this.startDate.getTime() + gigasecondInMilliseconds);
};

export default Gigasecond;