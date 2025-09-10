function SpaceAge(seconds) {
  this.seconds = seconds;
}

const EARTH_YEAR_SECONDS = 31557600;
const PLANET_RATIOS = {
  Mercury: 0.2408467,
  Venus: 0.61519726,
  Earth: 1.0,
  Mars: 1.8808158,
  Jupiter: 11.862615,
  Saturn: 29.447498,
  Uranus: 84.016846,
  Neptune: 164.79132,
};

Object.entries(PLANET_RATIOS).forEach(([planet, ratio]) => {
  SpaceAge.prototype[`on${planet}`] = function () {
    return parseFloat((this.seconds / (EARTH_YEAR_SECONDS * ratio)).toFixed(2));
  };
});

export default SpaceAge;