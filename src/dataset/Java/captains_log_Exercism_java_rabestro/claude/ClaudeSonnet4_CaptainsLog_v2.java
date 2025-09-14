import java.util.Random;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
    private static final int PLANET_CLASSES_LENGTH = PLANET_CLASSES.length;
    private static final String REGISTRY_FORMAT = "NCC-%04d";

    private final Random random;

    CaptainsLog(Random random) {
        this.random = random;
    }

    char randomPlanetClass() {
        return PLANET_CLASSES[random.nextInt(PLANET_CLASSES_LENGTH)];
    }

    String randomShipRegistryNumber() {
        return String.format(REGISTRY_FORMAT, 1000 + random.nextInt(9000));
    }

    double randomStardate() {
        return 41000.0 + 1000.0 * random.nextDouble();
    }
}