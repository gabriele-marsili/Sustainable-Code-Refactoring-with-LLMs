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

function calculate(orbitalPeriod: ObitalPeriod, seconds: number): number {
  const n = seconds / (orbitalPeriod * SECONDS_IN_EARTH_YEAR)
  return Math.round(n * 100) / 100
}

class SpaceAge {
  public seconds: number

  constructor(seconds: number) {
    this.seconds = seconds
  }

  onMercury() {
    return calculate(ObitalPeriod.Mercury, this.seconds)
  }

  onVenus() {
    return calculate(ObitalPeriod.Venus, this.seconds)
  }

  onEarth() {
    return calculate(ObitalPeriod.Earth, this.seconds)
  }

  onMars() {
    return calculate(ObitalPeriod.Mars, this.seconds)
  }

  onJupiter() {
    return calculate(ObitalPeriod.Jupiter, this.seconds)
  }

  onSaturn() {
    return calculate(ObitalPeriod.Saturn, this.seconds)
  }

  onUranus() {
    return calculate(ObitalPeriod.Uranus, this.seconds)
  }

  onNeptune() {
    return calculate(ObitalPeriod.Neptune, this.seconds)
  }
}

export default SpaceAge
