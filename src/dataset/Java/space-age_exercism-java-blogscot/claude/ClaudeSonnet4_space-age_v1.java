class SpaceAge {
  private final double secondsPerEarthYear;

  private static final double EARTH_PERIOD = 31557600.0;
  private static final double MERCURY_RATIO = 0.2408467;
  private static final double VENUS_RATIO = 0.61519726;
  private static final double MARS_RATIO = 1.8808158;
  private static final double JUPITER_RATIO = 11.862615;
  private static final double SATURN_RATIO = 29.447498;
  private static final double URANUS_RATIO = 84.016846;
  private static final double NEPTUNE_RATIO = 164.79132;

  SpaceAge(double seconds) {
    this.secondsPerEarthYear = seconds / EARTH_PERIOD;
  }

  double onEarth() {
    return secondsPerEarthYear;
  }

  double onMercury() {
    return secondsPerEarthYear / MERCURY_RATIO;
  }

  double onVenus() {
    return secondsPerEarthYear / VENUS_RATIO;
  }

  double onMars() {
    return secondsPerEarthYear / MARS_RATIO;
  }

  double onJupiter() {
    return secondsPerEarthYear / JUPITER_RATIO;
  }

  double onSaturn() {
    return secondsPerEarthYear / SATURN_RATIO;
  }

  double onUranus() {
    return secondsPerEarthYear / URANUS_RATIO;
  }

  double onNeptune() {
    return secondsPerEarthYear / NEPTUNE_RATIO;
  }
}