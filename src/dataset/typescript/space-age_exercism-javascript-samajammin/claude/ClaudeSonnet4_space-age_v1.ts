export default class SpaceAge {
  private static readonly EARTH_YEAR = 31557600;
  private static readonly PLANET_RATIOS = {
    MERCURY: 0.2408467,
    VENUS: 0.61519726,
    MARS: 1.8808158,
    JUPITER: 11.862615,
    SATURN: 29.447498,
    URANUS: 84.016846,
    NEPTUNE: 164.79132
  } as const;

  readonly seconds: number;

  constructor(seconds: number) {
    this.seconds = seconds;
  }

  public parsePlanetYears(planetYear: number): number {
    return Math.round((this.seconds / planetYear) * 100) / 100;
  }

  public onEarth(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR);
  }

  public onMercury(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.MERCURY);
  }

  public onVenus(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.VENUS);
  }

  public onMars(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.MARS);
  }

  public onJupiter(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.JUPITER);
  }

  public onSaturn(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.SATURN);
  }

  public onUranus(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.URANUS);
  }

  public onNeptune(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.NEPTUNE);
  }
}