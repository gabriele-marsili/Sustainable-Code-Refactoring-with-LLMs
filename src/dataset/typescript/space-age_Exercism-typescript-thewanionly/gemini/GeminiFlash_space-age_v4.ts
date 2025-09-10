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

type Planet = keyof typeof OrbitalPeriod;

const orbitalPeriodValues: { [key in Planet]: number } = {
  mercury: OrbitalPeriod.mercury,
  venus: OrbitalPeriod.venus,
  earth: OrbitalPeriod.earth,
  mars: OrbitalPeriod.mars,
  jupiter: OrbitalPeriod.jupiter,
  saturn: OrbitalPeriod.saturn,
  uranus: OrbitalPeriod.uranus,
  neptune: OrbitalPeriod.neptune,
};

export function age(planet: Planet, seconds: number): number {
  const planetOrbitalPeriod = orbitalPeriodValues[planet];
  const planetAge = seconds / (planetOrbitalPeriod * EARTH_SECONDS_PER_YEAR);
  return Math.round(planetAge * 100) / 100;
}