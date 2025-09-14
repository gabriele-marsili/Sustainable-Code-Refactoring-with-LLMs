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

const EARTH_SECONDS_PER_YEAR = 31557600

// Pre-compute orbital periods in seconds to avoid repeated multiplication
const ORBITAL_PERIODS_SECONDS = {
  mercury: OrbitalPeriod.mercury * EARTH_SECONDS_PER_YEAR,
  venus: OrbitalPeriod.venus * EARTH_SECONDS_PER_YEAR,
  earth: OrbitalPeriod.earth * EARTH_SECONDS_PER_YEAR,
  mars: OrbitalPeriod.mars * EARTH_SECONDS_PER_YEAR,
  jupiter: OrbitalPeriod.jupiter * EARTH_SECONDS_PER_YEAR,
  saturn: OrbitalPeriod.saturn * EARTH_SECONDS_PER_YEAR,
  uranus: OrbitalPeriod.uranus * EARTH_SECONDS_PER_YEAR,
  neptune: OrbitalPeriod.neptune * EARTH_SECONDS_PER_YEAR
} as const

type Planet = keyof typeof OrbitalPeriod

export function age(planet: Planet, seconds: number): number {
  const planetAge = seconds / ORBITAL_PERIODS_SECONDS[planet]
  return Math.round(planetAge * 100) / 100
}