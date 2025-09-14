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

const EARTH_YEAR_SECONDS = 31557600;
const SCALE_FACTOR = 100;

const precomputedFactors = {
  'mercury': SCALE_FACTOR / (OrbitalPeriods.mercury * EARTH_YEAR_SECONDS),
  'venus': SCALE_FACTOR / (OrbitalPeriods.venus * EARTH_YEAR_SECONDS),
  'earth': SCALE_FACTOR / (OrbitalPeriods.earth * EARTH_YEAR_SECONDS),
  'mars': SCALE_FACTOR / (OrbitalPeriods.mars * EARTH_YEAR_SECONDS),
  'jupiter': SCALE_FACTOR / (OrbitalPeriods.jupiter * EARTH_YEAR_SECONDS),
  'saturn': SCALE_FACTOR / (OrbitalPeriods.saturn * EARTH_YEAR_SECONDS),
  'uranus': SCALE_FACTOR / (OrbitalPeriods.uranus * EARTH_YEAR_SECONDS),
  'neptune': SCALE_FACTOR / (OrbitalPeriods.neptune * EARTH_YEAR_SECONDS)
} as const;

type OrbitalPeriodType = keyof typeof OrbitalPeriods;

export function age(planet: string, seconds: number): number {
    const factor = precomputedFactors[planet as OrbitalPeriodType];
    return Math.round(seconds * factor) / SCALE_FACTOR;
}