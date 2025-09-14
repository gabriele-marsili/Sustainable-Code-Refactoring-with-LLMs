enum OrbitalPeriod {
  mercury = 0.2408467,
  venus = 0.61519726,
  earth = 1,
  mars = 1.8808158,
  jupiter = 11.862615,
  saturn = 29.447498,
  uranus = 84.016846,
  neptune = 164.79132
}

const EARTH_SECONDS_PER_YEAR = 31557600;
const ROUNDING_MULTIPLIER = 100;

type Planet = keyof typeof OrbitalPeriod;

export function age(planet: Planet, seconds: number): number {
  const planetAge = seconds / (OrbitalPeriod[planet] * EARTH_SECONDS_PER_YEAR);
  return Math.round(planetAge * ROUNDING_MULTIPLIER) / ROUNDING_MULTIPLIER;
}