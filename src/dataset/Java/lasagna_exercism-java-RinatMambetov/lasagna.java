public class Lasagna {
    public static int expectedMinutesInOven() {
        return 40;
    }

    public static int remainingMinutesInOven(int minutesHasBeenInTheOven) {
        return expectedMinutesInOven() - minutesHasBeenInTheOven;
    }

    public static int preparationTimeInMinutes(int numberOfLayers) {
        return numberOfLayers * 2;
    }

    public static int totalTimeInMinutes(int numberOfLayers, int minutesHasBeenInTheOven) {
        return minutesHasBeenInTheOven + preparationTimeInMinutes(numberOfLayers);
    }
}
