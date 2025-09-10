import java.util.Random;

class CaptainsLog {
  private static final char[] PLANET_CLASSES =
      new char[] {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
  private static final int SHIP_REGISTRY_BASE = 1_000;
  private static final int SHIP_REGISTRY_RANGE = 9_000;
  private static final double STARDATE_BASE = 41_000;
  private static final double STARDATE_RANGE = 1_000;

  private final Random random;

  CaptainsLog(Random random) {
    this.random = random;
  }

  char randomPlanetClass() {
    return PLANET_CLASSES[random.nextInt(PLANET_CLASSES.length)];
  }

  String randomShipRegistryNumber() {
    return "NCC-" + (SHIP_REGISTRY_BASE + random.nextInt(SHIP_REGISTRY_RANGE));
  }

  double randomStardate() {
    return STARDATE_BASE + random.nextDouble(STARDATE_RANGE);
  }
}