public class CarsAssemble {

    private static final int CARS_PER_HOUR_AND_SPEED_LEVEL = 221;
    private static final int MINUTES_PER_HOUR = 60;

    public double productionRatePerHour(int speed) {
        return speed * CARS_PER_HOUR_AND_SPEED_LEVEL * getSuccessRate(speed);
    }

    public int workingItemsPerMinute(int speed) {
        return (int) (productionRatePerHour(speed) / MINUTES_PER_HOUR);
    }

    private double getSuccessRate(int speed) {
        switch (speed) {
            case 1, 2, 3, 4 -> return 1.0;
            case 5, 6, 7, 8 -> return 0.9;
            case 9 -> return 0.8;
            case 10 -> return 0.77;
            default -> return 0.0;
        }
    }
}