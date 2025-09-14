const OrbitalPeriods = {
  'mercury': 0.2408467,
  'venus': 0.61519726,
  'earth': 1,
  'mars': 1.8808158,
  'jupiter': 11.862615,
  'saturn': 29.447498,
  'uranus': 84.016846,
  'neptune': 164.79132
} as const;

type OrbitalPeriodType = keyof typeof OrbitalPeriods;

const SECONDS_PER_EARTH_YEAR = 31557600;
const HUNDRED = 100;

export function age(planet: string, seconds: number): number {
    const orbitalPeriod = OrbitalPeriods[planet as OrbitalPeriodType];
    return Math.round(seconds * HUNDRED / (orbitalPeriod * SECONDS_PER_EARTH_YEAR)) / HUNDRED;
}