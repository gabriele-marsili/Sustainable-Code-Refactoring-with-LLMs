import java.util.Random;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
    private static final double INITIAL_START_DATE = 41000.0;
    private static final int PLANET_CLASSES_LENGTH = PLANET_CLASSES.length;
    private static final int REGISTRY_BASE = 1000;
    private static final int REGISTRY_RANGE = 9000;
    private static final double STARDATE_RANGE = 1000.0;

    private final Random random;

    CaptainsLog(Random random) {
        this.random = random;
    }

    char randomPlanetClass() {
        return PLANET_CLASSES[random.nextInt(PLANET_CLASSES_LENGTH)];
    }

    String randomShipRegistryNumber() {
        int randomNumber = REGISTRY_BASE + random.nextInt(REGISTRY_RANGE);
        return "NCC-" + randomNumber;
    }

    double randomStardate() {
        return INITIAL_START_DATE + random.nextDouble() * STARDATE_RANGE;
    }
}