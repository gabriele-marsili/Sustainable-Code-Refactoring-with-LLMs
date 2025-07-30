public class CarsAssemble {

    private final int CARS_PER_HOUR_AND_SPEED_LEVEL = 221;
    private final int MINUTES_PER_HOUR = 60;

    public double productionRatePerHour(int speed) {
        return speed * CARS_PER_HOUR_AND_SPEED_LEVEL * successRate(speed);
    }

    public int workingItemsPerMinute(int speed) {
        return (int) (productionRatePerHour(speed) / MINUTES_PER_HOUR);
    }

    private double successRate(int speed) {
        if (speed <= 4) {
            return 1.0;
        } else if (speed <= 8) {
            return 0.9;
        } else if (speed <= 9) {
            return 0.8;
        } else  if (speed <=10){
            return 0.77;
        }

        return 0.0;
    }
}
