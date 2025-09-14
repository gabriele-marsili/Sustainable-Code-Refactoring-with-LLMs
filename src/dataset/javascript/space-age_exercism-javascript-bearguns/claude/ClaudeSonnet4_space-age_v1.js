'use strict'
class SpaceAge {
  constructor(seconds) {
    this.seconds = seconds;
    
    // Pre-calculate divisors to avoid repeated multiplication
    this.divisors = {
      earth: 31557600,
      mercury: 7600543.81992,
      venus: 19414166.677952,
      jupiter: 374355659.124,
      saturn: 929292362.884,
      uranus: 2651370019.3296,
      neptune: 5203017294.8368,
      mars: 59354032.690079994,
      venus: 19414166.677952
    };
    
    this.divisors.venus = 19414166.677952;
    this.divisors.mars = 59354032.690079994;
  }

  age(planet) {
    return Math.round((this.seconds / this.divisors[planet]) * 100) / 100;
  }

  onEarth() {
    return Math.round((this.seconds / 31557600) * 100) / 100;
  }

  onMercury() {
    return Math.round((this.seconds / 7600543.81992) * 100) / 100;
  }

  onVenus() {
    return Math.round((this.seconds / 19414166.677952) * 100) / 100;
  }

  onMars() {
    return Math.round((this.seconds / 59354032.690079994) * 100) / 100;
  }

  onJupiter() {
    return Math.round((this.seconds / 374355659.124) * 100) / 100;
  }

  onSaturn() {
    return Math.round((this.seconds / 929292362.884) * 100) / 100;
  }

  onUranus() {
    return Math.round((this.seconds / 2651370019.3296) * 100) / 100;
  }

  onNeptune() {
    return Math.round((this.seconds / 5203017294.8368) * 100) / 100;
  }
}

export default SpaceAge;