export const age = (planet, age) => {
  const orbitalPeriods = {
    mercury: 7594494.4,
    venus: 19414166.4,
    earth: 31557600,
    mars: 59354294.4,
    jupiter: 374355659.124,
    saturn: 929292362.884,
    uranus: 2651370019.3296,
    neptune: 5200418560.032
  };
  
  return Math.round((age / orbitalPeriods[planet]) * 100) / 100;
};