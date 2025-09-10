import java.util.Random;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = new char[]{'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
    private static final int SHIP_REGISTRY_BASE = 1000;
    private static final int SHIP_REGISTRY_RANGE = 9000;
    private static final double STARDATE_BASE = 41000.0;
    private static final double STARDATE_RANGE = 1000.0;

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
        return STARDATE_BASE + STARDATE_RANGE * random.nextDouble();
    }
}