const SECONDS_IN_EARTH_YEAR = 31557600;

const OrbitalPeriods: Record<OrbitalPeriodType, number> = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
};

type OrbitalPeriodType = keyof typeof OrbitalPeriods;

export function age(planet: string, seconds: number): number {
  const orbitalPeriod = OrbitalPeriods[planet as OrbitalPeriodType];
  return orbitalPeriod
    ? Math.round((seconds / (orbitalPeriod * SECONDS_IN_EARTH_YEAR)) * 100) / 100
    : NaN;
}