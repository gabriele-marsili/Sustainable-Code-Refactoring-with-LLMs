var Gigasecond = function(date) {
  this.start = date;
  this.date = function() {
    const gigasecondInMilliseconds = 1000000000 * 1000;
    return new Date(this.start.getTime() + gigasecondInMilliseconds);
  }
};

export default Gigasecond;