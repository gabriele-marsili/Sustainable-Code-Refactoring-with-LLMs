import java.util.Random;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
    private static final int PLANET_CLASSES_LENGTH = PLANET_CLASSES.length;
    private static final int REGISTRY_MIN = 1000;
    private static final int REGISTRY_RANGE = 9000;
    private static final double STARDATE_BASE = 41000.0;
    private static final double STARDATE_RANGE = 1000.0;

    private final Random random;

    CaptainsLog(Random random) {
        this.random = random;
    }

    char randomPlanetClass() {
        return PLANET_CLASSES[random.nextInt(PLANET_CLASSES_LENGTH)];
    }

    String randomShipRegistryNumber() {
        return String.format("NCC-%04d", REGISTRY_MIN + random.nextInt(REGISTRY_RANGE));
    }

    double randomStardate() {
        return STARDATE_BASE + STARDATE_RANGE * random.nextDouble();
    }
}