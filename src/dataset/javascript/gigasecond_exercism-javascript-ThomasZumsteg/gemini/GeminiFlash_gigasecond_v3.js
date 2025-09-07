const GIGASECOND = 1e12;

function Gigasecond(day) {
  this.day = new Date(day.getTime());
}

Gigasecond.prototype.date = function() {
  return new Date(this.day.getTime() + GIGASECOND);
};

export default Gigasecond;