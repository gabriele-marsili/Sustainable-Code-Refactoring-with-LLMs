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
  private readonly ageInEarthYears: Record<OrbitalPeriod, number>;

  constructor(public readonly seconds: number) {
    this.ageInEarthYears = Object.values(OrbitalPeriod).reduce((acc, period) => {
      if (typeof period === "number") {
        acc[period] = Math.round((seconds / (period * SECONDS_IN_EARTH_YEAR)) * 100) / 100;
      }
      return acc;
    }, {} as Record<OrbitalPeriod, number>);
  }

  onMercury() {
    return this.ageInEarthYears[OrbitalPeriod.Mercury];
  }

  onVenus() {
    return this.ageInEarthYears[OrbitalPeriod.Venus];
  }

  onEarth() {
    return this.ageInEarthYears[OrbitalPeriod.Earth];
  }

  onMars() {
    return this.ageInEarthYears[OrbitalPeriod.Mars];
  }

  onJupiter() {
    return this.ageInEarthYears[OrbitalPeriod.Jupiter];
  }

  onSaturn() {
    return this.ageInEarthYears[OrbitalPeriod.Saturn];
  }

  onUranus() {
    return this.ageInEarthYears[OrbitalPeriod.Uranus];
  }

  onNeptune() {
    return this.ageInEarthYears[OrbitalPeriod.Neptune];
  }
}

export default SpaceAge;