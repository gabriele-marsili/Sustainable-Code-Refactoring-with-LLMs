const SECONDS_IN_YEAR = 31557600;

const planetYearSeconds = {
  earth: 31557600,
  mercury: 7600543.082,
  venus: 19414166.284,
  mars: 59354294.4,
  jupiter: 374335776.36,
  saturn: 929596608,
  uranus: 2651370496,
  neptune: 5200418592
} as const;

export const age = (planet: keyof typeof planetYearSeconds, seconds: number): number => {
  return Math.round(seconds / planetYearSeconds[planet] * 100) / 100;
}