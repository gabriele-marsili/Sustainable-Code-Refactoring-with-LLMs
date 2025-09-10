public class CarsAssemble {

  private static final double BASE_RATE = 221;
  private static final double SUCCESS_RATE_10 = 0.77;
  private static final double SUCCESS_RATE_9 = 0.8;
  private static final double SUCCESS_RATE_5_TO_8 = 0.9;

  public double productionRatePerHour(int speed) {
    double successRate;
    if (speed == 10) {
      successRate = SUCCESS_RATE_10;
    } else if (speed == 9) {
      successRate = SUCCESS_RATE_9;
    } else if (speed >= 5 && speed <= 8) {
      successRate = SUCCESS_RATE_5_TO_8;
    } else {
      successRate = 1.0;
    }
    return speed * BASE_RATE * successRate;
  }

  public int workingItemsPerMinute(int speed) {
    return (int) (productionRatePerHour(speed) / 60);
  }
}