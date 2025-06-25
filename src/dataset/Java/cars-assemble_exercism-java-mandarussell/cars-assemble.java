public class CarsAssemble {

    public double productionRatePerHour(int speed) {
        double workingItems = speed * 221;
        if (speed >= 5 && speed <= 8) {
            workingItems *= 0.9;
        } else if (speed == 9) {
            workingItems *= 0.8;
        } else if (speed == 10) {
            workingItems *= 0.77;
        }
        return workingItems;
    }

    public int workingItemsPerMinute(int speed) {
       return (int)this.productionRatePerHour(speed) / 60;
    }
}
