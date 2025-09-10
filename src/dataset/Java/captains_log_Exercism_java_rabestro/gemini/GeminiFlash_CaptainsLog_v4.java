import java.util.Random;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
    private static final int NCC_BASE = 1000;
    private static final int NCC_RANGE = 9000;
    private static final int STARDATE_BASE = 41000;
    private static final int STARDATE_RANGE = 1000;

    private final Random random;

    CaptainsLog(Random random) {
        this.random = random;
    }

    char randomPlanetClass() {
        return PLANET_CLASSES[random.nextInt(PLANET_CLASSES.length)];
    }

    String randomShipRegistryNumber() {
        return String.format("NCC-%04d", NCC_BASE + random.nextInt(NCC_RANGE));
    }

    double randomStardate() {
        return STARDATE_BASE + STARDATE_RANGE * random.nextDouble();
    }
}