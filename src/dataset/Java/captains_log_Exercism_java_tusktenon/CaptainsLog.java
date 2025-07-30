import java.util.Random;

class CaptainsLog {
  private static final char[] PLANET_CLASSES =
      new char[] {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};

  private Random random;

  CaptainsLog(Random random) {
    this.random = random;
  }

  char randomPlanetClass() {
    return PLANET_CLASSES[random.nextInt(PLANET_CLASSES.length)];
  }

  String randomShipRegistryNumber() {
    return "NCC-" + random.nextInt(1_000, 10_000);
  }

  double randomStardate() {
    return random.nextDouble(41_000, 42_000);
  }
}
