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

class SpaceAge {
  private readonly ageInEarthYears: number;

  constructor(public readonly seconds: number) {
    this.ageInEarthYears = seconds / SECONDS_IN_EARTH_YEAR;
  }

  private calculate(orbitalPeriod: OrbitalPeriod): number {
    return Math.round((this.ageInEarthYears / orbitalPeriod) * 100) / 100;
  }

  onMercury() {
    return this.calculate(OrbitalPeriod.Mercury);
  }

  onVenus() {
    return this.calculate(OrbitalPeriod.Venus);
  }

  onEarth() {
    return this.calculate(OrbitalPeriod.Earth);
  }

  onMars() {
    return this.calculate(OrbitalPeriod.Mars);
  }

  onJupiter() {
    return this.calculate(OrbitalPeriod.Jupiter);
  }

  onSaturn() {
    return this.calculate(OrbitalPeriod.Saturn);
  }

  onUranus() {
    return this.calculate(OrbitalPeriod.Uranus);
  }

  onNeptune() {
    return this.calculate(OrbitalPeriod.Neptune);
  }
}

export default SpaceAge;