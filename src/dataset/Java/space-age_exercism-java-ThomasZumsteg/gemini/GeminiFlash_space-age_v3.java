public class SpaceAge {
    private final long seconds;
    private static final double EARTH_YEAR_SECONDS = 31557600.0;

    public SpaceAge(long seconds) {
        this.seconds = seconds;
    }

    public SpaceAge(int seconds) {
        this.seconds = seconds;
    }

    public long getSeconds() {
        return seconds;
    }

    private double onPlanet(double orbitalPeriod) {
        return seconds / (EARTH_YEAR_SECONDS * orbitalPeriod);
    }

    public double onEarth() {
        return seconds / EARTH_YEAR_SECONDS;
    }

    public double onMercury() {
        return onPlanet(0.2408467);
    }

    public double onVenus() {
        return onPlanet(0.61519726);
    }

    public double onMars() {
        return onPlanet(1.8808158);
    }

    public double onJupiter() {
        return onPlanet(11.862615);
    }

    public double onSaturn() {
        return onPlanet(29.447498);
    }

    public double onUranus() {
        return onPlanet(84.016846);
    }

    public double onNeptune() {
        return onPlanet(164.79132);
    }
}