import java.util.Random;

class CaptainsLog {
  private static final char[] PLANET_CLASSES =
      {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
  
  private static final int PLANET_CLASSES_LENGTH = PLANET_CLASSES.length;
  private static final int SHIP_REGISTRY_MIN = 1_000;
  private static final int SHIP_REGISTRY_RANGE = 9_000;
  private static final double STARDATE_MIN = 41_000.0;
  private static final double STARDATE_RANGE = 1_000.0;

  private final Random random;

  CaptainsLog(Random random) {
    this.random = random;
  }

  char randomPlanetClass() {
    return PLANET_CLASSES[random.nextInt(PLANET_CLASSES_LENGTH)];
  }

  String randomShipRegistryNumber() {
    return "NCC-" + (SHIP_REGISTRY_MIN + random.nextInt(SHIP_REGISTRY_RANGE));
  }

  double randomStardate() {
    return STARDATE_MIN + random.nextDouble() * STARDATE_RANGE;
  }
}