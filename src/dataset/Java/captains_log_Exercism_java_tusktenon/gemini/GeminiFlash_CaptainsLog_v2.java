import java.util.Random;

class CaptainsLog {
  private static final char[] PLANET_CLASSES =
      new char[] {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};

  private final Random random;
  private final int planetClassesLength;

  CaptainsLog(Random random) {
    this.random = random;
    this.planetClassesLength = PLANET_CLASSES.length;
  }

  char randomPlanetClass() {
    return PLANET_CLASSES[random.nextInt(planetClassesLength)];
  }

  String randomShipRegistryNumber() {
    return "NCC-" + (1_000 + random.nextInt(9_000));
  }

  double randomStardate() {
    return 41_000 + random.nextDouble(1_000);
  }
}