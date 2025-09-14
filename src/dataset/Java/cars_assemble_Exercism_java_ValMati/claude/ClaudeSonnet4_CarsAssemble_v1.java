public class CarsAssemble {

    private static final int CARS_PER_HOUR_AND_SPEED_LEVEL = 221;
    private static final int MINUTES_PER_HOUR = 60;
    private static final double[] SUCCESS_RATES = {
        0.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.9, 0.9, 0.9, 0.8, 0.77
    };

    public double productionRatePerHour(int speed) {
        return speed * CARS_PER_HOUR_AND_SPEED_LEVEL * successRate(speed);
    }

    public int workingItemsPerMinute(int speed) {
        return (int) (productionRatePerHour(speed) / MINUTES_PER_HOUR);
    }

    private double successRate(int speed) {
        return (speed >= 0 && speed < SUCCESS_RATES.length) ? SUCCESS_RATES[speed] : 0.0;
    }
}