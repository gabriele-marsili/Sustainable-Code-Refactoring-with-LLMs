const ORBITAL_PERIODS = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132
};

type Planet = keyof typeof ORBITAL_PERIODS;

const EARTH_SECONDS_PER_YEAR = 31557600;

const orbitalPeriodInEarthYears = (planet: Planet) => ORBITAL_PERIODS[planet];

export function age(planet: Planet, seconds: number): number {
  const planetAge = seconds / (orbitalPeriodInEarthYears(planet) * EARTH_SECONDS_PER_YEAR);
  return Math.round(planetAge * 100) / 100;
}