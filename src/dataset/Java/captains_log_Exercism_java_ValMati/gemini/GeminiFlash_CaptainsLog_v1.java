import java.util.Random;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = new char[]{'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
    private static final double INITIAL_START_DATE = 41000.0;
    private static final int REGISTRY_BASE = 1000;
    private static final int REGISTRY_RANGE = 9000;
    private static final int STARDATE_RANGE = 1000;

    private final Random random;

    CaptainsLog(Random random) {
        this.random = random;
    }

    char randomPlanetClass() {
        return PLANET_CLASSES[random.nextInt(PLANET_CLASSES.length)];
    }

    String randomShipRegistryNumber() {
        return "NCC-" + (REGISTRY_BASE + random.nextInt(REGISTRY_RANGE));
    }

    double randomStardate() {
        return INITIAL_START_DATE + random.nextDouble() * STARDATE_RANGE;
    }
}