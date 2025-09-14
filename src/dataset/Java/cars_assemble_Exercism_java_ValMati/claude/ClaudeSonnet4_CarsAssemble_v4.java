public class CarsAssemble {

    private static final int CARS_PER_HOUR_AND_SPEED_LEVEL = 221;
    private static final int MINUTES_PER_HOUR = 60;
    private static final double[] SUCCESS_RATES = {
        0.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.9, 0.9, 0.9, 0.8, 0.77
    };

    public double productionRatePerHour(int speed) {
        if (speed < 1 || speed > 10) {
            return 0.0;
        }
        return speed * CARS_PER_HOUR_AND_SPEED_LEVEL * SUCCESS_RATES[speed];
    }

    public int workingItemsPerMinute(int speed) {
        if (speed < 1 || speed > 10) {
            return 0;
        }
        return (int) (speed * CARS_PER_HOUR_AND_SPEED_LEVEL * SUCCESS_RATES[speed] / MINUTES_PER_HOUR);
    }

    private double successRate(int speed) {
        if (speed < 1 || speed > 10) {
            return 0.0;
        }
        return SUCCESS_RATES[speed];
    }
}