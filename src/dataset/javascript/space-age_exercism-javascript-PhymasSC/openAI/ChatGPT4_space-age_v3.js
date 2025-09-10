const SECONDS_IN_EARTH_YEAR = 31557600;
const PLANET_YEAR_RATIOS = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1.0,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132
};

export const age = (planet, ageInSeconds) => 
  Math.round((ageInSeconds / (SECONDS_IN_EARTH_YEAR * PLANET_YEAR_RATIOS[planet])) * 100) / 100;