const GIGASECOND = 1e12;

var Gigasecond = function(day) {
	this.day = day;
};

Gigasecond.prototype.date = function() { 
  return new Date(this.day.getTime() + GIGASECOND);
};

export default Gigasecond;