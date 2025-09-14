export const age = (planet, age) => {
  const orbits = new Map([
    ["mercury", 0.2408467],
    ["venus", 0.61519726],
    ["earth", 1.0],
    ["mars", 1.8808158],
    ["jupiter", 11.862615],
    ["saturn", 29.447498],
    ["uranus", 84.016846],
    ["neptune", 164.79132]
  ]);
  
  const orbit = orbits.get(planet);
  if (!orbit) return 0;
  
  const t = age / (31557600 * orbit);
  return Math.round(t * 100) / 100;
};