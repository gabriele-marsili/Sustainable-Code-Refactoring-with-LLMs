export default function Year(year) {
  this.year = year;
}

Year.prototype.isLeap = function() {
  const y = this.year;
  if (y % 4 !== 0) return false;
  if (y % 100 !== 0) return true;
  return y % 400 === 0;
};