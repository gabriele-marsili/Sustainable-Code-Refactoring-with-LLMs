import java.util.Random;

class CaptainsLog {
  private static final char[] PLANET_CLASSES =
      new char[] {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
  private static final int PLANET_CLASSES_LENGTH = PLANET_CLASSES.length;
  private static final int SHIP_REGISTRY_LOWER_BOUND = 1_000;
  private static final int SHIP_REGISTRY_UPPER_BOUND = 10_000;
  private static final double STARDATE_LOWER_BOUND = 41_000;
  private static final double STARDATE_UPPER_BOUND = 42_000;

  private final Random random;

  CaptainsLog(Random random) {
    this.random = random;
  }

  char randomPlanetClass() {
    return PLANET_CLASSES[random.nextInt(PLANET_CLASSES_LENGTH)];
  }

  String randomShipRegistryNumber() {
    return "NCC-" + (SHIP_REGISTRY_LOWER_BOUND + random.nextInt(SHIP_REGISTRY_UPPER_BOUND - SHIP_REGISTRY_LOWER_BOUND));
  }

  double randomStardate() {
    return STARDATE_LOWER_BOUND + random.nextDouble(STARDATE_UPPER_BOUND - STARDATE_LOWER_BOUND);
  }
}