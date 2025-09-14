export const age = (planet, age) => {
  const SECONDS_PER_EARTH_YEAR = 31557600;
  
  const orbitalPeriods = new Map([
    ["mercury", 0.2408467],
    ["venus", 0.61519726],
    ["earth", 1.0],
    ["mars", 1.8808158],
    ["jupiter", 11.862615],
    ["saturn", 29.447498],
    ["uranus", 84.016846],
    ["neptune", 164.79132]
  ]);
  
  const orbitalPeriod = orbitalPeriods.get(planet);
  if (orbitalPeriod === undefined) return 0;
  
  return Math.round((age / (SECONDS_PER_EARTH_YEAR * orbitalPeriod)) * 100) / 100;
};