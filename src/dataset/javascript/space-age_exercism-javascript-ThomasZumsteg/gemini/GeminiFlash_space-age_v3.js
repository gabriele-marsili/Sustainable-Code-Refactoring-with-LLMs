function SpaceAge(seconds) {
  this.seconds = seconds;
}

const earthYearInSeconds = 31557600;

const planetRatios = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1.0,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
};

function calculateAge(planet) {
  return parseFloat((this.seconds / (earthYearInSeconds * planetRatios[planet])).toFixed(2));
}

SpaceAge.prototype.onMercury = function() { return calculateAge.call(this, 'mercury'); };
SpaceAge.prototype.onVenus = function() { return calculateAge.call(this, 'venus'); };
SpaceAge.prototype.onEarth = function() { return calculateAge.call(this, 'earth'); };
SpaceAge.prototype.onMars = function() { return calculateAge.call(this, 'mars'); };
SpaceAge.prototype.onJupiter = function() { return calculateAge.call(this, 'jupiter'); };
SpaceAge.prototype.onSaturn = function() { return calculateAge.call(this, 'saturn'); };
SpaceAge.prototype.onUranus = function() { return calculateAge.call(this, 'uranus'); };
SpaceAge.prototype.onNeptune = function() { return calculateAge.call(this, 'neptune'); };

export default SpaceAge;