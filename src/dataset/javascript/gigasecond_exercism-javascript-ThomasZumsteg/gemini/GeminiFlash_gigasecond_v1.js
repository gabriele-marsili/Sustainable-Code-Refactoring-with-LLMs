const GIGASECOND = 1000000000000;

function Gigasecond(day) {
  this.day = day;
}

Gigasecond.prototype.date = function() {
  return new Date(this.day.getTime() + GIGASECOND);
};

export default Gigasecond;