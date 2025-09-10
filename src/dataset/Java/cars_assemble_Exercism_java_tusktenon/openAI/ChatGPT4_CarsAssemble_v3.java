public class CarsAssemble {

  private static final double BASE_RATE = 221;

  public double productionRatePerHour(int speed) {
    double successRate = (speed == 10) ? 0.77 :
                         (speed == 9) ? 0.8 :
                         (speed >= 5 && speed <= 8) ? 0.9 : 1.0;
    return speed * BASE_RATE * successRate;
  }

  public int workingItemsPerMinute(int speed) {
    return (int) (speed * BASE_RATE * ((speed == 10) ? 0.77 :
                                       (speed == 9) ? 0.8 :
                                       (speed >= 5 && speed <= 8) ? 0.9 : 1.0) / 60);
  }
}