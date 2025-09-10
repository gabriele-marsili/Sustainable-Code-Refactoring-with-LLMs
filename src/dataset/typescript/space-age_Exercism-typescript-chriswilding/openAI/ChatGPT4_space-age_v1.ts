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

const orbitalPeriodMap = {
  Mercury: OrbitalPeriod.Mercury,
  Venus: OrbitalPeriod.Venus,
  Earth: OrbitalPeriod.Earth,
  Mars: OrbitalPeriod.Mars,
  Jupiter: OrbitalPeriod.Jupiter,
  Saturn: OrbitalPeriod.Saturn,
  Uranus: OrbitalPeriod.Uranus,
  Neptune: OrbitalPeriod.Neptune,
} as const;

function calculate(orbitalPeriod: OrbitalPeriod, seconds: number): number {
  return Math.round((seconds / (orbitalPeriod * SECONDS_IN_EARTH_YEAR)) * 100) / 100;
}

class SpaceAge {
  public seconds: number;

  constructor(seconds: number) {
    this.seconds = seconds;
  }

  private calculateAge(planet: keyof typeof orbitalPeriodMap): number {
    return calculate(orbitalPeriodMap[planet], this.seconds);
  }

  onMercury() {
    return this.calculateAge("Mercury");
  }

  onVenus() {
    return this.calculateAge("Venus");
  }

  onEarth() {
    return this.calculateAge("Earth");
  }

  onMars() {
    return this.calculateAge("Mars");
  }

  onJupiter() {
    return this.calculateAge("Jupiter");
  }

  onSaturn() {
    return this.calculateAge("Saturn");
  }

  onUranus() {
    return this.calculateAge("Uranus");
  }

  onNeptune() {
    return this.calculateAge("Neptune");
  }
}

export default SpaceAge;