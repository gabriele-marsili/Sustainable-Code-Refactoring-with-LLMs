// Your age on another planet
class SpaceAge {
  constructor(seconds) {
    this.seconds = seconds;
  }

  static EARTH_YEAR_SECONDS = 31557600;

  calculateAge(ratio) {
    return parseFloat((this.seconds / (SpaceAge.EARTH_YEAR_SECONDS * ratio)).toFixed(2));
  }

  onMercury() {
    return this.calculateAge(0.2408467);
  }

  onVenus() {
    return this.calculateAge(0.61519726);
  }

  onEarth() {
    return this.calculateAge(1.0);
  }

  onMars() {
    return this.calculateAge(1.8808158);
  }

  onJupiter() {
    return this.calculateAge(11.862615);
  }

  onSaturn() {
    return this.calculateAge(29.447498);
  }

  onUranus() {
    return this.calculateAge(84.016846);
  }

  onNeptune() {
    return this.calculateAge(164.79132);
  }
}

export default SpaceAge;