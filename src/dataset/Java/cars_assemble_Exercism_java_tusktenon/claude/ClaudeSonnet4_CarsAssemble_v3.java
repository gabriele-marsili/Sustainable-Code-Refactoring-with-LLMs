public class CarsAssemble {
  
  private static final double BASE_RATE = 221.0;
  private static final double[] SUCCESS_RATES = {
    1.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.9, 0.9, 0.9, 0.8, 0.77
  };
  private static final double MINUTES_PER_HOUR = 60.0;

  public double productionRatePerHour(int speed) {
    double successRate = (speed >= 0 && speed <= 10) ? SUCCESS_RATES[speed] : 1.0;
    return speed * BASE_RATE * successRate;
  }

  public int workingItemsPerMinute(int speed) {
    double successRate = (speed >= 0 && speed <= 10) ? SUCCESS_RATES[speed] : 1.0;
    return (int) (speed * BASE_RATE * successRate / MINUTES_PER_HOUR);
  }
}