public class ElonsToyCar {
  private static final int DISTANCE_PER_CHARGE = 20;
  private static final String BATTERY_EMPTY = "Battery empty";
  private static final String BATTERY_PREFIX = "Battery at ";
  private static final String BATTERY_SUFFIX = "%";
  private static final String DISTANCE_PREFIX = "Driven ";
  private static final String DISTANCE_SUFFIX = " meters";
  
  private int battery = 100;
  private int distance;

  public static ElonsToyCar buy() {
    return new ElonsToyCar();
  }

  public String distanceDisplay() {
    return DISTANCE_PREFIX + distance + DISTANCE_SUFFIX;
  }

  public String batteryDisplay() {
    return battery > 0 ? BATTERY_PREFIX + battery + BATTERY_SUFFIX : BATTERY_EMPTY;
  }

  public void drive() {
    if (battery > 0) {
      battery--;
      distance += DISTANCE_PER_CHARGE;
    }
  }
}