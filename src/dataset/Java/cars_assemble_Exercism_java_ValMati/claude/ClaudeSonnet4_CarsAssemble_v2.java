public class CarsAssemble {

    private static final int CARS_PER_HOUR_AND_SPEED_LEVEL = 221;
    private static final int MINUTES_PER_HOUR = 60;
    private static final double CARS_PER_MINUTE_BASE = (double) CARS_PER_HOUR_AND_SPEED_LEVEL / MINUTES_PER_HOUR;

    public double productionRatePerHour(int speed) {
        return speed * CARS_PER_HOUR_AND_SPEED_LEVEL * getSuccessRate(speed);
    }

    public int workingItemsPerMinute(int speed) {
        return (int) (speed * CARS_PER_MINUTE_BASE * getSuccessRate(speed));
    }

    private static double getSuccessRate(int speed) {
        if (speed <= 4) return 1.0;
        if (speed <= 8) return 0.9;
        if (speed == 9) return 0.8;
        if (speed == 10) return 0.77;
        return 0.0;
    }
}