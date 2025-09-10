public class CarsAssemble {

  private static final double BASE_RATE = 221;

  public double productionRatePerHour(int speed) {
    double successRate;
    if (speed >= 1 && speed <= 4) {
      successRate = 1.0;
    } else if (speed >= 5 && speed <= 8) {
      successRate = 0.9;
    } else if (speed == 9) {
      successRate = 0.8;
    } else if (speed == 10) {
      successRate = 0.77;
    } else {
      successRate = 0.0; // Or throw an exception, depending on desired behavior for invalid speed
    }
    return speed * BASE_RATE * successRate;
  }

  public int workingItemsPerMinute(int speed) {
    return (int) (productionRatePerHour(speed) / 60);
  }
}