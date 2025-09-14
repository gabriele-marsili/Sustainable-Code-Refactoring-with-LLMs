export default class SpaceAge {
  private static readonly EARTH_YEAR = 31557600;
  private static readonly PLANET_RATIOS = {
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132
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
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.mercury);
  }

  public onVenus(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.venus);
  }

  public onMars(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.mars);
  }

  public onJupiter(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.jupiter);
  }

  public onSaturn(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.saturn);
  }

  public onUranus(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.uranus);
  }

  public onNeptune(): number {
    return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.neptune);
  }
}