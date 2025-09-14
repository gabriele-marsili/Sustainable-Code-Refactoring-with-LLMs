const SECONDS_IN_EARTH_YEAR = 31557600;

const ORBITAL_PERIODS = {
  Mercury: 0.2408467,
  Venus: 0.61519726,
  Earth: 1,
  Mars: 1.8808158,
  Jupiter: 11.862615,
  Saturn: 29.447498,
  Uranus: 84.016846,
  Neptune: 164.79132,
} as const;

class SpaceAge {
  private readonly earthYears: number;

  constructor(seconds: number) {
    this.earthYears = seconds / SECONDS_IN_EARTH_YEAR;
  }

  onMercury(): number {
    return Math.round((this.earthYears / ORBITAL_PERIODS.Mercury) * 100) / 100;
  }

  onVenus(): number {
    return Math.round((this.earthYears / ORBITAL_PERIODS.Venus) * 100) / 100;
  }

  onEarth(): number {
    return Math.round(this.earthYears * 100) / 100;
  }

  onMars(): number {
    return Math.round((this.earthYears / ORBITAL_PERIODS.Mars) * 100) / 100;
  }

  onJupiter(): number {
    return Math.round((this.earthYears / ORBITAL_PERIODS.Jupiter) * 100) / 100;
  }

  onSaturn(): number {
    return Math.round((this.earthYears / ORBITAL_PERIODS.Saturn) * 100) / 100;
  }

  onUranus(): number {
    return Math.round((this.earthYears / ORBITAL_PERIODS.Uranus) * 100) / 100;
  }

  onNeptune(): number {
    return Math.round((this.earthYears / ORBITAL_PERIODS.Neptune) * 100) / 100;
  }
}

export default SpaceAge;