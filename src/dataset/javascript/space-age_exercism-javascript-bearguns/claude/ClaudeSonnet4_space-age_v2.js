'use strict'
class SpaceAge {
  constructor(seconds) {
    this.seconds = seconds;
    this.earthYearInSeconds = 31557600;

    // Pre-calculate divisors to avoid repeated multiplication
    this.planetDivisors = {
      earth: 31557600,
      mercury: 7600543.81952,
      venus: 19414166.677952,
      jupiter: 374355659.124,
      saturn: 929292362.884,
      uranus: 2651370019.3296,
      neptune: 5203017294.8368
    };
    
    // Calculate remaining divisors
    this.planetDivisors.mars = 1.8808158 * this.earthYearInSeconds;
  }

  age(planet) {
    return Math.round((this.seconds / this.planetDivisors[planet]) * 100) / 100;
  }

  onEarth() {
    return Math.round((this.seconds / this.planetDivisors.earth) * 100) / 100;
  }

  onMercury() {
    return Math.round((this.seconds / this.planetDivisors.mercury) * 100) / 100;
  }

  onVenus() {
    return Math.round((this.seconds / this.planetDivisors.venus) * 100) / 100;
  }

  onMars() {
    return Math.round((this.seconds / this.planetDivisors.mars) * 100) / 100;
  }

  onJupiter() {
    return Math.round((this.seconds / this.planetDivisors.jupiter) * 100) / 100;
  }

  onSaturn() {
    return Math.round((this.seconds / this.planetDivisors.saturn) * 100) / 100;
  }

  onUranus() {
    return Math.round((this.seconds / this.planetDivisors.uranus) * 100) / 100;
  }

  onNeptune() {
    return Math.round((this.seconds / this.planetDivisors.neptune) * 100) / 100;
  }
}

export default SpaceAge;