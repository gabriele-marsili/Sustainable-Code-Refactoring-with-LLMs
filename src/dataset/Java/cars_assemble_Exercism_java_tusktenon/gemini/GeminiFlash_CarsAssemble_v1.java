public class CarsAssemble {

  private static final double BASE_RATE = 221;
  private static final double[] SUCCESS_RATES = {
    0.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.9, 0.9, 0.9, 0.8, 0.77
  };

  public double productionRatePerHour(int speed) {
    double successRate = (speed >= 1 && speed <= 10) ? SUCCESS_RATES[speed] : 1.0;
    return speed * BASE_RATE * successRate;
  }

  public int workingItemsPerMinute(int speed) {
    return (int) (productionRatePerHour(speed) / 60);
  }
}