export default class SpaceAge {
  static readonly EARTH_YEAR = 31557600;
  static readonly MERCURY_YEAR = SpaceAge.EARTH_YEAR * 0.2408467;
  static readonly VENUS_YEAR = SpaceAge.EARTH_YEAR * 0.61519726;
  static readonly MARS_YEAR = SpaceAge.EARTH_YEAR * 1.8808158;
  static readonly JUPITER_YEAR = SpaceAge.EARTH_YEAR * 11.862615;
  static readonly SATURN_YEAR = SpaceAge.EARTH_YEAR * 29.447498;
  static readonly URANUS_YEAR = SpaceAge.EARTH_YEAR * 84.016846;
  static readonly NEPTUNE_YEAR = SpaceAge.EARTH_YEAR * 164.79132;
  readonly seconds: number;
  private readonly earthYears: number;

  constructor(seconds: number) {
    this.seconds = seconds;
    this.earthYears = seconds / SpaceAge.EARTH_YEAR;
  }

  private calculatePlanetYear(yearLength: number): number {
    return parseFloat((this.earthYears * (SpaceAge.EARTH_YEAR / yearLength)).toFixed(2));
  }

  public onEarth(): number {
    return parseFloat(this.earthYears.toFixed(2));
  }

  public onMercury(): number {
    return this.calculatePlanetYear(SpaceAge.MERCURY_YEAR);
  }

  public onVenus(): number {
    return this.calculatePlanetYear(SpaceAge.VENUS_YEAR);
  }

  public onMars(): number {
    return this.calculatePlanetYear(SpaceAge.MARS_YEAR);
  }

  public onJupiter(): number {
    return this.calculatePlanetYear(SpaceAge.JUPITER_YEAR);
  }

  public onSaturn(): number {
    return this.calculatePlanetYear(SpaceAge.SATURN_YEAR);
  }

  public onUranus(): number {
    return this.calculatePlanetYear(SpaceAge.URANUS_YEAR);
  }

  public onNeptune(): number {
    return this.calculatePlanetYear(SpaceAge.NEPTUNE_YEAR);
  }
}