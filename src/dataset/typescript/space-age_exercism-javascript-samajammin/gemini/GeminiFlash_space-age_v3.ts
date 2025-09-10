export default class SpaceAge {
  static readonly EARTH_YEAR_IN_SECONDS = 31557600;
  private static readonly planetYearMultipliers = {
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132,
  };

  private readonly seconds: number;

  constructor(seconds: number) {
    this.seconds = seconds;
  }

  private calculateYears(yearLengthInSeconds: number): number {
    const years = this.seconds / yearLengthInSeconds;
    return Math.round(years * 100) / 100;
  }

  public onEarth(): number {
    return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS);
  }

  public onMercury(): number {
    return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.mercury);
  }

  public onVenus(): number {
    return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.venus);
  }

  public onMars(): number {
    return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.mars);
  }

  public onJupiter(): number {
    return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.jupiter);
  }

  public onSaturn(): number {
    return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.saturn);
  }

  public onUranus(): number {
    return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.uranus);
  }

  public onNeptune(): number {
    return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.neptune);
  }
}