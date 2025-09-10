import java.util.concurrent.ThreadLocalRandom;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};

    char randomPlanetClass() {
        return PLANET_CLASSES[ThreadLocalRandom.current().nextInt(PLANET_CLASSES.length)];
    }

    String randomShipRegistryNumber() {
        return "NCC-" + (1000 + ThreadLocalRandom.current().nextInt(9000));
    }

    double randomStardate() {
        return 41000 + 1000 * ThreadLocalRandom.current().nextDouble();
    }
}