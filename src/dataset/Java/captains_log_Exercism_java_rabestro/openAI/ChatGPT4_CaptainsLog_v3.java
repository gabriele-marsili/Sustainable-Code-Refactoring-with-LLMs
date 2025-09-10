import java.util.concurrent.ThreadLocalRandom;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
    private static final int PLANET_CLASSES_LENGTH = PLANET_CLASSES.length;

    char randomPlanetClass() {
        return PLANET_CLASSES[ThreadLocalRandom.current().nextInt(PLANET_CLASSES_LENGTH)];
    }

    String randomShipRegistryNumber() {
        return "NCC-%04d".formatted(1000 + ThreadLocalRandom.current().nextInt(9000));
    }

    double randomStardate() {
        return 41000 + 1000 * ThreadLocalRandom.current().nextDouble();
    }
}