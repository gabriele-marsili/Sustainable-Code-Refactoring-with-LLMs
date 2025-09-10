const SECONDS_IN_EARTH_YEAR = 31557600

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
  [ObitalPeriod.Earth]: ObitalPeriod.Earth,
  [ObitalPeriod.Mercury]: ObitalPeriod.Mercury,
  [ObitalPeriod.Venus]: ObitalPeriod.Venus,
  [ObitalPeriod.Mars]: ObitalPeriod.Mars,
  [ObitalPeriod.Jupiter]: ObitalPeriod.Jupiter,
  [ObitalPeriod.Saturn]: ObitalPeriod.Saturn,
  [ObitalPeriod.Uranus]: ObitalPeriod.Uranus,
  [ObitalPeriod.Neptune]: ObitalPeriod.Neptune,
}

class SpaceAge {
  private readonly seconds: number
  private readonly earthYears: number

  constructor(seconds: number) {
    this.seconds = seconds
    this.earthYears = seconds / SECONDS_IN_EARTH_YEAR
  }

  private calculate(orbitalPeriod: ObitalPeriod): number {
    const n = this.earthYears / orbitalPeriodInEarthYears[orbitalPeriod]
    return Math.round(n * 100) / 100
  }

  onMercury() {
    return this.calculate(ObitalPeriod.Mercury)
  }

  onVenus() {
    return this.calculate(ObitalPeriod.Venus)
  }

  onEarth() {
    return this.calculate(ObitalPeriod.Earth)
  }

  onMars() {
    return this.calculate(ObitalPeriod.Mars)
  }

  onJupiter() {
    return this.calculate(ObitalPeriod.Jupiter)
  }

  onSaturn() {
    return this.calculate(ObitalPeriod.Saturn)
  }

  onUranus() {
    return this.calculate(ObitalPeriod.Uranus)
  }

  onNeptune() {
    return this.calculate(ObitalPeriod.Neptune)
  }
}

export default SpaceAge