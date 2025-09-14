import java.util.Random;

class CaptainsLog {
  private static final char[] PLANET_CLASSES =
      {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
  private static final int PLANET_CLASSES_LENGTH = PLANET_CLASSES.length;
  private static final String NCC_PREFIX = "NCC-";
  private static final int MIN_REGISTRY = 1_000;
  private static final int MAX_REGISTRY = 10_000;
  private static final double MIN_STARDATE = 41_000.0;
  private static final double MAX_STARDATE = 42_000.0;
  private static final double STARDATE_RANGE = MAX_STARDATE - MIN_STARDATE;

  private final Random random;

  CaptainsLog(Random random) {
    this.random = random;
  }

  char randomPlanetClass() {
    return PLANET_CLASSES[random.nextInt(PLANET_CLASSES_LENGTH)];
  }

  String randomShipRegistryNumber() {
    return NCC_PREFIX + random.nextInt(MIN_REGISTRY, MAX_REGISTRY);
  }

  double randomStardate() {
    return MIN_STARDATE + random.nextDouble() * STARDATE_RANGE;
  }
}