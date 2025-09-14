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

const INVERSE_ORBITAL_PERIODS = {
  Mercury: 1 / (ORBITAL_PERIODS.Mercury * SECONDS_IN_EARTH_YEAR),
  Venus: 1 / (ORBITAL_PERIODS.Venus * SECONDS_IN_EARTH_YEAR),
  Earth: 1 / (ORBITAL_PERIODS.Earth * SECONDS_IN_EARTH_YEAR),
  Mars: 1 / (ORBITAL_PERIODS.Mars * SECONDS_IN_EARTH_YEAR),
  Jupiter: 1 / (ORBITAL_PERIODS.Jupiter * SECONDS_IN_EARTH_YEAR),
  Saturn: 1 / (ORBITAL_PERIODS.Saturn * SECONDS_IN_EARTH_YEAR),
  Uranus: 1 / (ORBITAL_PERIODS.Uranus * SECONDS_IN_EARTH_YEAR),
  Neptune: 1 / (ORBITAL_PERIODS.Neptune * SECONDS_IN_EARTH_YEAR),
} as const;

class SpaceAge {
  public seconds: number;

  constructor(seconds: number) {
    this.seconds = seconds;
  }

  onMercury(): number {
    return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Mercury * 100) / 100;
  }

  onVenus(): number {
    return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Venus * 100) / 100;
  }

  onEarth(): number {
    return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Earth * 100) / 100;
  }

  onMars(): number {
    return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Mars * 100) / 100;
  }

  onJupiter(): number {
    return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Jupiter * 100) / 100;
  }

  onSaturn(): number {
    return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Saturn * 100) / 100;
  }

  onUranus(): number {
    return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Uranus * 100) / 100;
  }

  onNeptune(): number {
    return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Neptune * 100) / 100;
  }
}

export default SpaceAge;