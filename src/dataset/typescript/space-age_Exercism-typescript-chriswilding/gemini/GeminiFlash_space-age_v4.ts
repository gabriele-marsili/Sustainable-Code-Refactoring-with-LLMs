const SECONDS_IN_EARTH_YEAR = 31557600;

enum ObitalPeriod {
  Earth = 1,
  Mercury = 0.2408467,
  Venus = 0.61519726,
  Mars = 1.8808158,
  Jupiter = 11.862615,
  Saturn = 29.447498,
  Uranus = 84.016846,
  Neptune = 164.79132,
}

const orbitalPeriodValues = {
  [ObitalPeriod.Mercury]: ObitalPeriod.Mercury * SECONDS_IN_EARTH_YEAR,
  [ObitalPeriod.Venus]: ObitalPeriod.Venus * SECONDS_IN_EARTH_YEAR,
  [ObitalPeriod.Earth]: ObitalPeriod.Earth * SECONDS_IN_EARTH_YEAR,
  [ObitalPeriod.Mars]: ObitalPeriod.Mars * SECONDS_IN_EARTH_YEAR,
  [ObitalPeriod.Jupiter]: ObitalPeriod.Jupiter * SECONDS_IN_EARTH_YEAR,
  [ObitalPeriod.Saturn]: ObitalPeriod.Saturn * SECONDS_IN_EARTH_YEAR,
  [ObitalPeriod.Uranus]: ObitalPeriod.Uranus * SECONDS_IN_EARTH_YEAR,
  [ObitalPeriod.Neptune]: ObitalPeriod.Neptune * SECONDS_IN_EARTH_YEAR,
};

function calculate(orbitalPeriod: ObitalPeriod, seconds: number): number {
  const periodInSeconds = orbitalPeriodValues[orbitalPeriod];
  const n = seconds / periodInSeconds;
  return Math.round(n * 100) / 100;
}

class SpaceAge {
  public seconds: number;
  private mercuryAge: number;
  private venusAge: number;
  private earthAge: number;
  private marsAge: number;
  private jupiterAge: number;
  private saturnAge: number;
  private uranusAge: number;
  private neptuneAge: number;

  constructor(seconds: number) {
    this.seconds = seconds;
    this.earthAge = calculate(ObitalPeriod.Earth, this.seconds);
    this.mercuryAge = calculate(ObitalPeriod.Mercury, this.seconds);
    this.venusAge = calculate(ObitalPeriod.Venus, this.seconds);
    this.marsAge = calculate(ObitalPeriod.Mars, this.seconds);
    this.jupiterAge = calculate(ObitalPeriod.Jupiter, this.seconds);
    this.saturnAge = calculate(ObitalPeriod.Saturn, this.seconds);
    this.uranusAge = calculate(ObitalPeriod.Uranus, this.seconds);
    this.neptuneAge = calculate(ObitalPeriod.Neptune, this.seconds);
  }

  onMercury() {
    return this.mercuryAge;
  }

  onVenus() {
    return this.venusAge;
  }

  onEarth() {
    return this.earthAge;
  }

  onMars() {
    return this.marsAge;
  }

  onJupiter() {
    return this.jupiterAge;
  }

  onSaturn() {
    return this.saturnAge;
  }

  onUranus() {
    return this.uranusAge;
  }

  onNeptune() {
    return this.neptuneAge;
  }
}

export default SpaceAge;