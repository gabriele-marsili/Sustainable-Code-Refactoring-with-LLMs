class SpaceAge {
  private final double seconds;
  private static final double EARTH_PERIOD = 31557600.0;
  private static final double MERCURY_ORBITAL_PERIOD = 0.2408467;
  private static final double VENUS_ORBITAL_PERIOD = 0.61519726;
  private static final double MARS_ORBITAL_PERIOD = 1.8808158;
  private static final double JUPITER_ORBITAL_PERIOD = 11.862615;
  private static final double SATURN_ORBITAL_PERIOD = 29.447498;
  private static final double URANUS_ORBITAL_PERIOD = 84.016846;
  private static final double NEPTUNE_ORBITAL_PERIOD = 164.79132;

  SpaceAge(double seconds) {
    this.seconds = seconds;
  }

  double onEarth() {
    return seconds / EARTH_PERIOD;
  }

  double onMercury() {
    return seconds / (EARTH_PERIOD * MERCURY_ORBITAL_PERIOD);
  }

  double onVenus() {
    return seconds / (EARTH_PERIOD * VENUS_ORBITAL_PERIOD);
  }

  double onMars() {
    return seconds / (EARTH_PERIOD * MARS_ORBITAL_PERIOD);
  }

  double onJupiter() {
    return seconds / (EARTH_PERIOD * JUPITER_ORBITAL_PERIOD);
  }

  double onSaturn() {
    return seconds / (EARTH_PERIOD * SATURN_ORBITAL_PERIOD);
  }

  double onUranus() {
    return seconds / (EARTH_PERIOD * URANUS_ORBITAL_PERIOD);
  }

  double onNeptune() {
    return seconds / (EARTH_PERIOD * NEPTUNE_ORBITAL_PERIOD);
  }
}