const SECONDS_IN_YEAR = 31557600;

const orbitalPeriods = {
  earth: 1,
  mercury: 0.2408467,
  venus: 0.61519726,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132
};

const planetYearsInSeconds: { [planet in keyof typeof orbitalPeriods]: number } = Object.entries(orbitalPeriods).reduce(
  (acc, [planet, period]) => {
    acc[planet as keyof typeof orbitalPeriods] = period * SECONDS_IN_YEAR;
    return acc;
  },
  {} as { [planet in keyof typeof orbitalPeriods]: number }
);

export const age = (planet: keyof typeof orbitalPeriods, seconds: number): number => {
  const ageInPlanetYears = seconds / planetYearsInSeconds[planet];
  return Math.round(ageInPlanetYears * 100) / 100;
};