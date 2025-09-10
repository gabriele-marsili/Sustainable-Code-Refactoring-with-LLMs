class SpaceAge {
  private double seconds;

  private static final double EARTH_PERIOD = 31557600.0;
  private static final double SECONDS_TO_YEAR = 1.0 / EARTH_PERIOD;

  SpaceAge(double seconds) {
    this.seconds = seconds;
  }

  private double calculateAge(double ratio) {
    return seconds * SECONDS_TO_YEAR / ratio;
  }


  double onEarth() {
    return seconds * SECONDS_TO_YEAR;
  }

  double onMercury() {
    return calculateAge(0.2408467);
  }

  double onVenus() {
    return calculateAge(0.61519726);
  }

  double onMars() {
    return calculateAge(1.8808158);
  }

  double onJupiter() {
    return calculateAge(11.862615);
  }

  double onSaturn() {
    return calculateAge(29.447498);
  }

  double onUranus() {
    return calculateAge(84.016846);
  }

  double onNeptune() {
    return calculateAge(164.79132);
  }
}