public class CarsAssemble {

  private static final double BASE_RATE = 221.0;
  private static final double SUCCESS_RATE_077 = 0.77;
  private static final double SUCCESS_RATE_08 = 0.8;
  private static final double SUCCESS_RATE_09 = 0.9;
  private static final double SUCCESS_RATE_10 = 1.0;
  private static final double MINUTES_PER_HOUR = 60.0;

  public double productionRatePerHour(int speed) {
    final double successRate;
    if (speed == 10) {
      successRate = SUCCESS_RATE_077;
    } else if (speed == 9) {
      successRate = SUCCESS_RATE_08;
    } else if (speed >= 5 && speed <= 8) {
      successRate = SUCCESS_RATE_09;
    } else {
      successRate = SUCCESS_RATE_10;
    }
    return speed * BASE_RATE * successRate;
  }

  public int workingItemsPerMinute(int speed) {
    final double successRate;
    if (speed == 10) {
      successRate = SUCCESS_RATE_077;
    } else if (speed == 9) {
      successRate = SUCCESS_RATE_08;
    } else if (speed >= 5 && speed <= 8) {
      successRate = SUCCESS_RATE_09;
    } else {
      successRate = SUCCESS_RATE_10;
    }
    return (int) (speed * BASE_RATE * successRate / MINUTES_PER_HOUR);
  }
}