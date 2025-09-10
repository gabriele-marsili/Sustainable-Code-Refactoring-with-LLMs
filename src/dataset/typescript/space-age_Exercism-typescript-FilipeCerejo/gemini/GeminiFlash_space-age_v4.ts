const OrbitalPeriods = {
  'mercury': 0.2408467,
  'venus': 0.61519726,
  'earth': 1,
  'mars': 1.8808158,
  'jupiter': 11.862615,
  'saturn': 29.447498,
  'uranus': 84.016846,
  'neptune': 164.79132
}

type OrbitalPeriodType = keyof typeof OrbitalPeriods;

const earthYearInSeconds = 31557600;

export function age(planet: string, seconds: number): number {
    const orbitalPeriod = OrbitalPeriods[planet as OrbitalPeriodType];
    const ageInYears = seconds / (orbitalPeriod * earthYearInSeconds);
    return Math.round(ageInYears * 100) / 100;
}