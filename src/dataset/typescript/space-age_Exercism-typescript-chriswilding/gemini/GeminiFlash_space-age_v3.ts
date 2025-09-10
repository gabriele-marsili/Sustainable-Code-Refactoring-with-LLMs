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

const orbitalPeriodInEarthYears: { [key in ObitalPeriod]: number } = {
  [ObitalPeriod.Earth]: 1,
  [ObitalPeriod.Mercury]: 0.2408467,
  [ObitalPeriod.Venus]: 0.61519726,
  [ObitalPeriod.Mars]: 1.8808158,
  [ObitalPeriod.Jupiter]: 11.862615,
  [ObitalPeriod.Saturn]: 29.447498,
  [ObitalPeriod.Uranus]: 84.016846,
  [ObitalPeriod.Neptune]: 164.79132,
};

const calculateAge = (seconds: number, orbitalPeriod: number): number => {
  const age = seconds / (orbitalPeriod * SECONDS_IN_EARTH_YEAR);
  return Math.round(age * 100) / 100;
};

class SpaceAge {
  private readonly _seconds: number;

  constructor(seconds: number) {
    this._seconds = seconds;
  }

  get seconds(): number {
    return this._seconds;
  }

  onMercury(): number {
    return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Mercury]);
  }

  onVenus(): number {
    return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Venus]);
  }

  onEarth(): number {
    return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Earth]);
  }

  onMars(): number {
    return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Mars]);
  }

  onJupiter(): number {
    return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Jupiter]);
  }

  onSaturn(): number {
    return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Saturn]);
  }

  onUranus(): number {
    return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Uranus]);
  }

  onNeptune(): number {
    return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Neptune]);
  }
}

export default SpaceAge;