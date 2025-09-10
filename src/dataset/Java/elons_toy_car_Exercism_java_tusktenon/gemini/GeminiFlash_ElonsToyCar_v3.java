public class ElonsToyCar {
  private static final int DISTANCE_PER_CHARGE = 20;
  private static final String BATTERY_EMPTY_MESSAGE = "Battery empty";
  private static final String BATTERY_DISPLAY_PREFIX = "Battery at ";
  private static final String BATTERY_DISPLAY_SUFFIX = "%";
  private static final String DISTANCE_DISPLAY_PREFIX = "Driven ";
  private static final String DISTANCE_DISPLAY_SUFFIX = " meters";

  private byte battery = 100;
  private short distance;

  public static ElonsToyCar buy() {
    return new ElonsToyCar();
  }

  public String distanceDisplay() {
    return DISTANCE_DISPLAY_PREFIX + distance + DISTANCE_DISPLAY_SUFFIX;
  }

  public String batteryDisplay() {
    return battery > 0 ? BATTERY_DISPLAY_PREFIX + battery + BATTERY_DISPLAY_SUFFIX : BATTERY_EMPTY_MESSAGE;
  }

  public void drive() {
    if (battery > 0) {
      battery--;
      distance += DISTANCE_PER_CHARGE;
    }
  }
}