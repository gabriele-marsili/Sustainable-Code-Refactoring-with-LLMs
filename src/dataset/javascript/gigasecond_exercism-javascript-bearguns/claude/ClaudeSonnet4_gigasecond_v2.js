var Gigasecond = function(date) {
  this.start = date;
  this.date = function() {
    return new Date(this.start.getTime() + 1000000000000);
  }
};

export default Gigasecond;