export default class SpaceAge {
  static readonly PLANET_YEARS = {
    Earth: 31557600,
    Mercury: 31557600 * 0.2408467,
    Venus: 31557600 * 0.61519726,
    Mars: 31557600 * 1.8808158,
    Jupiter: 31557600 * 11.862615,
    Saturn: 31557600 * 29.447498,
    Uranus: 31557600 * 84.016846,
    Neptune: 31557600 * 164.79132,
  } as const;
  readonly seconds: number;

  constructor(seconds: number) {
    this.seconds = seconds;
  }

  private calculateAge(planet: keyof typeof SpaceAge.PLANET_YEARS): number {
    return Math.round((this.seconds / SpaceAge.PLANET_YEARS[planet]) * 100) / 100;
  }

  public onEarth(): number {
    return this.calculateAge("Earth");
  }

  public onMercury(): number {
    return this.calculateAge("Mercury");
  }

  public onVenus(): number {
    return this.calculateAge("Venus");
  }

  public onMars(): number {
    return this.calculateAge("Mars");
  }

  public onJupiter(): number {
    return this.calculateAge("Jupiter");
  }

  public onSaturn(): number {
    return this.calculateAge("Saturn");
  }

  public onUranus(): number {
    return this.calculateAge("Uranus");
  }

  public onNeptune(): number {
    return this.calculateAge("Neptune");
  }
}