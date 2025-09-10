export default class SpaceAge {
  private static readonly EARTH_YEAR = 31557600;
  private static readonly YEAR_RATIOS = {
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

  private onPlanet(ratio: number): number {
    return parseFloat((this.seconds / (SpaceAge.EARTH_YEAR * ratio)).toFixed(2));
  }

  public onEarth(): number {
    return parseFloat((this.seconds / SpaceAge.EARTH_YEAR).toFixed(2));
  }

  public onMercury(): number {
    return this.onPlanet(SpaceAge.YEAR_RATIOS.mercury);
  }

  public onVenus(): number {
    return this.onPlanet(SpaceAge.YEAR_RATIOS.venus);
  }

  public onMars(): number {
    return this.onPlanet(SpaceAge.YEAR_RATIOS.mars);
  }

  public onJupiter(): number {
    return this.onPlanet(SpaceAge.YEAR_RATIOS.jupiter);
  }

  public onSaturn(): number {
    return this.onPlanet(SpaceAge.YEAR_RATIOS.saturn);
  }

  public onUranus(): number {
    return this.onPlanet(SpaceAge.YEAR_RATIOS.uranus);
  }

  public onNeptune(): number {
    return this.onPlanet(SpaceAge.YEAR_RATIOS.neptune);
  }
}