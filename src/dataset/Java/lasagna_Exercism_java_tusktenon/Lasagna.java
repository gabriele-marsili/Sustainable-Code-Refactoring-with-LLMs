public class Lasagna {
    public int expectedMinutesInOven() {
        return 40;
    }

    public int remainingMinutesInOven(int minutesSoFar) {
        return expectedMinutesInOven() - minutesSoFar;
    }

    public int preparationTimeInMinutes(int layers) {
        return 2 * layers;
    }

    public int totalTimeInMinutes(int layers, int minutesSoFar) {
        return preparationTimeInMinutes(layers) + minutesSoFar;
    }
}
