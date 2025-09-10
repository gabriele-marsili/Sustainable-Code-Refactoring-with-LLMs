public class CarsAssemble {

    private static final int CARS_PER_HOUR_AND_SPEED_LEVEL = 221;
    private static final double[] SUCCESS_RATES = {1.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.9, 0.9, 0.9, 0.8, 0.77};

    public double productionRatePerHour(int speed) {
        return speed * CARS_PER_HOUR_AND_SPEED_LEVEL * SUCCESS_RATES[speed];
    }

    public int workingItemsPerMinute(int speed) {
        return (int) (productionRatePerHour(speed) / 60);
    }
}