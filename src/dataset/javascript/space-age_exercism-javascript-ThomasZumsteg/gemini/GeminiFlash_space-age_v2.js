function SpaceAge(seconds) {
  this.seconds = seconds;
}

const earthYearInSeconds = 31557600;

function calculateAge(seconds, ratio) {
  const age = seconds / (earthYearInSeconds * ratio);
  return parseFloat(age.toFixed(2));
}

SpaceAge.prototype.onMercury = function() {
  return calculateAge(this.seconds, 0.2408467);
};
SpaceAge.prototype.onVenus = function() {
  return calculateAge(this.seconds, 0.61519726);
};
SpaceAge.prototype.onEarth = function() {
  return calculateAge(this.seconds, 1.0);
};
SpaceAge.prototype.onMars = function() {
  return calculateAge(this.seconds, 1.8808158);
};
SpaceAge.prototype.onJupiter = function() {
  return calculateAge(this.seconds, 11.862615);
};
SpaceAge.prototype.onSaturn = function() {
  return calculateAge(this.seconds, 29.447498);
};
SpaceAge.prototype.onUranus = function() {
  return calculateAge(this.seconds, 84.016846);
};
SpaceAge.prototype.onNeptune = function() {
  return calculateAge(this.seconds, 164.79132);
};

export default SpaceAge;