function SpaceAge(seconds) { 
  this.seconds = seconds;
  this._earthYear = 31557600;
}

const PLANET_RATIOS = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1.0,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132
};

function calculateAge(seconds, earthYear, ratio) {
  return Math.round((seconds / (earthYear * ratio)) * 100) / 100;
}

SpaceAge.prototype.onMercury = function() {
  return calculateAge(this.seconds, this._earthYear, PLANET_RATIOS.mercury);
};

SpaceAge.prototype.onVenus = function() {
  return calculateAge(this.seconds, this._earthYear, PLANET_RATIOS.venus);
};

SpaceAge.prototype.onEarth = function() {
  return calculateAge(this.seconds, this._earthYear, PLANET_RATIOS.earth);
};

SpaceAge.prototype.onMars = function() {
  return calculateAge(this.seconds, this._earthYear, PLANET_RATIOS.mars);
};

SpaceAge.prototype.onJupiter = function() {
  return calculateAge(this.seconds, this._earthYear, PLANET_RATIOS.jupiter);
};

SpaceAge.prototype.onSaturn = function() {
  return calculateAge(this.seconds, this._earthYear, PLANET_RATIOS.saturn);
};

SpaceAge.prototype.onUranus = function() {
  return calculateAge(this.seconds, this._earthYear, PLANET_RATIOS.uranus);
};

SpaceAge.prototype.onNeptune = function() {
  return calculateAge(this.seconds, this._earthYear, PLANET_RATIOS.neptune);
};

export default SpaceAge;