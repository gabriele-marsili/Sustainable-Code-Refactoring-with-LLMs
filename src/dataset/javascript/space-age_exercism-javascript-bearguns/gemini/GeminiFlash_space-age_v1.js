'use strict'
class SpaceAge {
  constructor(seconds) {
    this.seconds = seconds;
    this.earthYearInSeconds = 31557600;
    this.orbitalPeriods = {
      earth: 1,
      mercury: 0.2408467,
      venus: 0.61519726,
      mars: 1.8808158,
      jupiter: 11.862615,
      saturn: 29.447498,
      uranus: 84.016846,
      neptune: 164.79132
    };
    this.planetYears = {};
    for (const planet in this.orbitalPeriods) {
      this.planetYears[planet] = this.earthYearInSeconds * this.orbitalPeriods[planet];
    }
  }

  age(planet) {
    const age = this.seconds / this.planetYears[planet];
    return Number(age.toFixed(2));
  }

  onEarth() {
    return this.age('earth');
  }

  onMercury() {
    return this.age('mercury');
  }

  onVenus() {
    return this.age('venus');
  }

  onMars() {
    return this.age('mars');
  }

  onJupiter() {
    return this.age('jupiter');
  }

  onSaturn() {
    return this.age('saturn');
  }

  onUranus() {
    return this.age('uranus');
  }

  onNeptune() {
    return this.age('neptune');
  }
}

export default SpaceAge;