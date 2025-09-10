public class CarsAssemble {

  private static final double BASE_RATE = 221.0;
  private static final double[] SUCCESS_RATES = {1.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.9, 0.9, 0.9, 0.8, 0.77};

  public double productionRatePerHour(int speed) {
    return speed * BASE_RATE * SUCCESS_RATES[speed];
  }

  public int workingItemsPerMinute(int speed) {
    return (int) (productionRatePerHour(speed) / 60);
  }
}