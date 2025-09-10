import java.util.Random;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = new char[]{'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
    private static final int PLANET_CLASSES_LENGTH = PLANET_CLASSES.length;
    private static final String NCC_PREFIX = "NCC-";

    private final Random random;

    CaptainsLog(Random random) {
        this.random = random;
    }

    char randomPlanetClass() {
        return PLANET_CLASSES[random.nextInt(PLANET_CLASSES_LENGTH)];
    }

    String randomShipRegistryNumber() {
        int randomNumber = 1000 + random.nextInt(9000);
        return NCC_PREFIX + String.format("%04d", randomNumber);
    }

    double randomStardate() {
        return 41000 + 1000 * random.nextDouble();
    }
}