import java.util.Random;

class CaptainsLog {
  private static final char[] PLANET_CLASSES =
      new char[] {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
  private static final int PLANET_CLASSES_LENGTH = PLANET_CLASSES.length;
  private static final int MIN_REGISTRY = 1_000;
  private static final int REGISTRY_RANGE = 9_000;
  private static final double MIN_STARDATE = 41_000.0;
  private static final double STARDATE_RANGE = 1_000.0;

  private final Random random;

  CaptainsLog(Random random) {
    this.random = random;
  }

  char randomPlanetClass() {
    return PLANET_CLASSES[random.nextInt(PLANET_CLASSES_LENGTH)];
  }

  String randomShipRegistryNumber() {
    return "NCC-" + (MIN_REGISTRY + random.nextInt(REGISTRY_RANGE));
  }

  double randomStardate() {
    return MIN_STARDATE + random.nextDouble() * STARDATE_RANGE;
  }
}