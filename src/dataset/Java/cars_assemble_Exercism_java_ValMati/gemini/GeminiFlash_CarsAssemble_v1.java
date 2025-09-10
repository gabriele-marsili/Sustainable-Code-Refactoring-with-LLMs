public class CarsAssemble {

    private static final int CARS_PER_HOUR = 221;
    private static final double[] SUCCESS_RATES = {0.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.9, 0.9, 0.9, 0.8, 0.77};

    public double productionRatePerHour(int speed) {
        if (speed < 1 || speed > 10) {
            return 0.0;
        }
        return speed * CARS_PER_HOUR * SUCCESS_RATES[speed];
    }

    public int workingItemsPerMinute(int speed) {
        return (int) (productionRatePerHour(speed) / 60);
    }
}