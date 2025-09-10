import java.util.concurrent.ThreadLocalRandom;

class CaptainsLog {
  private static final char[] PLANET_CLASSES = 
      {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};

  char randomPlanetClass() {
    return PLANET_CLASSES[ThreadLocalRandom.current().nextInt(PLANET_CLASSES.length)];
  }

  String randomShipRegistryNumber() {
    return "NCC-" + ThreadLocalRandom.current().nextInt(1_000, 10_000);
  }

  double randomStardate() {
    return ThreadLocalRandom.current().nextDouble(41_000, 42_000);
  }
}