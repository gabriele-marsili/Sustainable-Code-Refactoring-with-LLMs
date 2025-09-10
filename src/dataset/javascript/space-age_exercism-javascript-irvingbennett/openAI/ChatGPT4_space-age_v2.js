export const age = (planet, ageInSeconds) => {
  const orbitalPeriods = {
    mercury: 7600543.81992,  // 31557600 * 0.2408467
    venus: 19414149.052176, // 31557600 * 0.61519726
    earth: 31557600,        // 31557600 * 1.0
    mars: 59354032.69008,   // 31557600 * 1.8808158
    jupiter: 374355659.124, // 31557600 * 11.862615
    saturn: 929292362.8848, // 31557600 * 29.447498
    uranus: 2651370019.3296,// 31557600 * 84.016846
    neptune: 5200418560.032 // 31557600 * 164.79132
  };

  return Number((ageInSeconds / orbitalPeriods[planet]).toFixed(2));
};