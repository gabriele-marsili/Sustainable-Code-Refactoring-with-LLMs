public class CarsAssemble {

  public double productionRatePerHour(int speed) {
    final double baseRate = 221;
    final double successRate = (speed == 10) ? 0.77 : 
                              (speed == 9) ? 0.8 : 
                              (speed >= 5 && speed <= 8) ? 0.9 : 1.0;
    return speed * baseRate * successRate;
  }

  public int workingItemsPerMinute(int speed) {
    final double baseRate = 221;
    final double successRate = (speed == 10) ? 0.77 : 
                              (speed == 9) ? 0.8 : 
                              (speed >= 5 && speed <= 8) ? 0.9 : 1.0;
    return (int) (speed * baseRate * successRate / 60);
  }
}