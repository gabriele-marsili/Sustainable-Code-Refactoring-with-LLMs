public class CarsAssemble {

    public double productionRatePerHour(int speed) {
//        throw new UnsupportedOperationException("Please implement the CarsAssemble.productionRateperHour() method");
        final double SUCCESS_RATE = switch (speed) {
            case 1, 2, 3, 4 -> 1;
            case 5, 6, 7, 8 -> 0.9;
            case 9 -> 0.8;
            case 10 -> 0.77;
            default -> 0;
        };
        final int CARS_EACH_HOUR = 221;
        return speed * CARS_EACH_HOUR * SUCCESS_RATE;
    }

    public int workingItemsPerMinute(int speed) {
//        throw new UnsupportedOperationException("Please implement the CarsAssemble.workingItemsPerMinute() method");
        final int MINUTES_IN_HOUR = 60;
        return (int) productionRatePerHour(speed) / MINUTES_IN_HOUR;
    }
}
