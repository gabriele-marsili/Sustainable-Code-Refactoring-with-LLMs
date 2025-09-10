const SECONDS_IN_EARTH_YEAR = 31557600;

enum ObitalPeriod {
  Earth = 1,
  Mercury = 0.2408467,
  Venus = 0.61519726,
  Mars = 1.8808158,
  Jupiter = 11.862615,
  Saturn = 29.447498,
  Uranus = 84.016846,
  Neptune = 164.79132,
}

const orbitalPeriodInEarthYears: { [key in keyof typeof ObitalPeriod]: number } = {
  Earth: 1,
  Mercury: 0.2408467,
  Venus: 0.61519726,
  Mars: 1.8808158,
  Jupiter: 11.862615,
  Saturn: 29.447498,
  Uranus: 84.016846,
  Neptune: 164.79132,
};

class SpaceAge {
  private readonly seconds: number;
  private readonly earthYears: number;

  constructor(seconds: number) {
    this.seconds = seconds;
    this.earthYears = seconds / SECONDS_IN_EARTH_YEAR;
  }

  private calculate(orbitalPeriod: number): number {
    const n = this.earthYears / orbitalPeriod;
    return Math.round(n * 100) / 100;
  }

  onMercury() {
    return this.calculate(orbitalPeriodInEarthYears.Mercury);
  }

  onVenus() {
    return this.calculate(orbitalPeriodInEarthYears.Venus);
  }

  onEarth() {
    return this.calculate(orbitalPeriodInEarthYears.Earth);
  }

  onMars() {
    return this.calculate(orbitalPeriodInEarthYears.Mars);
  }

  onJupiter() {
    return this.calculate(orbitalPeriodInEarthYears.Jupiter);
  }

  onSaturn() {
    return this.calculate(orbitalPeriodInEarthYears.Saturn);
  }

  onUranus() {
    return this.calculate(orbitalPeriodInEarthYears.Uranus);
  }

  onNeptune() {
    return this.calculate(orbitalPeriodInEarthYears.Neptune);
  }
}

export default SpaceAge;