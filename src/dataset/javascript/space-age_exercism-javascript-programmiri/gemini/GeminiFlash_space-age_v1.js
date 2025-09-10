const BASE_SECONDS = 31557600;

const PLANET_YEAR_RATIOS = {
  earth: 1,
  mercury: 0.2408467,
  venus: 0.61519726,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
};

export const age = (planet, seconds) => {
  const years = seconds / (BASE_SECONDS * PLANET_YEAR_RATIOS[planet]);
  return Math.round(years * 100) / 100;
};