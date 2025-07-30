public class CarsAssemble {

  public double productionRatePerHour(int speed) {
    final double baseRate = 221;
    final double successRate =
        switch (speed) {
          case 10 -> 0.77;
          case 9 -> 0.8;
          case 5, 6, 7, 8 -> 0.9;
          default -> 1.0;
        };
    return speed * baseRate * successRate;
  }

  public int workingItemsPerMinute(int speed) {
    return (int) (productionRatePerHour(speed) / 60);
  }
}
