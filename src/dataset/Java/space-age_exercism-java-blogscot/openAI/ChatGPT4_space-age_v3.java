import java.util.EnumMap;
import java.util.Map;

class SpaceAge {
  private final double seconds;

  private static final double EARTH_PERIOD = 31557600.0;

  private enum Planet {
    EARTH(1.0),
    MERCURY(0.2408467),
    VENUS(0.61519726),
    MARS(1.8808158),
    JUPITER(11.862615),
    SATURN(29.447498),
    URANUS(84.016846),
    NEPTUNE(164.79132);

    private final double ratio;

    Planet(double ratio) {
      this.ratio = ratio;
    }

    double getRatio() {
      return ratio;
    }
  }

  private final Map<Planet, Double> cachedAges = new EnumMap<>(Planet.class);

  SpaceAge(double seconds) {
    this.seconds = seconds;
  }

  private double calculateAge(Planet planet) {
    return cachedAges.computeIfAbsent(planet, p -> seconds / EARTH_PERIOD / p.getRatio());
  }

  double onEarth() {
    return calculateAge(Planet.EARTH);
  }

  double onMercury() {
    return calculateAge(Planet.MERCURY);
  }

  double onVenus() {
    return calculateAge(Planet.VENUS);
  }

  double onMars() {
    return calculateAge(Planet.MARS);
  }

  double onJupiter() {
    return calculateAge(Planet.JUPITER);
  }

  double onSaturn() {
    return calculateAge(Planet.SATURN);
  }

  double onUranus() {
    return calculateAge(Planet.URANUS);
  }

  double onNeptune() {
    return calculateAge(Planet.NEPTUNE);
  }
}