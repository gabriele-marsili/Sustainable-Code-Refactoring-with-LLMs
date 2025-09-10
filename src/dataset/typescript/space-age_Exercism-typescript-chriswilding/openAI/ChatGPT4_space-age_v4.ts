const SECONDS_IN_EARTH_YEAR = 31557600;

enum OrbitalPeriod {
  Earth = 1,
  Mercury = 0.2408467,
  Venus = 0.61519726,
  Mars = 1.8808158,
  Jupiter = 11.862615,
  Saturn = 29.447498,
  Uranus = 84.016846,
  Neptune = 164.79132,
}

const calculate = (orbitalPeriod: number, seconds: number): number =>
  Math.round((seconds / (orbitalPeriod * SECONDS_IN_EARTH_YEAR)) * 100) / 100;

class SpaceAge {
  constructor(public seconds: number) {}

  private calculateAge(orbitalPeriod: OrbitalPeriod): number {
    return calculate(orbitalPeriod, this.seconds);
  }

  onMercury() {
    return this.calculateAge(OrbitalPeriod.Mercury);
  }

  onVenus() {
    return this.calculateAge(OrbitalPeriod.Venus);
  }

  onEarth() {
    return this.calculateAge(OrbitalPeriod.Earth);
  }

  onMars() {
    return this.calculateAge(OrbitalPeriod.Mars);
  }

  onJupiter() {
    return this.calculateAge(OrbitalPeriod.Jupiter);
  }

  onSaturn() {
    return this.calculateAge(OrbitalPeriod.Saturn);
  }

  onUranus() {
    return this.calculateAge(OrbitalPeriod.Uranus);
  }

  onNeptune() {
    return this.calculateAge(OrbitalPeriod.Neptune);
  }
}

export default SpaceAge;