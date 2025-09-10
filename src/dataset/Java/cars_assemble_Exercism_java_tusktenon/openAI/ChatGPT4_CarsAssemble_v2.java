public class CarsAssemble {

  private static final double BASE_RATE = 221;

  public double productionRatePerHour(int speed) {
    double successRate;
    if (speed == 10) {
      successRate = 0.77;
    } else if (speed == 9) {
      successRate = 0.8;
    } else if (speed >= 5) {
      successRate = 0.9;
    } else {
      successRate = 1.0;
    }
    return speed * BASE_RATE * successRate;
  }

  public int workingItemsPerMinute(int speed) {
    return (int) (speed * BASE_RATE * getSuccessRate(speed) / 60);
  }

  private double getSuccessRate(int speed) {
    if (speed == 10) {
      return 0.77;
    } else if (speed == 9) {
      return 0.8;
    } else if (speed >= 5) {
      return 0.9;
    } else {
      return 1.0;
    }
  }
}